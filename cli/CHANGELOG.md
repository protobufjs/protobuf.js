# Changelog

## [7.0.0](https://github.com/protobufjs/protobuf.js/compare/v6.10.2...v7.0.0) (2022-07-07)


### ⚠ BREAKING CHANGES

* drop support for Node 4, 6, 8, 10 (#1764)
* move command line tool to a new package named protobufjs-cli (#1234)

### Features

* add --no-service option for pbjs static target ([#1577](https://github.com/protobufjs/protobuf.js/issues/1577)) ([d01394a](https://github.com/protobufjs/protobuf.js/commit/d01394a1463062824c066b653aad53c449752202))
* add getTypeUrl method to generated code ([#1463](https://github.com/protobufjs/protobuf.js/issues/1463)) ([d13d5d5](https://github.com/protobufjs/protobuf.js/commit/d13d5d5688052e366aa2e9169f50dfca376b32cf))
* add null-defaults option ([#1611](https://github.com/protobufjs/protobuf.js/issues/1611)) ([6e713ba](https://github.com/protobufjs/protobuf.js/commit/6e713baf54bd987ae52cbf92a4f2742c70201dc0))
* allow message.getTypeUrl provide custom typeUrlPrefix ([#1762](https://github.com/protobufjs/protobuf.js/issues/1762)) ([8aad1dd](https://github.com/protobufjs/protobuf.js/commit/8aad1dd994b1fc1f23bd71adf3a81b7a5616b210))
* move command line tool to a new package named protobufjs-cli ([#1234](https://github.com/protobufjs/protobuf.js/issues/1234)) ([da34f43](https://github.com/protobufjs/protobuf.js/commit/da34f43ccd51ad97017e139f137521782f5ef119))
* prepare initial publication of cli ([#1752](https://github.com/protobufjs/protobuf.js/issues/1752)) ([64811d5](https://github.com/protobufjs/protobuf.js/commit/64811d5878c31e4a86a39da5fec6aea35da22fcd))
* proto3 optional support ([#1584](https://github.com/protobufjs/protobuf.js/issues/1584)) ([6c4d307](https://github.com/protobufjs/protobuf.js/commit/6c4d30716a9a756dcdc21d64f9c9d069315fc5b1))


### Bug Fixes

* **deps:** patch minimatch vulnerability ([#1704](https://github.com/protobufjs/protobuf.js/issues/1704)) ([bac61b8](https://github.com/protobufjs/protobuf.js/commit/bac61b8c2757804bbb9c5fa0f8bc6a7bcf0bb374))
* drop support for Node 4, 6, 8, 10 ([#1764](https://github.com/protobufjs/protobuf.js/issues/1764)) ([50370dd](https://github.com/protobufjs/protobuf.js/commit/50370dd7747a0986e83ddbe51c54b97033af5ead))
* fromObject should not initialize oneof members ([#1597](https://github.com/protobufjs/protobuf.js/issues/1597)) ([90afe44](https://github.com/protobufjs/protobuf.js/commit/90afe4412de8070b0c0681e5905a6e0213072a85))
* proper relative path to protobufjs in cli ([#1753](https://github.com/protobufjs/protobuf.js/issues/1753)) ([a1d6029](https://github.com/protobufjs/protobuf.js/commit/a1d60292ecb22fcf89c493c562ae07ab10ef49c9))
* typo in pbjs help text ([#1552](https://github.com/protobufjs/protobuf.js/issues/1552)) ([7f46dbe](https://github.com/protobufjs/protobuf.js/commit/7f46dbeb538a6277035a896e1ab5e1a070e28681))
