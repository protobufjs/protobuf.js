import * as $protobuf from "../..";

export interface IPackage extends Package.$Properties {
}

export class Package {
    constructor(properties?: Package.$Properties);
    $unknowns?: Uint8Array[];
    name: string;
    version: string;
    versionScheme: string;
    description: string;
    author: string;
    license: string;
    repository?: (Package.Repository.$Properties|null);
    bugs: string;
    homepage: string;
    keywords: string[];
    main: string;
    bin: { [k: string]: string };
    scripts: { [k: string]: string };
    dependencies: { [k: string]: string };
    devDependencies: { [k: string]: string };
    types: string;
    cliDependencies: string[];
    static create(properties: Package.$Shape): Package & Package.$Shape;
    static create(properties?: Package.$Properties): Package;
    static encode(message: Package.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: Package.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Package & Package.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Package & Package.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): Package;
    static toObject(message: Package, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace Package {
    interface $Properties {
        name?: (string|null);
        version?: (string|null);
        versionScheme?: (string|null);
        description?: (string|null);
        author?: (string|null);
        license?: (string|null);
        repository?: (Package.Repository.$Properties|null);
        bugs?: (string|null);
        homepage?: (string|null);
        keywords?: (string[]|null);
        main?: (string|null);
        bin?: ({ [k: string]: string }|null);
        scripts?: ({ [k: string]: string }|null);
        dependencies?: ({ [k: string]: string }|null);
        devDependencies?: ({ [k: string]: string }|null);
        types?: (string|null);
        cliDependencies?: (string[]|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = Package.$Properties;

    interface IRepository extends Package.Repository.$Properties {
    }

    class Repository {
        constructor(properties?: Package.Repository.$Properties);
        $unknowns?: Uint8Array[];
        type: string;
        url: string;
        static create(properties: Package.Repository.$Shape): Package.Repository & Package.Repository.$Shape;
        static create(properties?: Package.Repository.$Properties): Package.Repository;
        static encode(message: Package.Repository.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
        static encodeDelimited(message: Package.Repository.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Package.Repository & Package.Repository.$Shape;
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Package.Repository & Package.Repository.$Shape;
        static verify(message: { [k: string]: any }): (string|null);
        static fromObject(object: { [k: string]: any }): Package.Repository;
        static toObject(message: Package.Repository, options?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace Repository {
        interface $Properties {
            type?: (string|null);
            url?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Package.Repository.$Properties;
    }
}
