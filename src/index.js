import { Root, Type } from "./index-light.js";
import { parse } from "./parse.js";
import { common } from "./common.js";

var build = "full";

Root._configure(Type, parse, common);

export * from "./index-light.js";
export { build };
export { tokenize } from "./tokenize.js";
export { parse, common };
