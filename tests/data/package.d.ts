import * as $protobuf from "../..";

export interface IPackage {
    name?: string;
    version?: string;
    versionScheme?: string;
    description?: string;
    author?: string;
    license?: string;
    repository?: Package.IRepository;
    bugs?: string;
    homepage?: string;
    keywords?: string[];
    main?: string;
    bin?: { [k: string]: string };
    scripts?: { [k: string]: string };
    dependencies?: { [k: string]: string };
    devDependencies?: { [k: string]: string };
    types?: string;
    cliDependencies?: string[];
}

export class Package {
    constructor(properties?: IPackage);
    public name: string;
    public version: string;
    public versionScheme: string;
    public description: string;
    public author: string;
    public license: string;
    public repository?: (Package.IRepository|null);
    public bugs: string;
    public homepage: string;
    public keywords: string[];
    public main: string;
    public bin: { [k: string]: string };
    public scripts: { [k: string]: string };
    public dependencies: { [k: string]: string };
    public devDependencies: { [k: string]: string };
    public types: string;
    public cliDependencies: string[];
    public static create(properties?: IPackage): Package;
    public static encode(message: IPackage, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IPackage, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Package;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Package;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Package;
    public static toObject(message: Package, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export namespace Package {

    interface IRepository {
        type?: string;
        url?: string;
    }

    class Repository {
        constructor(properties?: Package.IRepository);
        public type: string;
        public url: string;
        public static create(properties?: Package.IRepository): Package.Repository;
        public static encode(message: Package.IRepository, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Package.IRepository, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Package.Repository;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Package.Repository;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Package.Repository;
        public static toObject(message: Package.Repository, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}
