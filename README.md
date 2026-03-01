<div align="center">

# 🛡️ DevGuard

### Developer Security & Environment Monitoring Toolkit

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TurboRepo](https://img.shields.io/badge/TurboRepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**DevGuard is a proactive security and monitoring toolkit for development teams.**
It catches vulnerabilities, enforces code standards, and guards your codebase
before issues ever reach production.

</div>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Project Goals](#-project-goals)
- [Technical Architecture](#-technical-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Screenshots](#-screenshots)
- [Challenges Faced](#-challenges-faced)
- [What I Learned](#-what-i-learned)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🔍 Problem Statement

### Who has the problem?
Development teams — especially small to mid-size engineering teams at startups — often have **no real-time visibility** into their development environment’s security posture.

### Why it matters?
Most security tools focus on **production environments**, leaving the development lifecycle unguarded. Security misconfigurations, exposed secrets, and dependency vulnerabilities are frequently introduced during development and only discovered after deployment — when the damage is already done.

### Why this solution exists?
DevGuard exists to **shift security left** — integrating security monitoring and automated enforcement directly into the development workflow. Instead of reacting to incidents, teams using DevGuard are **proactively alerted** and blocked from shipping vulnerable code.

---

## 🎯 Project Goals

- ✅ Provide real-time security monitoring for development environments
- ✅ Enforce code quality and security standards through automated CI checks
- ✅ Reduce the time between vulnerability introduction and detection
- ✅ Offer a developer-friendly dashboard for visibility into security posture
- ✅ Build a publishable JavaScript SDK for easy integration into any project
- ✅ Demonstrate production-grade monorepo architecture patterns

---

## 🏗️ Technical Architecture

DevGuard is built as a **TurboRepo monorepo**, enabling shared configurations, coordinated builds, and clear separation of concerns across multiple apps and packages.

```
DevGuard/
├── apps/
│   ├── backend/          # NestJS API — REST endpoints, security scanning logic, event system
│   ├── dashboard/        # React developer dashboard — real-time security visibility
│   └── docs/             # Next.js documentation site
├── packages/
│   ├── sdk-js/           # JavaScript SDK (NPM-publishable) for external integrations
│   ├── ui/               # Shared React component library
│   └── types/            # Shared TypeScript types across all apps
├── .github/
│   └── workflows/        # GitHub Actions CI/CD pipelines
├── turbo.json            # TurboRepo pipeline configuration
└── package.json          # Root workspace configuration
```

### Frontend (Dashboard)
- **React** component-based UI for visualizing security scan results
- Shared UI component library via `packages/ui` for design consistency
- Consumes DevGuard API via the `sdk-js` package

### Backend (API)
- **NestJS** modular architecture with dedicated security scanning modules
- Event-driven design for asynchronous vulnerability detection
- RESTful API endpoints consumed by the dashboard and SDK

### Shared Packages
- **`packages/types`**: Shared TypeScript interfaces/types ensuring type safety across frontend and backend
- **`packages/sdk-js`**: Client SDK abstracting API calls for external developer integrations

### CI/CD
- **GitHub Actions** pipeline runs on every push to `main` and `dev` branches
- Automated: dependency install → lint → build → type check
- **CodeRabbit** AI code review integrated for automated PR feedback

---

## ✨ Features

### 🔒 Security Scanning
- Automated vulnerability detection in development environments
- Dependency audit checks integrated into CI pipeline
- Pre-commit hooks (via Husky) to block vulnerable code before it’s committed

### 📊 Developer Dashboard
- Real-time visibility into security scan results
- Visual summary of codebase health and security posture
- Responsive design for use across desktop and laptop screens

### 🤖 Automated CI/CD Enforcement
- GitHub Actions pipeline enforces: linting, builds, and type safety on every PR
- Branch protection via automated status checks — failing checks block merges
- AI-assisted PR review via CodeRabbit for automated code quality feedback

### 📦 JavaScript SDK (NPM-publishable)
- Developer-facing SDK for integrating DevGuard checks into any JavaScript/TypeScript project
- Clean, documented API surface
- Shared TypeScript types for full IDE autocompletion support

### 🧹 Code Quality
- ESLint + Prettier enforced across the entire monorepo
- Shared TypeScript configuration via `packages/tsconfig`
- TurboRepo caching for fast, incremental builds

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript (70.5%), JavaScript (29.5%) |
| **Backend Framework** | NestJS |
| **Frontend Framework** | React |
| **Documentation** | Next.js |
| **Monorepo Tool** | TurboRepo |
| **CI/CD** | GitHub Actions |
| **Code Review** | CodeRabbit (AI) |
| **Linting** | ESLint + Prettier |
| **Git Hooks** | Husky |
| **Containerization** | Docker |
| **Package Manager** | npm (Workspaces) |

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [Docker](https://www.docker.com/) (optional, for containerized runs)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Mbiydzenyuy3/DevGuard.git
cd DevGuard
```

### 2. Install All Dependencies

This installs dependencies for all apps and packages in the monorepo:

```bash
npm install
```

### 3. Run All Apps in Development Mode

```bash
npm run dev
```

This starts all apps simultaneously using TurboRepo:
- Backend API → `http://localhost:3000`
- React Dashboard → `http://localhost:5173`
- Docs Site → `http://localhost:3001`

### 4. Build for Production

```bash
npm run build
```

### 5. Run Linting

```bash
npm run lint
```

### 6. Docker (Optional)

```bash
docker build -t devguard .
docker run -p 3000:3000 devguard
```

---

## 📸 Screenshots

> 📌 Screenshots will be added as the dashboard UI is completed. 
In the meantime, explore the [repository structure](https://github.com/Mbiydzenyuy3/DevGuard) and the CI pipeline in the [Actions tab](https://github.com/Mbiydzenyuy3/DevGuard/actions).

---

## 🚧 Challenges Faced

### 1. Frontend Challenge — Wiring the Shared UI Library Across Workspaces
Sharing React components between the `dashboard` app and the `packages/ui` library in a TurboRepo setup required careful configuration of TypeScript path aliases and module resolution. Initially, the dashboard couldn’t resolve the shared component imports. The fix required explicitly declaring `exports` in the UI package’s `package.json` and updating the root `tsconfig.json` to include `paths` mappings for workspace packages.

### 2. Backend Challenge — Designing an Event-Driven Security Scan Architecture
Modeling the security scanning logic as an event-driven system in NestJS was more complex than a standard request-response API. Vulnerability scans needed to run asynchronously without blocking the HTTP response. This required implementing NestJS `EventEmitter` patterns and designing a dedicated scanning module that listens for trigger events and emits results to a results queue — decoupling scan initiation from result delivery.

### 3. Debugging Challenge — TurboRepo Build Order and Caching Conflicts
During early development, running `npm run build` would randomly fail because TurboRepo tried to build `packages/types` and `apps/backend` in parallel, even though the backend depended on the types package. The fix was correctly defining `dependsOn` relationships in `turbo.json`, ensuring types were always built before the apps that consumed them. This taught me how critical explicit dependency declarations are in monorepo tooling.

---

## 💡 What I Learned

### Technical Lesson
Building a TurboRepo monorepo from scratch taught me how **shared packages, caching pipelines, and workspace-aware builds** work at the architectural level. Understanding module resolution across workspaces and TypeScript project references was a significant step up in complexity from single-project apps.

### Workflow Lesson
Integrating **CodeRabbit for AI-assisted code review** showed me how automated feedback loops can catch issues (naming conventions, missing error handling, inconsistent typing) that would otherwise only be caught in human code review. It changed how I think about code quality automation.

### Code Organization Lesson
**Shared types are the contract of a distributed system.** Centralizing all TypeScript interfaces in `packages/types` eliminated entire categories of runtime bugs caused by frontend and backend having drifted type definitions. I now treat shared types as a first-class architectural concern, not an afterthought.

---

## 🔮 Future Improvements

| Priority | Improvement |
|----------|-------------|
| 🔴 High | Add authentication (JWT) to protect the dashboard and API endpoints |
| 🔴 High | Integrate OWASP dependency check into the CI pipeline |
| 🟡 Medium | Build real-time WebSocket notifications for scan result delivery |
| 🟡 Medium | Publish the `sdk-js` package to NPM with full documentation |
| 🟡 Medium | Add role-based access control (RBAC) for team environments |
| 🟢 Low | Add dark/light theme toggle to the React dashboard |
| 🟢 Low | Write unit and integration tests with Jest for all backend modules |
| 🟢 Low | Add Kubernetes deployment manifests for production-grade scaling |

---

## 👤 Author

**Leila Mbiydzenyuy**

Full-Stack Engineer | TypeScript · NestJS · React | Building scalable products for startups & remote teams

[![Email](https://img.shields.io/badge/Email-mbiydzenyuyeileen%40gmail.com-blue?style=flat-square&logo=gmail)](mailto:mbiydzenyuyeileen@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-eileen--leila-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/eileen-leila/)
[![GitHub](https://img.shields.io/badge/GitHub-Mbiydzenyuy3-333?style=flat-square&logo=github)](https://github.com/Mbiydzenyuy3)

---

<div align="center">

*If this project helped you or you find it interesting, please consider giving it a ⭐ — it means a lot!*

</div>
