# Contributing

## Issues

Please use the issue template and include a minimal reproduction.

For CLI issues, include the `protobufjs-cli` version and the exact `pbjs`, `pbts` or `protoc-gen-pbjs` command.

Paste errors, generated output, schemas and repro code as text / code blocks, not screenshots.

Security reports should follow [SECURITY.md](./SECURITY.md).

## Pull requests

For larger changes, please open an issue first to discuss the approach.

Keep pull requests focused on one behavior change or fix.

Link the relevant issue when there is one.

Include tests for bug fixes and new behavior when practical. If a test is not practical, explain why in the pull request.

Avoid unrelated refactors, formatting-only churn, generated-output dumps, or dependency changes unless they are part of the fix.

## Development

```sh
npm install
npm --prefix cli install
npm run build
npm test
```

Regenerate test fixtures when affected:

```sh
npm run build:tests
```
