#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKILLS_DIR = path.join(ROOT, "skills");
const REGISTRY_PATH = path.join(ROOT, "registry", "index.json");
const STRICT_SECTIONS = process.argv.includes("--strict-sections");

const REQUIRED_REGISTRY_FIELDS = [
  "name",
  "version",
  "author",
  "path",
  "summary",
  "triggers",
  "tools",
  "domain",
  "difficulty",
  "tags",
  "status",
];
const REQUIRED_BODY_SECTIONS = [
  "Purpose",
  "Input",
  "Workflow",
  "Tool Routing",
  "Constraints",
  "Failure Recovery",
  "Examples",
  "Evaluation",
];
const ALLOWED_DIFFICULTY = new Set(["low", "medium", "high", "advanced"]);
const ALLOWED_STATUS = new Set(["stable", "experimental", "roadmap", "deprecated"]);

const PRIVATE_PATTERNS = [
  { label: "absolute Windows user path", re: /[A-Za-z]:\\Users\\/ },
  { label: "desktop or download path", re: /[A-Za-z]:\\(?:Desktop|Downloads|Documents)\\/ },
  { label: "secret assignment", re: /\b(api[_-]?key|token|secret|password|cookie)\s*[:=]\s*["'][^"']{4,}/i },
];

const errors = [];
const warnings = [];

function rel(filePath) {
  return path.relative(ROOT, filePath).replaceAll(path.sep, "/");
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function parseFrontmatter(text, filePath) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    addError(`${rel(filePath)}: missing YAML frontmatter`);
    return {};
  }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (field) data[field[1]] = field[2].trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

function scanPrivatePatterns(filePath, text) {
  for (const pattern of PRIVATE_PATTERNS) {
    if (pattern.re.test(text)) addError(`${rel(filePath)}: possible private data (${pattern.label})`);
  }
}

function validateRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    addError("registry/index.json: missing");
    return { skills: [] };
  }
  let registry;
  try {
    registry = JSON.parse(readText(REGISTRY_PATH));
  } catch (error) {
    addError(`registry/index.json: invalid JSON (${error.message})`);
    return { skills: [] };
  }
  if (!Array.isArray(registry.skills)) {
    addError("registry/index.json: skills must be an array");
    return { skills: [] };
  }
  if (!registry.schema_version) addWarning("registry/index.json: schema_version missing");

  const seen = new Set();
  for (const [index, skill] of registry.skills.entries()) {
    for (const field of REQUIRED_REGISTRY_FIELDS) {
      if (!(field in skill)) addError(`registry/index.json: skills[${index}] missing ${field}`);
    }
    if (seen.has(skill.name)) addError(`registry/index.json: duplicate skill name ${skill.name}`);
    seen.add(skill.name);
    if (skill.name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name)) {
      addError(`registry/index.json: ${skill.name} must be lower-case hyphen-case`);
    }
    if (skill.difficulty && !ALLOWED_DIFFICULTY.has(skill.difficulty)) {
      addError(`registry/index.json: ${skill.name} has invalid difficulty ${skill.difficulty}`);
    }
    if (skill.status && !ALLOWED_STATUS.has(skill.status)) {
      addError(`registry/index.json: ${skill.name} has invalid status ${skill.status}`);
    }
    for (const key of ["triggers", "tools", "tags"]) {
      if (!Array.isArray(skill[key]) || skill[key].length === 0) {
        addError(`registry/index.json: ${skill.name} ${key} must be a non-empty array`);
      }
    }
    if (skill.status !== "roadmap" && skill.path) {
      const skillFile = path.join(ROOT, skill.path, "SKILL.md");
      if (!fs.existsSync(skillFile)) addError(`registry/index.json: ${skill.name} path missing ${rel(skillFile)}`);
    }
  }
  return registry;
}

function validateSkillDir(skillDir, registryByName) {
  const skillName = path.basename(skillDir);
  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    addError(`${rel(skillDir)}: missing SKILL.md`);
    return;
  }
  const text = readText(skillFile);
  const frontmatter = parseFrontmatter(text, skillFile);
  if (!frontmatter.name) addError(`${rel(skillFile)}: missing frontmatter name`);
  if (!frontmatter.description) addError(`${rel(skillFile)}: missing frontmatter description`);
  if (frontmatter.name && frontmatter.name !== skillName) {
    addError(`${rel(skillFile)}: frontmatter name must match folder name ${skillName}`);
  }
  if (frontmatter.description && !/\bUse when\b/i.test(frontmatter.description)) {
    addWarning(`${rel(skillFile)}: description should say when to use the skill`);
  }
  if (!registryByName.has(skillName)) {
    addError(`${rel(skillFile)}: stable skill directory missing registry entry`);
  }
  if (STRICT_SECTIONS) {
    for (const section of REQUIRED_BODY_SECTIONS) {
      if (!new RegExp(`^##\\s+${section}\\s*$`, "m").test(text)) {
        addWarning(`${rel(skillFile)}: missing recommended section "${section}"`);
      }
    }
  }
  scanPrivatePatterns(skillFile, text);
}

function listSkillDirs() {
  if (!fs.existsSync(SKILLS_DIR)) {
    addError("skills/: directory missing");
    return [];
  }
  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(SKILLS_DIR, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

function scanPublicTextFiles() {
  for (const root of ["README.md", "docs", "skills", "registry", "runtime", "workflows", "evals", "tools", "memory", "agents"]) {
    const full = path.join(ROOT, root);
    if (!fs.existsSync(full)) continue;
    const stack = [full];
    while (stack.length) {
      const current = stack.pop();
      const stat = fs.statSync(current);
      if (stat.isDirectory()) {
        for (const entry of fs.readdirSync(current)) stack.push(path.join(current, entry));
        continue;
      }
      if (!/\.(md|json|mjs)$/i.test(current)) continue;
      scanPrivatePatterns(current, readText(current));
    }
  }
}

function main() {
  const registry = validateRegistry();
  const registryByName = new Map((registry.skills ?? []).map((skill) => [skill.name, skill]));
  for (const skillDir of listSkillDirs()) validateSkillDir(skillDir, registryByName);
  scanPublicTextFiles();

  for (const warning of warnings) console.warn(`warning: ${warning}`);
  for (const error of errors) console.error(`error: ${error}`);
  console.log(`validated ${registry.skills?.length ?? 0} registry entries, ${warnings.length} warnings, ${errors.length} errors`);
  if (errors.length) process.exit(1);
}

main();
