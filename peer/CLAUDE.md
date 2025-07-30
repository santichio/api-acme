# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. Rules
- This file is divided by sections, and its is proibited to make changes in sections 1, 2, 3
- All commits have to follow our commit message
- After changes run `pnpm run format` to apply code style
- For every function and class and methods provide a documentation comment (JSDoc), describing it

## 2. Development cycle
1. Sugest the changes for aproval, if it accepted then proceed to next steps
2. Upgrade the `./CLAUDE.md` memory file if needed
3. Check if need to upgrade the `./README.md` content, if have some change, suggest for approval
4. Sugest a commit message folllowing our company policy based on commit message convention

The commit message should be structured as follows:
```txt
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Some complementing:

1. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A BREAKING CHANGE can be part of commits of any *type*.
2. *footers* other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

The following commit types are allowed, based on their context:

- **fix**: Commits of the fix type indicate that your committed code is solving a problem (bug fix). This correlates with PATCH in Semantic Versioning.
- **feat**: Commits of the feat type indicate that your code is including a new feature. This correlates with MINOR in Semantic Versioning.
- **build**: Used when modifications are made to build files and dependencies.
- **chore**: Indicates task updates for build, admin configurations, packages, such as adding a package to gitignore. (Does not include code changes).
- **ci**: Indicates changes related to continuous integration.
- **docs**: Indicates changes in documentation, such as in the Readme of your repository. (Does not include code changes).
- **style**: Indicates changes related to formatting, white-space, or other visual changes that don’t affect functionality.
- **refactor**: Refers to changes due to refactoring that do not alter functionality, such as a change in the way a certain part of the screen is processed, but that maintained the same functionality, or performance improvements due to a code review.
- **perf**: Identifies any code changes that are related to performance.
- **test**: Used when changes to tests are made, whether creating, modifying, or deleting unit tests. (Does not include code changes).
- **cleanup**: Used to remove commented code, unnecessary snippets, or any other form of cleaning the source code, aiming to improve its readability and maintainability.
- **remove**: Indicates the deletion of obsolete or unused files, directories, or functionalities, reducing the size and complexity of the project and keeping it more organized.
- **raw**: Indicates changes related to configuration files, data, features, parameters.
- **revert**: If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>, where the hash is the SHA of the commit being reverted.`

## 3. Code Style Guidelines
- Use TypeScript with strict null checks
- Format with Prettier (single quotes, no semicolons)
- Use 4-space indentation
- Imports should be sorted alphabetically and separete by libs imports, to src imports
- Prefer named exports over default exports
- Follow NestJS module/controller/service pattern
- Use async/await for asynchronous code
- Unused variables must be prefixed with underscore (_)
- Handle errors with proper try/catch blocks
- Use camelCase for variables/methods, PascalCase for classes
- Use descriptive variable names and avoid abbreviations

## Build & Test Commands
- Build: `pnpm run build`
- Lint: `pnpm run lint`
- Format: `pnpm run format`
- Run tests: `pnpm run test`
- Run single test: `pnpm run test -- -t "test name"`
- Run e2e tests: `pnpm run test:e2e`
- Run tests with coverage: `pnpm run test:cov`