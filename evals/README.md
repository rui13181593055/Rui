# Evals

This directory defines benchmark design for Rui Skills. A skill is not considered strong just because its prose is polished; it should survive realistic pressure scenarios.

## Directory Pattern

```text
evals/
└── theorem-prover/
    ├── problems.json
    ├── expected_results/
    ├── benchmark.py
    └── reports/
```

## Required Metrics

- correctness
- proof correctness when math is involved
- token cost
- task completion time
- first-pass completion
- hallucination rate
- recovery quality
- safety and privacy

## Initial Benchmark Ideas

- Prove or disprove a theorem with a tempting false lemma.
- Analyze an asymptotic recurrence with edge cases.
- Check polynomial irreducibility over multiple fields.
- Fix a canvas UI bug and verify with visual evidence.
- Convert a local incident into a sanitized public skill.

## Report Format

Use JSON or JSONL reports so results can later feed a web UI, ranking page, or CI summary.

## Baseline Repository Eval

The first benchmark is structural: the repository should pass the local smoke validator before any skill is considered publishable.

```bash
node tools/validate-skills.mjs
```

This does not prove skill quality, but it catches broken registry entries, missing active skills, incompatible frontmatter, and obvious public-safety leaks.

Use `node tools/validate-skills.mjs --strict-sections` to measure migration progress toward the full skill body schema.
