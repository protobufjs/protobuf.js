# [6.6.3](https://github.com/dcodeIO/protobuf.js/releases/tag/6.6.3)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0be01a14915e3e510038808fedbc67192a182d9b) Support node 4.2.0 to 4.4.7 buffers + travis case, see [#665](https://github.com/dcodeIO/protobuf.js/issues/665)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a0920b2c32e7963741693f5a773b89f4b262688) Added ES6 syntax flag to pbjs, see [#667](https://github.com/dcodeIO/protobuf.js/issues/667)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c365242bdc28a47f5c6ab91bae34c277d1044eb3) Reference Buffer for BufferReader/Writer, see [#668](https://github.com/dcodeIO/protobuf.js/issues/668)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/43976072d13bb760a0689b54cc35bdea6817ca0d) Slightly shortened README<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e64cf65b09047755899ec2330ca0fc2f4d7932c2) Additional notes on the distinction of different use cases / distributions, see [#666](https://github.com/dcodeIO/protobuf.js/issues/666)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/83758c99275c2bbd30f63ea1661284578f5c9d91) Extended README with additional information on JSON format<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fdc3102689e8a3e8345eee5ead07ba3c9c3fe80c) Added extended usage instructions for TypeScript and custom classes to README, see [#666](https://github.com/dcodeIO/protobuf.js/issues/666)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3701488cca6bc56ce6b7ad93c7b80e16de2571a7) Updated dist files<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/579068a45e285c7d2c69b359716dd6870352f46f) Updated test cases to use new buffer util<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0be01a14915e3e510038808fedbc67192a182d9b) Added fetch test cases + some test cleanup<br />

# [6.6.2](https://github.com/dcodeIO/protobuf.js/releases/tag/6.6.2)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3aea1bf3d4920dc01603fda25b86e6436ae45ec2) Properly replace short vars when beautifying static code, see [#663](https://github.com/dcodeIO/protobuf.js/issues/663)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b6cf228a82152f72f21b1b307983126395313470) Use custom prelude in order to exclude any module loader code from source (for webpack), see [#658](https://github.com/dcodeIO/protobuf.js/issues/658)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/2b12fb7db9d4eaa3b76b7198539946e97db684c4) Make sure to check optional inner messages for null when encoding, see [#658](https://github.com/dcodeIO/protobuf.js/issues/658)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/276a594771329da8334984771cb536de7322d5b4) Initial attempt on a backwards compatible fetch implementation with binary support, see [#661](https://github.com/dcodeIO/protobuf.js/issues/661)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/2d81864fa5c4dac75913456d582e0bea9cf0dd80) Root#resolvePath skips files when returning null, see [#368](https://github.com/dcodeIO/protobuf.js/issues/368)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/aab3ec1a757aff0f11402c3fb943c003f092c1af) Changes callback on failed response decode in rpc service to pass actual error instead of 'error' string<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9044178c052299670108f10621d6e9b3d56e8a40) Travis should exit with the respective error when running sauce tests<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/73721f12072d77263e72a3b27cd5cf9409db9f8b) Moved checks whether a test case is applicable to parent case<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3fcd88c3f9b1a084b06cab2d5881cb5bb895869d) Added eventemitter tests and updated micromodule dependencies (so far)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/2db4305ca67d003d57aa14eb23f25eb6c3672034) Added lib/path tests and updated a few dependencies<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/2b12fb7db9d4eaa3b76b7198539946e97db684c4) Moved micro modules to lib so they can have their own tests etc.<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b6dfa9f0a4c899b5c217d60d1c2bb835e06b2122) Updated travis<br />

# [6.6.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.6.1)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/039ac77b062ee6ebf4ec84a5e6c6ece221e63401) Properly set up reflection when using light build<br />

# [6.6.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.6.0) ([release](https://github.com/dcodeIO/protobuf.js/releases/tag/6.6.0))

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/cdfe6bfba27fa1a1d0e61887597ad4bb16d7e5ed) Inlined / refactored away .testJSON, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Refactored util.extend away<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/27b16351f3286468e539c2ab382de4b52667cf5e) Reflected and statically generated services use common utility, now work exactly the same<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/dca26badfb843a597f81e98738e2fda3f66c7341) fromObject now throws for entirely bogus values (repeated, map and inner message fields), fixes [#601](https://github.com/dcodeIO/protobuf.js/issues/601)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4bff9c356ef5c10b4aa34d1921a3b513e03dbb3d) Cleaned up library distributions, now is full / light / minimal with proper browserify support for each<br />

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/301f7762ef724229cd1df51e496eed8cfd2f10eb) Do not randomly remove slashes from comments, fixes [#656](https://github.com/dcodeIO/protobuf.js/issues/656)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ef7be352baaec26bdcdce01a71fbee47bbdeec15) Properly parse nested textformat options, also tackles [#655](https://github.com/dcodeIO/protobuf.js/issues/655)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b4f4f48f1949876ae92808b0a5ca5f2b29cc011c) Relieved the requirement to call .resolveAll() on roots in order to populate static code-compatible properties, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/56c8ec4196d461383c3e1f271da02553d877ae81) Added a (highly experimental) debug build as a starting point for [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c5d291f9bab045385c5938ba0f6cdf50a315461f) Full build depends on light build depends on minimal build, shares all relevant code<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/735da4315a98a6960f3b5089115e308548b91c07) Also reuse specified root in pbjs for JSON modules, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3a056244d3acf339722d56549469a8df018e682e) Reuse specified root name in pbjs to be able to split definitions over multiple files more easily, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/28ddf756ab83cc890761ef2bd84a0788d2ad040d) Improved pbjs/pbts examples, better covers reflection with definitions for static modules<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6f0b44aea6cf72d23042810f05a7cede85239eb3) Fixed centered formatting on npm<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/dd96dcdacb8eae94942f7016b8dc37a2569fe420) Various other minor improvements / assertions refactored away, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3317a76fb56b9b31bb07ad672d6bdda94b79b6c3) Fixed some common reflection deopt sites, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Reflection performance pass, see [#653](https://github.com/dcodeIO/protobuf.js/issues/653)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Added TS definitions to alternative builds' index files<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a483a529ef9345ed217a23394a136db0d9f7771) Removed unnecessary prototype aliases, improves gzip ratio<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/641625fd64aca55b1163845e6787b58054ac36ec) Unified behaviour of and docs on Class constructor / Class.create<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7299929b37267af2100237d4f8b4ed8610b9f7e1) Statically generated services actually inherit from rpc.Service<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f4cf75e4e4192910b52dd5864a32ee138bd4e508) Do not try to run sauce tests for PRs<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/33da148e2b750ce06591c1c66ce4c46ccecc3c8f) Added utility to enable/disable debugging extensions to experimental debug build<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fdb1a729ae5f8ab762c51699bc4bb721102ef0c8) Fixed node 0.12 tests<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6bc5bb4a7649d6b91a5944a9ae20178d004c8856) Fixed coverage<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6f0b44aea6cf72d23042810f05a7cede85239eb3) Added a test case for [#652](https://github.com/dcodeIO/protobuf.js/issues/652)<br />

# [6.5.3](https://github.com/dcodeIO/protobuf.js/releases/tag/6.5.3)

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/799d0303bf289bb720f2b27af59e44c3197f3fb7) In fromObject, check if object is already a runtime message, see [#652](https://github.com/dcodeIO/protobuf.js/issues/652)<br />

# [6.5.2](https://github.com/dcodeIO/protobuf.js/releases/tag/6.5.2)

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8cff92fe3b7ddb1930371edb4937cd0db9216e52) Added coverage reporting<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/cbaaae99b4e39a859664df0e6d20f0491169f489) Added version scheme warning to everything CLI so that we don't need this overly explicit in README<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6877b3399f1a4c33568221bffb4e298b01b14439) Coverage progress, 100%<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/711a9eb55cb796ec1e51af7d56ef2ebbd5903063) Coverage progress<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e7526283ee4dd82231235afefbfad6af54ba8970) Attempted to fix badges once and for all<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5aa296c901c2b460ee3be4530ede394e2a45e0ea) Coverage progress<br />

