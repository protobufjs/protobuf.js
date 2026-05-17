import * as $protobuf from "../../..";

export namespace vector_tile {

    interface ITile extends vector_tile.Tile.$Properties {
    }

    class Tile {
        constructor(properties?: vector_tile.Tile.$Properties);
        $unknowns?: Uint8Array[];
        layers: vector_tile.Tile.Layer.$Properties[];
        static create(properties: vector_tile.Tile.$Shape): vector_tile.Tile & vector_tile.Tile.$Shape;
        static create(properties?: vector_tile.Tile.$Properties): vector_tile.Tile;
        static encode(message: vector_tile.Tile.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
        static encodeDelimited(message: vector_tile.Tile.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile & vector_tile.Tile.$Shape;
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile & vector_tile.Tile.$Shape;
        static verify(message: { [k: string]: any }): (string|null);
        static fromObject(object: { [k: string]: any }): vector_tile.Tile;
        static toObject(message: vector_tile.Tile, options?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace Tile {
        interface $Properties {
            layers?: (vector_tile.Tile.Layer.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = vector_tile.Tile.$Properties;

        enum GeomType {
            UNKNOWN = 0,
            POINT = 1,
            LINESTRING = 2,
            POLYGON = 3
        }

        interface IValue extends vector_tile.Tile.Value.$Properties {
        }

        class Value {
            constructor(properties?: vector_tile.Tile.Value.$Properties);
            $unknowns?: Uint8Array[];
            stringValue: string;
            floatValue: number;
            doubleValue: number;
            intValue: (number|bigint);
            uintValue: (number|bigint);
            sintValue: (number|bigint);
            boolValue: boolean;
            static create(properties: vector_tile.Tile.Value.$Shape): vector_tile.Tile.Value & vector_tile.Tile.Value.$Shape;
            static create(properties?: vector_tile.Tile.Value.$Properties): vector_tile.Tile.Value;
            static encode(message: vector_tile.Tile.Value.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: vector_tile.Tile.Value.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Value & vector_tile.Tile.Value.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Value & vector_tile.Tile.Value.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): vector_tile.Tile.Value;
            static toObject(message: vector_tile.Tile.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Value {
            interface $Properties {
                stringValue?: (string|null);
                floatValue?: (number|null);
                doubleValue?: (number|null);
                intValue?: (number|bigint|null);
                uintValue?: (number|bigint|null);
                sintValue?: (number|bigint|null);
                boolValue?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = vector_tile.Tile.Value.$Properties;
        }

        interface IFeature extends vector_tile.Tile.Feature.$Properties {
        }

        class Feature {
            constructor(properties?: vector_tile.Tile.Feature.$Properties);
            $unknowns?: Uint8Array[];
            id: (number|bigint);
            tags: number[];
            type: vector_tile.Tile.GeomType;
            geometry: number[];
            static create(properties: vector_tile.Tile.Feature.$Shape): vector_tile.Tile.Feature & vector_tile.Tile.Feature.$Shape;
            static create(properties?: vector_tile.Tile.Feature.$Properties): vector_tile.Tile.Feature;
            static encode(message: vector_tile.Tile.Feature.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: vector_tile.Tile.Feature.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Feature & vector_tile.Tile.Feature.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Feature & vector_tile.Tile.Feature.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): vector_tile.Tile.Feature;
            static toObject(message: vector_tile.Tile.Feature, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Feature {
            interface $Properties {
                id?: (number|bigint|null);
                tags?: (number[]|null);
                type?: (vector_tile.Tile.GeomType|null);
                geometry?: (number[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = vector_tile.Tile.Feature.$Properties;
        }

        interface ILayer extends vector_tile.Tile.Layer.$Properties {
        }

        class Layer {
            constructor(properties?: vector_tile.Tile.Layer.$Properties);
            $unknowns?: Uint8Array[];
            version: number;
            name: string;
            features: vector_tile.Tile.Feature.$Properties[];
            keys: string[];
            values: vector_tile.Tile.Value.$Properties[];
            extent: number;
            static create(properties: vector_tile.Tile.Layer.$Shape): vector_tile.Tile.Layer & vector_tile.Tile.Layer.$Shape;
            static create(properties?: vector_tile.Tile.Layer.$Properties): vector_tile.Tile.Layer;
            static encode(message: vector_tile.Tile.Layer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: vector_tile.Tile.Layer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Layer & vector_tile.Tile.Layer.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Layer & vector_tile.Tile.Layer.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): vector_tile.Tile.Layer;
            static toObject(message: vector_tile.Tile.Layer, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Layer {
            interface $Properties {
                version: number;
                name: string;
                features?: (vector_tile.Tile.Feature.$Properties[]|null);
                keys?: (string[]|null);
                values?: (vector_tile.Tile.Value.$Properties[]|null);
                extent?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = vector_tile.Tile.Layer.$Properties;
        }
    }
}
