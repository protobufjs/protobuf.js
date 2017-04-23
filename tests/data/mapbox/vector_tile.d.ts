import * as $protobuf from "../../..";

export namespace vector_tile {

    interface ITile {
        layers?: vector_tile.Tile.ILayer[];
    }

    class Tile {
        constructor(properties?: vector_tile.ITile);
        public layers: vector_tile.Tile.ILayer[];
        public static create(properties?: vector_tile.ITile): vector_tile.Tile;
        public static encode(message: vector_tile.ITile, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: vector_tile.ITile, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): vector_tile.Tile;
        public static toObject(message: vector_tile.Tile, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace Tile {

        enum GeomType {
            UNKNOWN = 0,
            POINT = 1,
            LINESTRING = 2,
            POLYGON = 3
        }

        interface IValue {
            stringValue?: string;
            floatValue?: number;
            doubleValue?: number;
            intValue?: (number|Long);
            uintValue?: (number|Long);
            sintValue?: (number|Long);
            boolValue?: boolean;
        }

        class Value {
            constructor(properties?: vector_tile.Tile.IValue);
            public stringValue: string;
            public floatValue: number;
            public doubleValue: number;
            public intValue: (number|Long);
            public uintValue: (number|Long);
            public sintValue: (number|Long);
            public boolValue: boolean;
            public static create(properties?: vector_tile.Tile.IValue): vector_tile.Tile.Value;
            public static encode(message: vector_tile.Tile.IValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: vector_tile.Tile.IValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): vector_tile.Tile.Value;
            public static toObject(message: vector_tile.Tile.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IFeature {
            id?: (number|Long);
            tags?: number[];
            type?: vector_tile.Tile.GeomType;
            geometry?: number[];
        }

        class Feature {
            constructor(properties?: vector_tile.Tile.IFeature);
            public id: (number|Long);
            public tags: number[];
            public type: vector_tile.Tile.GeomType;
            public geometry: number[];
            public static create(properties?: vector_tile.Tile.IFeature): vector_tile.Tile.Feature;
            public static encode(message: vector_tile.Tile.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: vector_tile.Tile.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Feature;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Feature;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): vector_tile.Tile.Feature;
            public static toObject(message: vector_tile.Tile.Feature, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface ILayer {
            version: number;
            name: string;
            features?: vector_tile.Tile.IFeature[];
            keys?: string[];
            values?: vector_tile.Tile.IValue[];
            extent?: number;
        }

        class Layer {
            constructor(properties?: vector_tile.Tile.ILayer);
            public version: number;
            public name: string;
            public features: vector_tile.Tile.IFeature[];
            public keys: string[];
            public values: vector_tile.Tile.IValue[];
            public extent: number;
            public static create(properties?: vector_tile.Tile.ILayer): vector_tile.Tile.Layer;
            public static encode(message: vector_tile.Tile.ILayer, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: vector_tile.Tile.ILayer, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Layer;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Layer;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): vector_tile.Tile.Layer;
            public static toObject(message: vector_tile.Tile.Layer, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }
}
