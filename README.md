# DevGuard Monorepo

Welcome to the DevGuard monorepo, managed by TurboRepo.

## What's inside?

This monorepo includes the following apps and packages:

### Apps

- `api`: The NestJS backend (Public API)
- `dashboard`: The React developer dashboard
- `docs`: The Next.js documentation site

### Packages

- `sdk-js`: The JavaScript SDK (published to NPM)
- `ui`: A shared React component library
- `tsconfig`: Shared TypeScript configurations

### Getting Started

1.  **Install dependencies:**

    npm install

2.  **Run all apps in development mode:**

    npm run dev

### Build

To build all apps and packages, run:

npm run build

# === 2. Create CI/CD & Git Hooks ===

echo "Creating CI/CD and Git hooks..."
mkdir -p .husky

# --- .github/workflows/ci.yml ---

name: DevGuard CI

on:
push:
branches: [ "main, dev" ]
pull_request:
branches: [ "dev" ]

- name: Install dependencies
  run: npm install

- name: Build
  run: npm run build

- name: Lint
  run: npm run lint