# [6.5.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.5.1)

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9719fd2fa8fd97899c54712a238091e8fd1c57b2) Reuse module paths when looking up cli dependencies, see [#648](https://github.com/dcodeIO/protobuf.js/issues/648)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6302655d1304cf662f556be5d9fe7a016fcedc3c) Check actual module directories to determine if cli dependencies are present and bootstrap semver, see [#648](https://github.com/dcodeIO/protobuf.js/issues/648)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/dfc7c4323bf98fb26ddcfcfbb6896a6d6e8450a4) Added a note on semver-incompatibility, see [#649](https://github.com/dcodeIO/protobuf.js/issues/649)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/49053ffa0ea8a4ba5ae048706dba1ab6f3bc803b) Coverage progress<br />

# [6.5.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.5.0) ([release](https://github.com/dcodeIO/protobuf.js/releases/tag/6.5.0))

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3946e0fefea415f52a16ea7a74109ff40eee9643) Initial upgrade of converters to real generated functions, see [#620](https://github.com/dcodeIO/protobuf.js/issues/620)<br />

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/08cda241a3e095f3123f8a991bfd80aa3eae9400) An enum's default value present as a string looks up using typeDefault, not defaultValue which is an array if repeated<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c7e14b1d684aaba2080195cc83900288c5019bbc) Use common utility for virtual oneof getters and setters in both reflection and static code, see [#644](https://github.com/dcodeIO/protobuf.js/issues/644)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/508984b7ff9529906be282375d36fdbada66b8e6) Properly use Type.toObject/Message.toObject within converters, see [#641](https://github.com/dcodeIO/protobuf.js/issues/641)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5bca18f2d32e8687986e23edade7c2aeb6b6bac1) Generate null/undefined assertion in fromObject if actually NOT an enum, see [#620](https://github.com/dcodeIO/protobuf.js/issues/620)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/508984b7ff9529906be282375d36fdbada66b8e6) Replace ALL occurencies of types[%d].values in static code, see [#641](https://github.com/dcodeIO/protobuf.js/issues/641)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9b090bb1673aeb9b8f1d7162316fce4d7a3348f0) Switched to own property-aware encoders for compatibility, see [#639](https://github.com/dcodeIO/protobuf.js/issues/639)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/340d6aa82ac17c4a761c681fa71d5a0955032c8b) Now also parses comments, sets them on reflected objects and re-uses them when generating static code, see [#640](https://github.com/dcodeIO/protobuf.js/issues/640)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3cb82628159db4d2aa721b63619b16aadc5f1981) Further improved generated static code style<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/cda5c5452fa0797f1e4c375471aef96f844711f1) Removed scoping iifes from generated static code<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/def7b45fb9b5e01028cfa3bf2ecd8272575feb4d) Removed even more clutter from generated static code<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/dbd19fd9d3a57d033aad1d7173f7f66db8f8db3e) Removed various clutter from generated static code<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1cc8a2460c7e161c9bc58fa441ec88e752df409c) Made sure that static target's replacement regexes don't match fields<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d4272dbf5d0b2577af8efb74a94d246e2e0d728e) Also accept (trailing) triple-slash comments for compatibility with protoc-gen-doc, see [#640](https://github.com/dcodeIO/protobuf.js/issues/640)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0a3862b75fa60ef732e0cd36d623f025acc2fb45) Use semver to validate that CLI dependencies actually satisfy the required version, see [#637](https://github.com/dcodeIO/protobuf.js/issues/637)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9e360ea6a74d41307483e51f18769df7f5b047b9) Added a hint on documenting .proto files for static code<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d2a97bb818474645cf7ce1832952b2c3c739b234) Documented internally used codegen partials for what it's worth<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/079388ca65dfd581d74188a6ae49cfa01b103809) Updated converter documentation<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/168e448dba723d98be05c55dd24769dfe3f43d35) Bundler provides useful stuff to uglify and a global var without extra bloat<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/32e0529387ef97182ad0b9ae135fd8b883ed66b4) Cleaned and categorized tests, coverage progress<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3325e86930a3cb70358c689cb3016c1be991628f) Properly removed builtins from bundle<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/2c94b641fc5700c8781ac0b9fe796debac8d6893) Call hasOwnProperty builtin as late as possible decreasing the probability of having to call it at all (perf)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/818bcacde267be70a75e689f480a3caad6f80cf7) Slightly hardened codegen sprintf<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/818bcacde267be70a75e689f480a3caad6f80cf7) Significantly improved uint32 write performance<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b5daa272407cb31945fd38c34bbef7c9edd1db1c) Cleaned up test case data and removed unused files<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c280a4a18c6d81c3468177b2ea58ae3bc4f25e73) Removed now useless trailing comment checks, see [#640](https://github.com/dcodeIO/protobuf.js/issues/640)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/44167db494c49d9e4b561a66ad9ce2d8ed865a21) Ensured that pbjs' beautify does not break regular expressions in generated verify functions<br />

# [6.4.6](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.6)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e11012ce047e8b231ba7d8cc896b8e3a88bcb902) Case-sensitively test for legacy group definitions, fixes [#638](https://github.com/dcodeIO/protobuf.js/issues/638)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7e57f4cdd284f886b936511b213a6468e4ddcdce) Properly parse text format options + simple test case, fixes [#636](https://github.com/dcodeIO/protobuf.js/issues/636)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fe4d97bbc4d33ce94352dde62ddcd44ead02d7ad) Added SVG logo, see [#629](https://github.com/dcodeIO/protobuf.js/issues/629)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/57990f7ed8ad5c512c28ad040908cee23bbf2aa8) Also refactored Service and Type to inherit from NamespaceBase, see [#635](https://github.com/dcodeIO/protobuf.js/issues/635)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fe4d97bbc4d33ce94352dde62ddcd44ead02d7ad) Moved TS-compatible Namespace features to a virtual NamespaceBase class, compiles with strictNullChecks by default now, see [#635](https://github.com/dcodeIO/protobuf.js/issues/635)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fe4d97bbc4d33ce94352dde62ddcd44ead02d7ad) Minor codegen enhancements<br />

# [6.4.5](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.5)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1154ce0867306e810cf62a5b41bdb0b765aa8ff3) Properly handle empty/noop Writer#ldelim, fixes [#625](https://github.com/dcodeIO/protobuf.js/issues/625)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f303049f92c53970619375653be46fbb4e3b7d78) Properly annotate map fields in pbjs, fixes [#624](https://github.com/dcodeIO/protobuf.js/issues/624)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4b786282a906387e071a5a28e4842a46df588c7d) Made sure that Writer#bytes is always able to handle plain arrays<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1e6a8d10f291a16631376dd85d5dd385937e6a55) Slightly restructured utility to better support static code default values<br />

# [6.4.4](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.4)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/26d68e36e438b590589e5beaec418c63b8f939cf) Dynamically resolve jsdoc when running pbts, fixes [#622](https://github.com/dcodeIO/protobuf.js/issues/622)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/69c04d7d374e70337352cec9b445301cd7fe60d6) Explain 6.4.2 vs 6.4.3 in changelog<br />

# [6.4.3](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.4)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c2c39fc7cec5634ecd1fbaebbe199bf097269097) Fixed invalid definition of Field#packed property, also introduced decoder.compat mode (packed fields, on by default)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/11fb1a66ae31af675d0d9ce0240cd8e920ae75e7) Always decode packed/non-packed based on wire format only, see [#602](https://github.com/dcodeIO/protobuf.js/issues/602)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c9a61e574f5a2b06f6b15b14c0c0ff56f8381d1f) Use full library for JSON modules and runtime dependency for static modules, fixes [#621](https://github.com/dcodeIO/protobuf.js/issues/621)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e88d13ca7ee971451b57d056f747215f37dfd3d7) Additional workarounds for on demand CLI dependencies, see [#618](https://github.com/dcodeIO/protobuf.js/issues/618)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/44f6357557ab3d881310024342bcc1e0d336a20c) Revised automatic setup of cli dependencies, see [#618](https://github.com/dcodeIO/protobuf.js/issues/618)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e027a3c7855368837e477ce074ac65f191bf774a) Removed Android 4.0 test (no longer supported by sauce)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8ba3c5efd182bc80fc36f9d5fe5e2b615b358236) Removed some unused utility, slightly more efficient codegen, additional comments<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f22a34a071753bca416732ec4d01892263f543fb) Updated tests for new package.json layout<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f22a34a071753bca416732ec4d01892263f543fb) Added break/continue label support to codegen<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f2ffa0731aea7c431c59e452e0f74247d815a352) Updated dependencies, rebuilt dist files and changed logo to use an absolute url<br />

6.4.2 had been accidentally published as 6.4.3.

# [6.4.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.1)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9035d4872e32d6402c8e4d8c915d4f24d5192ea9) Added more default value checks to converter, fixes [#616](https://github.com/dcodeIO/protobuf.js/issues/616)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/62eef58aa3b002115ebded0fa58acc770cd4e4f4) Respect long defaults in converters<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e3170a160079a3a7a99997a2661cdf654cb69e24) Convert inner messages and undefined/null values more thoroughly, fixes [#615](https://github.com/dcodeIO/protobuf.js/issues/615)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b52089efcb9827537012bebe83d1a15738e214f4) Always use first defined enum value as field default, fixes [#613](https://github.com/dcodeIO/protobuf.js/issues/613)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/64f95f9fa1bbe42717d261aeec5c16d1a7aedcfb) Install correct 'tmp' dependency when running pbts without dev dependencies installed, fixes [#612](https://github.com/dcodeIO/protobuf.js/issues/612)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/cba46c389ed56737184e5bc2bcce07243d52e5ce) Generate named constructors for runtime messages, see [#588](https://github.com/dcodeIO/protobuf.js/issues/588)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ee20b81f9451c56dc106177bbf9758840b99d0f8) pbjs/pbts no longer generate any volatile headers, see [#614](https://github.com/dcodeIO/protobuf.js/issues/614)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ec9d517d0b87ebe489f02097c2fc8005fae38904) Attempted to make broken shields less annoying<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5cd4c2f2a94bc3c0f2c580040bce28dd42eaccec) Updated README<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0643f93f5c0d96ed0ece5b47f54993ac3a827f1b) Some cleanup and added a logo<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/169638382de9efe35a1079c5f2045c33b858059a) use $protobuf.Long<br />

# [6.4.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.0) ([release](https://github.com/dcodeIO/protobuf.js/releases/tag/6.4.0))

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a017bf8a2dbdb7f9e7ce4c026bb6845174feb3b1) Dropped IE8 support<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/39bc1031bb502f8b677b3736dd283736ea4d92c1) Removed now unused util.longNeq which was used by early static code<br />

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5915ff972482e7db2a73629244ab8a93685b2e55) Do not swallow errors in loadSync, also accept negative enum values in Enum#add, fixes [#609](https://github.com/dcodeIO/protobuf.js/issues/609)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fde56c0de69b480343931264a01a1ead1e3156ec) Improved bytes field support, also fixes [#606](https://github.com/dcodeIO/protobuf.js/issues/606)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0c03f327115d57c4cd5eea3a9a1fad672ed6bd44) Fall back to browser Reader when passing an Uint8Array under node, fixes [#605](https://github.com/dcodeIO/protobuf.js/issues/605)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7eb3d456370d7d66b0856e32b2d2602abf598516) Respect optional properties when writing interfaces in tsd-jsdoc, fixes [#598](https://github.com/dcodeIO/protobuf.js/issues/598)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/bcadffecb3a8b98fbbd34b45bae0e6af58f9c810) Instead of protobuf.parse.keepCase, fall back to protobuf.parse.defaults holding all possible defaults, see [#608](https://github.com/dcodeIO/protobuf.js/issues/608)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a4d6a2af0d57a2e0cccf31e3462c8b2465239f8b) Added global ParseOptions#keepCase fallback as protobuf.parse.keepCase, see [#608](https://github.com/dcodeIO/protobuf.js/issues/608)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a017bf8a2dbdb7f9e7ce4c026bb6845174feb3b1) Converters use code generation and support custom implementations<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/28ce07d9812f5e1743afef95a94532d2c9488a84) Be more verbose when throwing invalid wire type errors, see [#602](https://github.com/dcodeIO/protobuf.js/issues/602)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/40074bb69c3ca4fcefe09d4cfe01f3a86844a7e8) Added an asJSON-option to always populate array fields, even if defaults=false, see [#597](https://github.com/dcodeIO/protobuf.js/issues/597)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a7d23240a278aac0bf01767b6096d692c09ae1ce) Attempt to improve TypeScript support by using explicit exports<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/cec253fb9a177ac810ec96f4f87186506091fa37) Copy-pasted typescript definitions to micro modules, see [#599](https://github.com/dcodeIO/protobuf.js/issues/599)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1f18453c7bfcce65c258fa98a3e3d4577d2e550f) Emit an error on resolveAll() if any extension fields cannot be resolved, see [#595](https://github.com/dcodeIO/protobuf.js/issues/595) + test case<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/804739dbb75359b0034db0097fe82081e3870a53) Removed 'not recommend' label for --keep-case, see [#608](https://github.com/dcodeIO/protobuf.js/issues/608)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9681854526f1813a6ef08becf130ef2fbc28b638) Added customizable linter configuration to pbjs<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9681854526f1813a6ef08becf130ef2fbc28b638) Added stdin support to pbjs and pbts<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/407223b5ceca3304bc65cb48888abfdc917d5800) Static code no longer uses IE8 support utility<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a017bf8a2dbdb7f9e7ce4c026bb6845174feb3b1) Generated static code now supports asJSON/from<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3c775535517b8385a1d3c1bf056f3da3b4266f8c) Added support for TypeScript enums to pbts<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0cda72a55a1f2567a5d981dc5d924e55b8070513) Added a few helpful comments to static code<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/24b293c297feff8bda5ee7a2f8f3f83d77c156d0) Slightly beautify statically generated code<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/65637ffce20099df97ffbcdce50faccc8e97c366) Do not wrap main definition as a module and export directly instead<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/65637ffce20099df97ffbcdce50faccc8e97c366) Generate prettier definitions with --no-comments<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/20d8a2dd93d3bbb6990594286f992e703fc4e334) Added variable arguments support to tsd-jsdoc<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8493dbd9a923693e943f710918937d83ae3c4572) Reference dependency imports as a module to prevent name collisions, see [#596](https://github.com/dcodeIO/protobuf.js/issues/596)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/39a2ea361c50d7f4aaa0408a0d55bb13823b906c) Removed now unnecessary comment lines in generated static code<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a4e41b55471d83a8bf265c6641c3c6e0eee82e31) Added notes on CSP-restricted environments to README, see [#593](https://github.com/dcodeIO/protobuf.js/issues/593)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1a3effdad171ded0608e8da021ba8f9dd017f2ff) Added test case for asJSON with arrays=true, see [#597](https://github.com/dcodeIO/protobuf.js/issues/597)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/751a90f509b68a5f410d1f1844ccff2fc1fc056a) Added a tape adapter to assert message equality accross browsers<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fde56c0de69b480343931264a01a1ead1e3156ec) Refactored some internal utility away<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/805291086f6212d1f108b3d8f36325cf1739c0bd) Reverted previous attempt on [#597](https://github.com/dcodeIO/protobuf.js/issues/597)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c5160217ea95996375460c5403dfe37b913d392e) Minor tsd-jsdoc refactor<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/961dd03061fc2c43ab3bf22b3f9f5165504c1002) Removed unused sandbox files<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f625eb8b0762f8f5d35bcd5fc445e52b92d8e77d) Updated package.json of micro modules to reference types, see [#599](https://github.com/dcodeIO/protobuf.js/issues/599)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/46ec8209b21cf9ff09ae8674e2a5bbc49fd4991b) Reference dependencies as imports in generated typescript definitions, see [#596](https://github.com/dcodeIO/protobuf.js/issues/596)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3bab132b871798c7c50c60a4c14c2effdffa372e) Allow null values on optional long fields, see [#590](https://github.com/dcodeIO/protobuf.js/issues/590)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/31da56c177f1e11ffe0072ad5f58a55e3f8008fd) Various jsdoc improvements and a workaround for d.ts generation, see [#592](https://github.com/dcodeIO/protobuf.js/issues/592)<br />

