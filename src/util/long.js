import Long from "long";

function isLongConstructor(Long_) {
    return typeof Long_ === "function"
        && typeof Long_.isLong === "function"
        && typeof Long_.fromBits === "function"
        && Long_.isLong(Long_.ZERO);
}

function detectLong() {
    if (isLongConstructor(Long))
        return Long;
    var global = typeof globalThis !== "undefined" && globalThis;
    return global && isLongConstructor(global.Long) ? global.Long : null;
}

var long = detectLong();

export function getLong() {
    return long;
}

export function setLong(Long_) {
    long = Long_;
}
