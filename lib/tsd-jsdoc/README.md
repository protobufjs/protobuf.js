protobuf.js fork of tsd-jsdoc
=============================

This is a slightly modified and restructured version of [tsd-jsdoc](https://github.com/englercj/tsd-jsdoc) for use with protobuf.js, parked here so we can process issues and pull requests.

Options
-------

* **module: `string`**<br />
  Wraps everything in a module of the specified name.

* **private: `boolean`**<br />
  Skips private members when set to `false`.

* **comments: `boolean`**<br />
  Skips any comments when set to `false`.

* **destination: `string|boolean`**<br />
  Saves to the specified destination file or to console when set to `false`.

Setting options on the command line
-----------------------------------
Providing `-q, --query <queryString>` on the command line will set respectively override existing options.
