# Changelog

## [2.1.0](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v2.0.3...protobufjs-cli-v2.1.0) (2026-05-05)


### Features

* Roundtrip unknown fields ([#2209](https://github.com/protobufjs/protobuf.js/issues/2209)) ([76fa03c](https://github.com/protobufjs/protobuf.js/commit/76fa03c252542b607e4c81a4fe4db12aa1f948af))


### Bug Fixes

* Add eslint-disable default-case to generated files ([#2095](https://github.com/protobufjs/protobuf.js/issues/2095)) ([8723f3f](https://github.com/protobufjs/protobuf.js/commit/8723f3f4a1cea6409883fe77408083914ca054cd))
* Consistently handle scalar map keys ([#2186](https://github.com/protobufjs/protobuf.js/issues/2186)) ([29b1183](https://github.com/protobufjs/protobuf.js/commit/29b11834520bc4ab0bb377933e4efefbf95f93b2))
* Correct parsedOptions TypeScript types ([#2217](https://github.com/protobufjs/protobuf.js/issues/2217)) ([dbe8d77](https://github.com/protobufjs/protobuf.js/commit/dbe8d7775a46bebaf644461dce586fa29be242f6))
* Decode missing map message values as empty messages ([#2206](https://github.com/protobufjs/protobuf.js/issues/2206)) ([51c1a4f](https://github.com/protobufjs/protobuf.js/commit/51c1a4fd77169565bc6248f996f698ee396c90f0))
* Generate TypeScript class properties for extensions ([#2187](https://github.com/protobufjs/protobuf.js/issues/2187)) ([ec04bee](https://github.com/protobufjs/protobuf.js/commit/ec04bee4a1aada80083d504f0c879dee6e293799))
* Merge singular message fields while decoding ([#2195](https://github.com/protobufjs/protobuf.js/issues/2195)) ([14d9df7](https://github.com/protobufjs/protobuf.js/commit/14d9df796af789aca5ad7a54c67d9be8b84a818a))


### Performance Improvements

* Reduce generated code overhead ([#2212](https://github.com/protobufjs/protobuf.js/issues/2212)) ([45ec503](https://github.com/protobufjs/protobuf.js/commit/45ec503c299ea16523e990b8a50cad977ef93e6a))

## [2.0.3](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v2.0.2...protobufjs-cli-v2.0.3) (2026-04-28)


### Bug Fixes

* Update CLI peer dependency ([#2188](https://github.com/protobufjs/protobuf.js/issues/2188)) ([cb3e1eb](https://github.com/protobufjs/protobuf.js/commit/cb3e1eb40a477a699ac7d4598742ab8b0c42c7fd))

## [2.0.2](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v2.0.1...protobufjs-cli-v2.0.2) (2026-04-27)


### Bug Fixes

* Correct ES6 wrapper imports in static-module output ([#2151](https://github.com/protobufjs/protobuf.js/issues/2151)) ([88f5a76](https://github.com/protobufjs/protobuf.js/commit/88f5a76332dfb1a4fb142b40756a862cc1ac6119))
* Don't include `[@exports](https://github.com/exports)` for enums ([#1824](https://github.com/protobufjs/protobuf.js/issues/1824)) ([eb256f0](https://github.com/protobufjs/protobuf.js/commit/eb256f0192601d1c01de554eecdcc406abea9d1c))
* Harden input handling ([#2163](https://github.com/protobufjs/protobuf.js/issues/2163)) ([6eb3a3b](https://github.com/protobufjs/protobuf.js/commit/6eb3a3b90db02d3e8447ea57fcc835459bff2e51))
* limit depth of recursion in Reader.prototype.skipType ([#2143](https://github.com/protobufjs/protobuf.js/issues/2143)) ([0f643d5](https://github.com/protobufjs/protobuf.js/commit/0f643d52a91ce0b953101c7065775b8a9a2e72e2))
* refactor the code to remove subpackages ([#2146](https://github.com/protobufjs/protobuf.js/issues/2146)) ([2fe8b09](https://github.com/protobufjs/protobuf.js/commit/2fe8b0940eb7a1a450d2c39045f3e3226867cb09))
* Remove jsdoc includePattern ([#2089](https://github.com/protobufjs/protobuf.js/issues/2089)) ([0fead2e](https://github.com/protobufjs/protobuf.js/commit/0fead2ed7b9d1a705773766a3f15ad961de1f815))
* Run pbts jsdoc without a shell ([#2160](https://github.com/protobufjs/protobuf.js/issues/2160)) ([648b760](https://github.com/protobufjs/protobuf.js/commit/648b760fa6398a52a330840211fd296eecefab11))
* Support .cjs and .mjs extensions in pbts ([#2152](https://github.com/protobufjs/protobuf.js/issues/2152)) ([aef016a](https://github.com/protobufjs/protobuf.js/commit/aef016adb2e06be4c59e5a5a40977e71ceff52ae))

## [2.0.1](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v2.0.0...protobufjs-cli-v2.0.1) (2026-03-11)


### Bug Fixes

* bump protobufjs dependency version for cli package ([#2128](https://github.com/protobufjs/protobuf.js/issues/2128)) ([549b05e](https://github.com/protobufjs/protobuf.js/commit/549b05ecd95e23da40fa1a36a9336c57946b8377))

## [2.0.0](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.2.0...protobufjs-cli-v2.0.0) (2025-12-16)


### ⚠ BREAKING CHANGES

* add Edition 2024 Support ([#2060](https://github.com/protobufjs/protobuf.js/issues/2060))

### Features

* add Edition 2024 Support ([#2060](https://github.com/protobufjs/protobuf.js/issues/2060)) ([53e8492](https://github.com/protobufjs/protobuf.js/commit/53e8492cbaae2c741801fa50b5f908ff5129c3d7))

## [1.2.0](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.1.4...protobufjs-cli-v1.2.0) (2025-04-15)


### Features

* add Edition 2023 Support ([f04ded3](https://github.com/protobufjs/protobuf.js/commit/f04ded3a03a3ddd383f0228e2fe2627a51f31aa3))
* add Edition 2023 Support ([a84409b](https://github.com/protobufjs/protobuf.js/commit/a84409b47f9ba0dba56da1af8054fb54f85d85a1))
* add Edition 2023 Support ([9c5a178](https://github.com/protobufjs/protobuf.js/commit/9c5a178c4b59e0aa65ecac0bd7420171213b2ff9))
* add Edition 2023 Support ([b2c6867](https://github.com/protobufjs/protobuf.js/commit/b2c686721e3b63d092419fa1cbe58e1deb89534e))
* add Edition 2023 Support ([60f3e51](https://github.com/protobufjs/protobuf.js/commit/60f3e51087ca2c247473410f39331e1c766aefef))
* add Edition 2023 Support ([a656361](https://github.com/protobufjs/protobuf.js/commit/a6563617de04d510d6e8865eb6c5067f10247f64))
* add Edition 2023 Support ([1af8454](https://github.com/protobufjs/protobuf.js/commit/1af8454538b63d58b822ea9d20b935f2ac9f158c))
* add feature resolution ([a9ffc8a](https://github.com/protobufjs/protobuf.js/commit/a9ffc8a7b593209642fc9d89e884ac6c4e746494))
* add feature resolution for protobuf editions ([547afa2](https://github.com/protobufjs/protobuf.js/commit/547afa26f76e22e5463a17aec082b0b60cd951d8))
* api_converters_editions tests added and run successfully" ([b4b5ca4](https://github.com/protobufjs/protobuf.js/commit/b4b5ca468fcde2082d65a72b508f18d07d75245c))
* increase size of file that protobufjs CLI can process ([00d5f1a](https://github.com/protobufjs/protobuf.js/commit/00d5f1aca4d7959068f52fd11767c21b483e75bb))
* increase size of file that protobufjs CLI can process ([d36ef0f](https://github.com/protobufjs/protobuf.js/commit/d36ef0faeae9a9ec655747cb650571bdd9b1243b))

## [1.1.4](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.1.3...protobufjs-cli-v1.1.4) (2024-08-22)


### Bug Fixes

* include ([28e3334](https://github.com/protobufjs/protobuf.js/commit/28e333415d3c85687810e164125997d17baba0bd))

## [1.1.3](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.1.2...protobufjs-cli-v1.1.3) (2024-08-16)


### Bug Fixes

* handle nullability for optional fields ([59569c1](https://github.com/protobufjs/protobuf.js/commit/59569c12c85c1c7b783ace9a71775b1d05a08e9c))

## [1.1.2](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.1.1...protobufjs-cli-v1.1.2) (2023-08-21)


### Bug Fixes

* possible infinite loop when parsing option ([#1923](https://github.com/protobufjs/protobuf.js/issues/1923)) ([f2a8620](https://github.com/protobufjs/protobuf.js/commit/f2a86201799af5842e1339c22950abbb3db00f51))

## [1.1.1](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.1.0...protobufjs-cli-v1.1.1) (2023-02-02)


### Bug Fixes

* **cli:** fix relative path to Google pb files ([#1859](https://github.com/protobufjs/protobuf.js/issues/1859)) ([e42eea4](https://github.com/protobufjs/protobuf.js/commit/e42eea4868b11f4a07934804a56683321ed191e2))

## [1.1.0](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.0.2...protobufjs-cli-v1.1.0) (2023-01-24)


### Features

* **cli:** generate static files at the granularity of proto messages ([#1840](https://github.com/protobufjs/protobuf.js/issues/1840)) ([32f2d6a](https://github.com/protobufjs/protobuf.js/commit/32f2d6a68b27997bd0f7619998695a9fa7a4fd70))

## [1.0.2](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.0.1...protobufjs-cli-v1.0.2) (2022-09-09)


### Bug Fixes

* add import long to the generated .d.ts ([#1802](https://github.com/protobufjs/protobuf.js/issues/1802)) ([7c27b5a](https://github.com/protobufjs/protobuf.js/commit/7c27b5ad5d161c9f3711aa053ca704f8e1224e90))

## [1.0.1](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v1.0.0...protobufjs-cli-v1.0.1) (2022-08-26)


### Bug Fixes

* **deps:** update dependency glob to v8 ([#1750](https://github.com/protobufjs/protobuf.js/issues/1750)) ([8303a64](https://github.com/protobufjs/protobuf.js/commit/8303a648bc12dcea5aa8e7efa042de39011857f9))
* remove unused `@types/long` ([#1785](https://github.com/protobufjs/protobuf.js/issues/1785)) ([0f4af83](https://github.com/protobufjs/protobuf.js/commit/0f4af83e4ed3cef1ec035c2833e0b06cab0bd87f))
* **types:** update type deps ([#1776](https://github.com/protobufjs/protobuf.js/issues/1776)) ([d87978b](https://github.com/protobufjs/protobuf.js/commit/d87978b8eb2a176676c58379a89206b94a6d926a))

## [1.0.0](https://github.com/protobufjs/protobuf.js/compare/protobufjs-cli-v0.1.0...protobufjs-cli-v1.0.0) (2022-07-08)


### ⚠ BREAKING CHANGES

* drop support for Node 4, 6, 8, 10 (#1764)
* move command line tool to a new package named protobufjs-cli (#1234)

### Features

* add --no-service option for pbjs static target ([#1577](https://github.com/protobufjs/protobuf.js/issues/1577)) ([d01394a](https://github.com/protobufjs/protobuf.js/commit/d01394a1463062824c066b653aad53c449752202))
* add alt-comment CLI option ([#1692](https://github.com/protobufjs/protobuf.js/issues/1692)) ([7558ef0](https://github.com/protobufjs/protobuf.js/commit/7558ef0f93177978272f68f1710144a26b63e525))
* add getTypeUrl method to generated code ([#1463](https://github.com/protobufjs/protobuf.js/issues/1463)) ([d13d5d5](https://github.com/protobufjs/protobuf.js/commit/d13d5d5688052e366aa2e9169f50dfca376b32cf))
* add null-defaults option ([#1611](https://github.com/protobufjs/protobuf.js/issues/1611)) ([6e713ba](https://github.com/protobufjs/protobuf.js/commit/6e713baf54bd987ae52cbf92a4f2742c70201dc0))
* add support for buffer configuration ([#1372](https://github.com/protobufjs/protobuf.js/issues/1372)) ([101aa1a](https://github.com/protobufjs/protobuf.js/commit/101aa1a4f148516fdc83a74f54a229f06e24a5de))
* allow message.getTypeUrl provide custom typeUrlPrefix ([#1762](https://github.com/protobufjs/protobuf.js/issues/1762)) ([8aad1dd](https://github.com/protobufjs/protobuf.js/commit/8aad1dd994b1fc1f23bd71adf3a81b7a5616b210))
* move command line tool to a new package named protobufjs-cli ([#1234](https://github.com/protobufjs/protobuf.js/issues/1234)) ([da34f43](https://github.com/protobufjs/protobuf.js/commit/da34f43ccd51ad97017e139f137521782f5ef119))
* prepare initial publication of cli ([#1752](https://github.com/protobufjs/protobuf.js/issues/1752)) ([64811d5](https://github.com/protobufjs/protobuf.js/commit/64811d5878c31e4a86a39da5fec6aea35da22fcd))
* proto3 optional support ([#1584](https://github.com/protobufjs/protobuf.js/issues/1584)) ([6c4d307](https://github.com/protobufjs/protobuf.js/commit/6c4d30716a9a756dcdc21d64f9c9d069315fc5b1))
* update dependencies / general cleanup ([#1356](https://github.com/protobufjs/protobuf.js/issues/1356)) ([42f49b4](https://github.com/protobufjs/protobuf.js/commit/42f49b43f692c24c2bc1ae081b4d1ad9fa173cd7))


### Bug Fixes

* **deps:** patch minimatch vulnerability ([#1704](https://github.com/protobufjs/protobuf.js/issues/1704)) ([bac61b8](https://github.com/protobufjs/protobuf.js/commit/bac61b8c2757804bbb9c5fa0f8bc6a7bcf0bb374))
* drop support for Node 4, 6, 8, 10 ([#1764](https://github.com/protobufjs/protobuf.js/issues/1764)) ([50370dd](https://github.com/protobufjs/protobuf.js/commit/50370dd7747a0986e83ddbe51c54b97033af5ead))
* es6 export enum ([#1446](https://github.com/protobufjs/protobuf.js/issues/1446)) ([9f33784](https://github.com/protobufjs/protobuf.js/commit/9f33784350b1efc2e774bbfc087cbd2c47828748))
* fromObject should not initialize oneof members ([#1597](https://github.com/protobufjs/protobuf.js/issues/1597)) ([90afe44](https://github.com/protobufjs/protobuf.js/commit/90afe4412de8070b0c0681e5905a6e0213072a85))
* proper relative path to protobufjs in cli ([#1753](https://github.com/protobufjs/protobuf.js/issues/1753)) ([a1d6029](https://github.com/protobufjs/protobuf.js/commit/a1d60292ecb22fcf89c493c562ae07ab10ef49c9))
* typo in pbjs help text ([#1552](https://github.com/protobufjs/protobuf.js/issues/1552)) ([7f46dbe](https://github.com/protobufjs/protobuf.js/commit/7f46dbeb538a6277035a896e1ab5e1a070e28681))
