<div align="center">

<img src="./assets/profile-banner.svg" alt="Rui Workbench banner" width="100%" />

# Rui Workbench

**Local-first agent systems, Codex skills, recovery runbooks, and automation workflows.**

[![Repository](https://img.shields.io/badge/repo-rui4399%2FRui-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rui4399/Rui)
[![ResearchFlow](https://img.shields.io/badge/ResearchFlow-research%20engine-0f766e?style=for-the-badge)](https://github.com/RipeMangoBox/ResearchFlow)
[![Anaconda](https://img.shields.io/badge/Python-Anaconda-44a833?style=for-the-badge&logo=anaconda&logoColor=white)](#stack)
[![Codex](https://img.shields.io/badge/Codex-local%20skills-1f2937?style=for-the-badge)](#system-map)

</div>

---

## Overview

Rui Workbench is a public index for the local agent systems I build and maintain: Codex skills, Windows/WSL repair workflows, media delivery runbooks, reproducible Python environments, and research tooling.

The goal is to turn hard-won local engineering experience into reusable, inspectable workflows. The emphasis is not on generic API wrappers, but on the operational details that make AI-assisted work reliable on a real machine: logs, state files, recovery paths, portability, and verification.

## Highlights

| Layer | What it does | Current direction |
| --- | --- | --- |
| ResearchFlow | Collects, indexes, audits, and queries research papers | Local knowledge base for papers and notes |
| Codex skills | Turns repeated agent work into reusable procedures | Public skill drafts and private local automation |
| Recovery runbooks | Captures Windows, WSL, media, and tooling failure modes | Practical repair paths backed by logs and checks |
| Anaconda runtime | Keeps Python tools isolated and recoverable | Clean envs for research, yt-dlp, and data tools |
| Media pipeline | Extracts and organizes web/media metadata | yt-dlp source workspace and structured downloads |

## Featured Work

| Project | Why it matters |
| --- | --- |
| [Codex skill drafts](./skills) | Public agent skills for local reliability, plugin recovery, media delivery, memory, portability, and Windows repair |
| [ResearchFlow](https://github.com/RipeMangoBox/ResearchFlow) | A local research assistant for paper retrieval, notes, indexes, and knowledge queries |
| `yt-dlp` local workspace | Editable source-linked media tooling in an isolated Anaconda environment |
| Codex skill library | A growing set of local skills for documents, Zotero, GitHub, life-science research, and automation |

## System Map

```mermaid
flowchart LR
    A["Local work: code, papers, media, tools"] --> B["Logs and state"]
    B --> C["Repeatable fixes"]
    C --> D["Codex skills"]
    D --> E["Reusable runbooks"]
    E --> F["Automation and reports"]
```

## Stack

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Anaconda-44A833?style=flat-square&logo=anaconda&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PowerShell-5391FE?style=flat-square&logo=powershell&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Zotero-CC2936?style=flat-square&logo=zotero&logoColor=white" />
  <img src="https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=white" />
</p>

## Principles

- Local-first by default.
- Clear files, logs, checkpoints, and recovery paths.
- Automation that helps before it tries to impress.
- Research notes and code treated as one thinking system.
- Environments kept boring, explicit, and portable.

## Roadmap

- [ ] Turn ResearchFlow outputs into cleaner shareable reports.
- [ ] Add repeatable paper collection and metadata QA recipes.
- [ ] Build a small media metadata workflow around yt-dlp.
- [ ] Expand the public skills into tested templates with small helper scripts.

## GitHub Snapshot

<div align="center">

![GitHub stats](https://github-readme-stats.vercel.app/api?username=rui4399&show_icons=true&hide_border=true&theme=default)

![Top languages](https://github-readme-stats.vercel.app/api/top-langs/?username=rui4399&layout=compact&hide_border=true)

</div>

---

<div align="center">

**Building local agent workflows that survive real machines, real logs, and real failure modes.**

</div>
