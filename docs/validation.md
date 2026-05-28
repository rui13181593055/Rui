# Validation

Rui Skills should be checked locally before publishing or promotion.

## Smoke Check

Run the repository validator:

```bash
node tools/validate-skills.mjs
```

It checks:

- `registry/index.json` parses
- registry entries contain required metadata
- active skills have real `SKILL.md` files
- frontmatter stays Codex-compatible
- folder names match skill names
- public text avoids obvious local-path and secret-style leaks

Warnings mark quality gaps such as missing recommended sections. Errors block release.

For a stricter authoring-quality pass, include section checks:

```bash
node tools/validate-skills.mjs --strict-sections
```

## Codex Check

When available, run Codex's skill validator on each changed skill:

```bash
python <skill-creator>/scripts/quick_validate.py skills/<skill-name>
```

## Release Gate

Before pushing or publishing:

1. run `node tools/validate-skills.mjs`
2. run `quick_validate.py` for changed skills
3. run `git diff --check`
4. review `git diff --stat`
5. confirm that generated indexes, private logs, credentials, and machine-local paths are not staged
