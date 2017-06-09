import * as $protobuf from "../../..";

export namespace vector_tile {

    interface ITile {
        layers?: vector_tile.Tile.ILayer[];
    }

    class Tile {
        constructor(properties?: vector_tile.ITile);
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
        }

        interface IFeature {
            id?: (number|Long);
            tags?: number[];
            type?: vector_tile.Tile.GeomType;
            geometry?: number[];
        }

        class Feature {
            constructor(properties?: vector_tile.Tile.IFeature);
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
        }
    }
}
