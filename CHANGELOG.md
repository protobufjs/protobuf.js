# [6.3.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.3.0)

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c144e7386529b53235a4a5bdd8383bdb322f2825) Renamed asJSON option keys (enum to enums, long to longs) because enum is a reserved keyword<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/5b9ade428dca2df6a13277522f2916e22092a98b) Moved JSON/Message conversion to its own source file and added Message/Type.from + test case, see [#575](https://github.com/dcodeIO/protobuf.js/issues/575)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/0b0de2458a1ade1ccd4ceb789697be13290f856b) Relicensed the library and its components to BSD-3-Clause to match the official implementation (again)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Dropped support for browser buffer entirely (is an Uint8Array anyway), ensures performance and makes things simpler<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Removed dead parts of the Reader API<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/964f65a9dd94ae0a18b8be3d9a9c1b0b1fdf6424) Refactored BufferReader/Writer to their own files and removed unnecessary operations (node always has FloatXXArray and browser buffer uses ieee anyway)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/bfac0ea9afa3dbaf5caf79ddf0600c3c7772a538) Stripped out fallback encoder/decoder/verifier completely (even IE8 supports codegen), significantly reduces bundle size, can use static codegen elsewhere<br />

## Fixed
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