# [6.3.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.3.1)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/95ed6e9e8268711db24f44f0d7e58dd278ddac4c) Empty inner messages are always present on the wire + test case + removed now unused Writer#ldelim parameter, see [#585](https://github.com/dcodeIO/protobuf.js/issues/585)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e8a4d5373b1a00cc6eafa5b201b91d0e250cc00b) Expose tsd-jsdoc's comments option to pbts as --no-comments, see [#587](https://github.com/dcodeIO/protobuf.js/issues/587)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6fe099259b5985d873ba5bec88c049d7491a11cc) Increase child process max buffer when running jsdoc from pbts, see [#587](https://github.com/dcodeIO/protobuf.js/issues/587)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3d84ecdb4788d71b5d3928e74db78e8e54695f0a) pbjs now generates more convenient dot-notation property accessors<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1e0ebc064e4f2566cebf525d526d0b701447bd6a) And fixed IE8 again (should probably just drop IE8 for good)<br />

# [6.3.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.3.0)

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a97956b1322b6ee62d4fc9af885658cd5855e521) Moved camelCase/underScore away from util to where actually used<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c144e7386529b53235a4a5bdd8383bdb322f2825) Renamed asJSON option keys (enum to enums, long to longs) because enum is a reserved keyword<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5b9ade428dca2df6a13277522f2916e22092a98b) Moved JSON/Message conversion to its own source file and added Message/Type.from + test case, see [#575](https://github.com/dcodeIO/protobuf.js/issues/575)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0b0de2458a1ade1ccd4ceb789697be13290f856b) Relicensed the library and its components to BSD-3-Clause to match the official implementation (again)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Dropped support for browser buffer entirely (is an Uint8Array anyway), ensures performance and makes things simpler<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Removed dead parts of the Reader API<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/964f65a9dd94ae0a18b8be3d9a9c1b0b1fdf6424) Refactored BufferReader/Writer to their own files and removed unnecessary operations (node always has FloatXXArray and browser buffer uses ieee anyway)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/bfac0ea9afa3dbaf5caf79ddf0600c3c7772a538) Stripped out fallback encoder/decoder/verifier completely (even IE8 supports codegen), significantly reduces bundle size, can use static codegen elsewhere<br />

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c3023a2f51fc74547f6c6e53cf75feed60f3a25c) Actually concatenate mixed custom options when parsing<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0d66b839df0acec2aea0566d2c0bbcec46c3cd1d) Fixed a couple of issues with alternative browser builds<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/33706cdc201bc863774c4af6ac2c38ad96a276e6) Properly set long defaults on prototypes<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0ea2740f0774b4c5c349b9c303f3fb2c2743c37b) Fixed reference error in minimal runtime, see [#580](https://github.com/dcodeIO/protobuf.js/issues/580)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/741b6d8fde84d9574676a729a29a428d99f0a0a0) Non-repeated empty messages are always present on the wire, see [#581](https://github.com/dcodeIO/protobuf.js/issues/581)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7fac9d6a39bf42d316c1676082a2d0804bc55934) Properly check Buffer.prototype.set with node v4<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3ad8108eab57e2b061ee6f1fddf964abe3f4cbc7) Prevent NRE and properly annotate verify signature in tsd-jsdoc, fixed [#572](https://github.com/dcodeIO/protobuf.js/issues/572)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6c2415d599847cbdadc17dee3cdf369fc9facade) Fix directly using Buffer instead of util.Buffer<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/19e906c2a15acc6178b3bba6b19c2f021e681176) Added filter type to Namespace#lookup, fixes [#569](https://github.com/dcodeIO/protobuf.js/issues/569)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Fixed parsing enum inner options, see [#565](https://github.com/dcodeIO/protobuf.js/issues/565)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ea7ba8b83890084d61012cb5386dc11dadfb3908) Fixed release links in README files<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/442471363f99e67fa97044f234a47b3c9b929dfa) Added a noparse build for completeness<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/bfee1cc3624d0fa21f9553c2f6ce2fcf7fcc09b7) Now compresses .gz files using zopfli to make them useful beyond being just a reference<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/aed134aa1cd7edd801de77c736cf5efe6fa61cb0) Updated non-bundled google types folder with missing descriptors and added wrappers to core<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0b0de2458a1ade1ccd4ceb789697be13290f856b) Replaced the ieee754 implementation for old browsers with a faster, use-case specific one + simple test case<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Added .create to statically generated types and uppercase nested elements to reflection namespaces, see [#576](https://github.com/dcodeIO/protobuf.js/issues/576)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Also added Namespace#getEnum for completeness, see [#576](https://github.com/dcodeIO/protobuf.js/issues/576)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ef43acff547c0cd84cfb7a892fe94504a586e491) Added Namespace#getEnum and changed #lookupEnum to the same behavior, see [#576](https://github.com/dcodeIO/protobuf.js/issues/576)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1fcfdfe21c1b321d975a8a96d133a452c9a9c0d8) Added a heap of coverage comments for usually unused code paths to open things up<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c234de7f0573ee30ed1ecb15aa82b74c0f994876) Added codegen test to determine if any ancient browsers don't actually support it<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fed2000e7e461efdb1c3a1a1aeefa8b255a7c20b) Added legacy groups support to pbjs, see [#568](https://github.com/dcodeIO/protobuf.js/issues/568)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/974a1321da3614832aa0a5b2e7c923f66e4ba8ae) Initial support for legacy groups + test case, see [#568](https://github.com/dcodeIO/protobuf.js/issues/568)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Added asJSON bytes as Buffer, see [#566](https://github.com/dcodeIO/protobuf.js/issues/566)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c60cd397e902ae6851c017f2c298520b8336cbee) Annotated callback types in pbjs-generated services, see [#582](https://github.com/dcodeIO/protobuf.js/issues/582)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3e7e4fc59e6d2d6c862410b4b427fbedccdb237b) Removed type/ns alias comment in static target to not confuse jsdoc unnecessarily<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Made pbjs use loadSync for deterministic outputs, see [#573](https://github.com/dcodeIO/protobuf.js/issues/573)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4d1f5facfcaaf5f2ab6a70b12443ff1b66e7b94e) Updated documentation on runtime and noparse builds<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c59647a7542cbc4292248787e5f32bb99a9b8d46) Fixed an issue with the changelog generator skipping some commits<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/24f2c03af9f13f5404259866fdc8fed33bfaae25) Added notes on how to use pbjs and pbts programmatically<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3544576116146b209246d71c7f7a9ed687950b26) Manually sorted old changelog entries<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d5812571f335bae68f924aa1098519683a9f3e44) Initial changelog generator, see [#574](https://github.com/dcodeIO/protobuf.js/issues/574)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Added static/JSON module interchangeability to README<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7939a4bd8baca5f7e07530fc93f27911a6d91c6f) Updated README and bundler according to dynamic require calls<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/93e04f1db4a9ef3accff8d071c75be3d74c0cd4a) Added basic services test case<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b5a068f5b79b6f00c4b05d9ac458878650ffa09a) Just polyfill Buffer.from / .allocUnsafe for good<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4375a485789e14f7bf24bece819001154a03dca2) Added a test case to find out if all the fallbacks are just for IE8<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/deb2e82ed7eda41d065a09d120e91c0f7ecf1e6a) Commented out float assertions in float test including explanation<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d3ebd5745b024033fbc2410ecad4d4e02abd67db) Expose array implementation used with (older) browsers on util for tests<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b1b6a813c93da4c7459755186aa02ef2f3765c94) Updated test cases<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/99dc5faa7b39fdad8ebc102de4463f8deb7f48ff) Added assumptions to float test case<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/948ca2e3c5c62fedcd918d75539c261abf1a7347) Updated travis config to use C++11<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c59647a7542cbc4292248787e5f32bb99a9b8d46) Updated / added additional LICENSE files where appropriate<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/333f0221814be976874862dc83d0b216e07d4012) Integrated changelog into build process, now also has 'npm run make' for everything, see [#574](https://github.com/dcodeIO/protobuf.js/issues/574)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Minor optimizations through providing type-hints<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Reverted shortened switch statements in verifier<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Enums can't be map key types<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8ef6975b0bd372b79e9b638f43940424824e7176) Use custom require (now a micromodule) for all optional modules, see [#571](https://github.com/dcodeIO/protobuf.js/issues/571)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e226f001e4e4633d64c52be4abc1915d7b7bd515) Support usage when size = 0<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/19e906c2a15acc6178b3bba6b19c2f021e681176) Reverted aliases frequently used in codegen for better gzip ratio<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/47b51ec95a540681cbed0bac1b2f02fc4cf0b73d) Shrinked bundle size - a bit<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f8451f0058fdf7a1fac15ffc529e4e899c6b343c) Can finally run with --trace-deopt again without crashes<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Other minor optimizations<br />

# [6.2.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.2.1)

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1a6fdc9a11fb08506d09351f8e853384c2b8be25) Added ParseOptions to protobuf.parse and --keep-case for .proto sources to pbjs, see [#564](https://github.com/dcodeIO/protobuf.js/issues/564)<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fc383d0721d83f66b2d941f0d9361621839327e9) Better TypeScript definition support for @property-annotated objects<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4531d75cddee9a99adcac814d52613116ba789f3) Can't just inline longNeq but can be simplified<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8f25377cf99036794ba13b160a5060f312d1a7e7) Array abuse and varint optimization<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/90b201209a03e8022ada0ab9182f338fa0813651) Updated dependencies<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f1110b0993ec86e0a4aee1735bd75b901952cb36) Other minor improvements to short ifs<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c079c900e2d61c63d5508eafacbd00163d377482) Reader/Writer example<br />

# [6.2.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.2.0)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9b7b92a4c7f8caa460d687778dc0628a74cdde37) Fixed reserved names re, also ensure valid service method names, see [#559](https://github.com/dcodeIO/protobuf.js/issues/559)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a83425049c9a78c5607bc35e8089e08ce78a741e) Fix d.ts whitespace on empty lines, added tsd-jsdoc LICENSE<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5f9bede280aa998afb7898e8d2718b4a229e8e6f) Fix asJSON defaults option, make it work for repeated fields.<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b0aef62191b65cbb305ece84a6652d76f98da259) Inlined any Reader/Writer#tag calls, also fixes [#556](https://github.com/dcodeIO/protobuf.js/issues/556)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4d091d41caad9e63cd64003a08210b78878e01dd) Fix building default dist files with explicit runtime=false<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/096dfb686f88db38ed2d8111ed7aac36f8ba658a) Apply asJSON recursively<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/19c269f1dce1b35fa190f264896d0865a54a4fff) Ensure working reflection class names with minified builds<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9c769504e0ffa6cbe0b6f8cdc14f1231bed7ee34) Lazily resolve (some) cyclic dependencies, see [#560](https://github.com/dcodeIO/protobuf.js/issues/560)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/da07d8bbbede4175cc45ca46d883210c1082e295) Added protobuf.roots to minimal runtime, see [#554](https://github.com/dcodeIO/protobuf.js/issues/554)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8f407a18607334185afcc85ee98dc1478322bd01) Repo now includes a restructured version of tsd-jsdoc with our changes incorporated for issues/prs, see [#550](https://github.com/dcodeIO/protobuf.js/issues/550)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1b5e4250415c6169eadb405561242f847d75044b) Updated pbjs arguments<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4750e3111b9fdb107d0fc811e99904fbcdbb6de1) Pipe tsd-jsdoc output (requires dcodeIO/tsd-jsdoc/master) and respect cwd, see [#550](https://github.com/dcodeIO/protobuf.js/issues/550)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/75f4b6cb6325a3fc7cd8fed3de5dbe0b6b29c748) tsd-jsdoc progress<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/766171e4c8b6650ea9c6bc3e76c9c96973c2f546) README<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c33835cb1fe1872d823e94b0fff024dc624323e8) Added GH issue template<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6f9ffb6307476d48f45dc4f936744b82982d386b) Path micromodule, dependencies<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0b9b1d8505743995c5328daab1f1e124debc63bd) Test case for [#556](https://github.com/dcodeIO/protobuf.js/issues/556)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/74b2c5c5d33a46c3751ebeadc9d934d4ccb8286c) Raw alloc benchmark<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fb74223b7273530d8baa53437ee96c65a387436d) Other minor optimizations<br />

# [6.1.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.1.1)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/baea920fa6bf5746e0a7888cdbb089cd5d94fc90) Properly encode/decode map kv pairs as repeated messages (codegen and fallback), see [#547](https://github.com/dcodeIO/protobuf.js/issues/547)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/28a1d26f28daf855c949614ef485237c6bf316e5) Make genVerifyKey actually generate conditions for 32bit values and bool, fixes [#546](https://github.com/dcodeIO/protobuf.js/issues/546)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3e9d8ea9a5cbb2e029b5c892714edd6926d2e5a7) Fix to generation of verify methods for bytes<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e7893675ccdf18f0fdaea8f9a054a6b5402b060e) Take special care of oneofs when encoding (i.e. when explicitly set to defaults), see [#542](https://github.com/dcodeIO/protobuf.js/issues/542)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/52cd8b5a891ec8e11611127c8cfa6b3a91ff78e3) Added Message#asJSON option for bytes conversion<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/01365ba9116ca1649b682635bb29814657c4133c) Added Namespace#lookupType and Namespace#lookupService (throw instead of returning null), see [#544](https://github.com/dcodeIO/protobuf.js/issues/544)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a54fbc918ef6bd627113f05049ff704e07bf33b4) Provide prebuilt browser versions of the static runtime<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3783af7ca9187a1d9b1bb278ca69e0188c7e4c66) Initial pbts CLI for generating TypeScript definitions, see [#550](https://github.com/dcodeIO/protobuf.js/issues/550)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b8bce03405196b1779727f246229fd9217b4303d) Refactored json/static-module targets to use common wrappers<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/691231fbc453a243f48a97bfb86794ab5718ef49) Refactor cli to support multiple built-in wrappers, added named roots instead of always using global.root and added additionally necessary eslint comments, see [#540](https://github.com/dcodeIO/protobuf.js/issues/540)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e3e77d0c7dc973d3a5948a49d123bdaf8a048030) Annotate namespaces generated by static target, see [#550](https://github.com/dcodeIO/protobuf.js/issues/550)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/aff21a71e6bd949647b1b7721ea4e1fe16bcd933) static target: Basic support for oneof fields, see [#542](https://github.com/dcodeIO/protobuf.js/issues/542)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b6b00aa7b0cd35e0e8f3c16b322788e9942668d4) Fix to reflection documentation<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ed86f3acbeb6145be5f24dcd05efb287b539e61b) README on minimal runtime / available downloads<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d31590b82d8bafe6657bf877d403f01a034ab4ba) Notes on descriptors vs static modules<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ce41d0ef21cee2d918bdc5c3b542d3b7638b6ead) A lot of minor optimizations to performance and gzip ratio<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ecbb4a52fbab445e63bf23b91539e853efaefa47) Minimized base64 tables<br />

# [6.1.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.1.0)

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a46cc4934b7e888ae80e06fd7fdf91e5bc7f54f5) Removed as-function overload for Reader/Writer, profiler stub, optimized version of Reader#int32<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7983ee0ba15dc5c1daad82a067616865051848c9) Refactored Prototype and inherits away, is now Class and Message for more intuitive documentation and type refs<br />

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c3c70fe3a47fd4f7c85dc80e1af7d9403fe349cd) Fixed failing test case on node < 6<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/66be5983321dd06460382d045eb87ed72a186776) Fixed serialization order of sfixed64, fixes [#536](https://github.com/dcodeIO/protobuf.js/issues/536)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7def340833f9f1cc41f4835bd0d62e203b54d9eb) Fixed serialization order of fixed64, fallback to parseInt with no long lib, see [#534](https://github.com/dcodeIO/protobuf.js/issues/534)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/98a58d40ca7ee7afb1f76c5804e82619104644f6) Actually allow undefined as service method type, fixes [#528](https://github.com/dcodeIO/protobuf.js/issues/528)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/38d867fc50a4d7eb1ca07525c9e4c71b8782443e) Do not skip optional delimiter after aggregate options, fixes [#520](https://github.com/dcodeIO/protobuf.js/issues/520)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/67449db7c7416cbc59ad230c168cf6e6b6dba0c5) Verify empty base64 encoded strings for bytes fields, see [#535](https://github.com/dcodeIO/protobuf.js/issues/535)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ef0fcb6d525c5aab13a39b4f393adf03f751c8c9) wrong spell role should be rule<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/55db92e21a26c04f524aeecb2316968c000e744d) decodeDelimited always forks if writer is specified, see [#531](https://github.com/dcodeIO/protobuf.js/issues/531)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ebae1e18152617f11ac07827828f5740d4f2eb7e) Mimic spec-compliant behaviour in oneof getVirtual, see [#523](https://github.com/dcodeIO/protobuf.js/issues/523)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/a0398f5880c434ff88fd8d420ba07cc29c5d39d3) Initial base64 string support for bytes fields, see [#535](https://github.com/dcodeIO/protobuf.js/issues/535)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a6c00c3e1def5d35c7fcaa1bbb6ce4e0fe67544) Initial type-checking verifier, see [#526](https://github.com/dcodeIO/protobuf.js/issues/526), added to bench out of competition<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3aa984e063cd73e4687102b4abd8adc16582dbc4) Initial loadSync (node only), see [#529](https://github.com/dcodeIO/protobuf.js/issues/529)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f1370ff5b0db2ebb73b975a3d7c7bd5b901cbfac) Initial RPC service implementaion, see [#529](https://github.com/dcodeIO/protobuf.js/issues/529)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/090d8eaf10704a811a73e1becd52f2307cbcad48) added 'defaults' option to Prototype#asJSON, see [#521](https://github.com/dcodeIO/protobuf.js/issues/521)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7c28483d65cde148e61fe9993f1716960b39e049) Use Uint8Array pool in browsers, just like node does with buffers<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4157a0ec2e54c4d19794cb16edddcd8d4fbd3e76) Also validate map fields, see [#526](https://github.com/dcodeIO/protobuf.js/issues/526) (this really needs some tests)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0ce099bf4f4666fd00403a2839e6da628b8328a9) Added json-module target to pbjs, renamed static to static-module, see [#522](https://github.com/dcodeIO/protobuf.js/issues/522)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1d99442fe65fcaa2f9e33cc0186ef1336057e0cf) updated internals and static target to use immutable objects on prototypes<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e6eaa91b9fe021b3356d4d7e42033a877bc45871) Added a couple of alternative signatures, protobuf.load returns promise or undefined, aliased Reader/Writer-as-function signature with Reader/Writer.create for typed dialects, see [#518](https://github.com/dcodeIO/protobuf.js/issues/518)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9df6a3d4a654c3e122f97d9a594574c7bbb412da) Added variations for Root#load, see [#527](https://github.com/dcodeIO/protobuf.js/issues/527)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/193e65c006a8df8e9b72e0f23ace14a94952ee36) Added benchmark and profile related information to README<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/228a2027de35238feb867cb0485c78c755c4d17d) Added service example to README, see [#529](https://github.com/dcodeIO/protobuf.js/issues/529)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1a8c720714bf867f1f0195b4690faefa4f65e66a) README on tests<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/014fb668dcf853874c67e3e0aeb7b488a149d35c) Update README/dist to reflect recent changes<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/11d844c010c5a22eff9d5824714fb67feca77b26) Minimal documentation for micromodules<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/47608dd8595b0df2b30dd18fef4b8207f73ed56a) Document all the callbacks, see [#527](https://github.com/dcodeIO/protobuf.js/issues/527)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3891ab07bbe20cf84701605aa62453a6dbdb6af2) Documented streaming-rpc example a bit<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5606cb1bc41bc90cb069de676650729186b38640) Removed the need for triple-slash references in .d.ts by providing a minimal Long interface, see [#527](https://github.com/dcodeIO/protobuf.js/issues/527), see [#530](https://github.com/dcodeIO/protobuf.js/issues/530)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/adf3cc3d340f8b2a596c892c64457b15e42a771b) Transition to micromodules<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f3a9589b74af6a1bf175f2b1994badf703d7abc4) Refactored argument order of utf8 for plausibility<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/14c207ed6e05a61e756fa4192efb2fa219734dd6) Restructured reusable micromodules<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/b510ba258986271f07007aebc5dcfea7cfd90cf4) Can't use Uint8Array#set on node < 6 buffers<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/78952a50ceee8e196b4f156eb01f7f693b5b8aac) Test case for [#531](https://github.com/dcodeIO/protobuf.js/issues/531)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/954577c6b421f7d7f4905bcc32f57e4ebaf548da) Safer signaling for synchronous load, see [#529](https://github.com/dcodeIO/protobuf.js/issues/529)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9ea3766ff1b8fb7ccad028f44efe27d3b019eeb7) Proper end of stream signaling to rpcImpl, see [#529](https://github.com/dcodeIO/protobuf.js/issues/529)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/e4faf7fac9b34d4776f3c15dfef8d2ae54104567) Moved event emitter to util, also accepts listener context, see [#529](https://github.com/dcodeIO/protobuf.js/issues/529)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9bdec62793ce77c954774cc19106bde4132f24fc) Probably the worst form of hiding require programmatically, see [#527](https://github.com/dcodeIO/protobuf.js/issues/527)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4462d8b05d3aba37c865cf53e09b3199cf051a92) Attempt to hide require('fs') from webpack, see [#527](https://github.com/dcodeIO/protobuf.js/issues/527)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7c3bf8d32cbf831b251730b3876c35c901926300) Trying out jsdoc variations, see [#527](https://github.com/dcodeIO/protobuf.js/issues/527)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/bb4059467287fefda8f966de575fd0f8f9690bd3) by the way, why not include the json->proto functionality into "util"?<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f1008e6ee53ee50358e19c10df8608e950be4be3) Update proto.js<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fc9014822d9cdeae8c6e454ccb66ee28f579826c) Automatic profile generation and processing<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/2a2f6dcab5beaaa98e55a005b3d02643c45504d6) Generalized buffer pool and moved it to util<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/53a16bf3ada4a60cc09757712e0046f3f2d9d094) Make shields visible on npm, yey<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9004b9d0c5135a7f6df208ea658258bf2f9e6fc9) More shields, I love shields, and maybe a workaround for travis timing out when sauce takes forever<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/060a7916a2715a9e4cd4d05d7c331bec33e60b7e) Trying SauceLabs with higher concurrency<br />

# [6.0.2](https://github.com/dcodeIO/protobuf.js/releases/tag/6.0.2)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/23d664384900eb65e44910def45f04be996fbba1) Fix packable float/double see [#513](https://github.com/dcodeIO/protobuf.js/issues/513)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/54283d39c4c955b6a84f7f53d4940eec39e4df5e) Handle oneofs in prototype ctor, add non-ES5 fallbacks, test case<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0ae66752362899b8407918a759b09938e82436e1) Be nice to AMD, allow reconfiguration of Reader/Writer interface<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/00f3574ef4ee8b237600e41839bf0066719c4469) Initial static codegen target for reference<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/81e36a7c14d89b487dfe7cfb2f8380fcdf0df392) pbjs static target services support<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4885b8239eb74c72e665787ea0ece3336e493d7f) pbjs static target progress, uses customizable wrapper template<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ad5abe7bac7885ba4f68df7eeb800d2e3b81750b) Static pbjs target progress, now generates usable CommonJS code, see [#512](https://github.com/dcodeIO/protobuf.js/issues/512)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d9634d218849fb49ff5dfb4597bbb2c2d43bbf08) TypeScript example<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fce8276193a5a9fabad5e5fbeb2ccd4f0f3294a9) Adjectives, notes on browserify<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/23d664384900eb65e44910def45f04be996fbba1) Refactor runtime util into separate file, reader/writer uses runtime util<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f91c432a498bebc0adecef1562061b392611f51a) Also optimize reader with what we have learned<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d83f799519fe69808c88e83d9ad66c645d15e963) More (shameless) writer over-optimization<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8a2dbc610a06fe3a1a2695a3ab032d073b77760d) Trading package size for float speed<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/95c5538cfaf1daf6b4990f6aa7599779aaacf99f) Skip defining getters and setters on IE8 entirely, automate defining fallbacks<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/09865d069303e795e475c82afe2b2267abaa59ea) Unified proto/reflection/classes/static encoding API to always return a writer<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/98d6ae186a48416e4ff3030987caed285f40a4f7) plain js utf8 is faster for short strings<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/79fbbf48b8e4dc9c41dcbdef2b73c5f2608b0318) improve TypeScript support. add simple test script.<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/96fa07adec8b0ae05e07c2c40383267f25f2fc92) Use long.js dependency in tests, reference types instead of paths in .d.ts see [#503](https://github.com/dcodeIO/protobuf.js/issues/503)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5785dee15d07fbcd14025a96686707173bd649a0) Restructured encoder / decoder to better support static code gen<br />

# [6.0.1](https://github.com/dcodeIO/protobuf.js/releases/tag/6.0.1)

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/799c1c1a84b255d1831cc84c3d24e61b36fa2530) Add support for long strings, fixes [#509](https://github.com/dcodeIO/protobuf.js/issues/509)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6e5fdb67cb34f90932e95a51370e1652acc55b4c) expose zero on LongBits, fixes [#508](https://github.com/dcodeIO/protobuf.js/issues/508)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/aa922c07490f185c5f97cf28ebbd65200fc5e377) Fixed issues with Root.fromJSON/#addJSON, search global for Long<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/51fe45656b530efbba6dad92f92db2300aa18761) Properly exclude browserify's annoying _process, again, fixes [#502](https://github.com/dcodeIO/protobuf.js/issues/502)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3c16e462a28c36abbc8a176eab9ac2e10ba68597) Remember loaded files earlier to prevent race conditions, fixes [#501](https://github.com/dcodeIO/protobuf.js/issues/501)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4012a00a0578185d92fb6e7d3babd059fee6d6ab) Allow negative enum ids even if super inefficient (encodes as 10 bytes), fixes [#499](https://github.com/dcodeIO/protobuf.js/issues/499), fixes [#500](https://github.com/dcodeIO/protobuf.js/issues/500)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/96dd8f1729ad72e29dbe08dd01bc0ba08446dbe6) set resolvedResponseType on resolve(), fixes [#497](https://github.com/dcodeIO/protobuf.js/issues/497)<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/d3ae961765e193ec11227d96d699463de346423f) Initial take on runtime services, see [#507](https://github.com/dcodeIO/protobuf.js/issues/507)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/90cd46b3576ddb2d0a6fc6ae55da512db4be3acc) Include dist/ in npm package for frontend use<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/4affa1b7c0544229fb5f0d3948df6d832f6feadb) pbjs proto target field options, language-level compliance with jspb test.proto<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6a06e95222d741c47a51bcec85cd20317de7c0b0) always use Uint8Array in docs for tsd, see [#503](https://github.com/dcodeIO/protobuf.js/issues/503)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/637698316e095fc35f62a304daaca22654974966) Notes on dist files<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/29ff3f10e367d6a2ae15fb4254f4073541559c65) Update eslint env<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/943be1749c7d37945c11d1ebffbed9112c528d9f) Browser field in package.json isn't required<br />