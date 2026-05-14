var isNode = Boolean(typeof global !== "undefined"
                  && global
                  && global.process
                  && global.process.versions
                  && global.process.versions.node);

export { isNode };
