# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands
- Build: `pnpm run build`
- Lint: `pnpm run lint`
- Format: `pnpm run format`
- Run tests: `pnpm run test`
- Run single test: `pnpm run test -- -t "test name"`
- Run e2e tests: `pnpm run test:e2e`
- Run tests with coverage: `pnpm run test:cov`

## Code Style Guidelines
- Use TypeScript with strict null checks
- Format with Prettier (single quotes, no semicolons)
- Use 4-space indentation
- Imports should be sorted alphabetically and separete libs imports, to src imports
- Prefer named exports over default exports
- Follow NestJS module/controller/service pattern
- Use async/await for asynchronous code
- Unused variables must be prefixed with underscore (_)
- Handle errors with proper try/catch blocks
- Use camelCase for variables/methods, PascalCase for classes
- Use descriptive variable names and avoid abbreviations