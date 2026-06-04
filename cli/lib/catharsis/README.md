This directory vendors the subset of [Catharsis](https://github.com/hegemonic/catharsis) used by `pbts` through JSDoc type parsing.

Changes from upstream:

* Includes the literal-prefix type name fix from [hegemonic/catharsis#80](https://github.com/hegemonic/catharsis/pull/80).
* Keeps only the parser/stringifier files needed by JSDoc.

The vendored parser/stringifier are injected through [`tsd-jsdoc/patch.js`](../tsd-jsdoc/patch.js).
