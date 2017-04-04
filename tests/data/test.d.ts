import * as $protobuf from "../..";

export namespace jspb {

    namespace test {

        type Empty$Properties = {};

        class Empty {
            constructor(properties?: jspb.test.Empty$Properties);
            public static create(properties?: jspb.test.Empty$Properties): jspb.test.Empty;
            public static encode(message: jspb.test.Empty$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.Empty$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Empty;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Empty;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Empty;
            public static from(object: { [k: string]: any }): jspb.test.Empty;
            public static toObject(message: jspb.test.Empty, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        enum OuterEnum {
            FOO = 1,
            BAR = 2
        }

        type EnumContainer$Properties = {
            outerEnum?: jspb.test.OuterEnum;
        };

        class EnumContainer {
            constructor(properties?: jspb.test.EnumContainer$Properties);
            public outerEnum: jspb.test.OuterEnum;
            public static create(properties?: jspb.test.EnumContainer$Properties): jspb.test.EnumContainer;
            public static encode(message: jspb.test.EnumContainer$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.EnumContainer$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.EnumContainer;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.EnumContainer;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.EnumContainer;
            public static from(object: { [k: string]: any }): jspb.test.EnumContainer;
            public static toObject(message: jspb.test.EnumContainer, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type Simple1$Properties = {
            aString: string;
            aRepeatedString?: string[];
            aBoolean?: boolean;
        };

        class Simple1 {
            constructor(properties?: jspb.test.Simple1$Properties);
            public aString: string;
            public aRepeatedString: string[];
            public aBoolean: boolean;
            public static create(properties?: jspb.test.Simple1$Properties): jspb.test.Simple1;
            public static encode(message: jspb.test.Simple1$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.Simple1$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple1;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple1;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Simple1;
            public static from(object: { [k: string]: any }): jspb.test.Simple1;
            public static toObject(message: jspb.test.Simple1, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type Simple2$Properties = {
            aString: string;
            aRepeatedString?: string[];
        };

        class Simple2 {
            constructor(properties?: jspb.test.Simple2$Properties);
            public aString: string;
            public aRepeatedString: string[];
            public static create(properties?: jspb.test.Simple2$Properties): jspb.test.Simple2;
            public static encode(message: jspb.test.Simple2$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.Simple2$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple2;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple2;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Simple2;
            public static from(object: { [k: string]: any }): jspb.test.Simple2;
            public static toObject(message: jspb.test.Simple2, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type SpecialCases$Properties = {
            normal: string;
            default: string;
            function: string;
            var: string;
        };

        class SpecialCases {
            constructor(properties?: jspb.test.SpecialCases$Properties);
            public normal: string;
            public ["default"]: string;
            public ["function"]: string;
            public ["var"]: string;
            public static create(properties?: jspb.test.SpecialCases$Properties): jspb.test.SpecialCases;
            public static encode(message: jspb.test.SpecialCases$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.SpecialCases$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.SpecialCases;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.SpecialCases;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.SpecialCases;
            public static from(object: { [k: string]: any }): jspb.test.SpecialCases;
            public static toObject(message: jspb.test.SpecialCases, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type OptionalFields$Properties = {
            aString?: string;
            aBool: boolean;
            aNestedMessage?: jspb.test.OptionalFields.Nested$Properties;
            aRepeatedMessage?: jspb.test.OptionalFields.Nested$Properties[];
            aRepeatedString?: string[];
        };

        class OptionalFields {
            constructor(properties?: jspb.test.OptionalFields$Properties);
            public aString: string;
            public aBool: boolean;
            public aNestedMessage: (jspb.test.OptionalFields.Nested$Properties|null);
            public aRepeatedMessage: jspb.test.OptionalFields.Nested$Properties[];
            public aRepeatedString: string[];
            public static create(properties?: jspb.test.OptionalFields$Properties): jspb.test.OptionalFields;
            public static encode(message: jspb.test.OptionalFields$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.OptionalFields$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields;
            public static from(object: { [k: string]: any }): jspb.test.OptionalFields;
            public static toObject(message: jspb.test.OptionalFields, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace OptionalFields {

            type Nested$Properties = {
                anInt?: number;
            };

            class Nested {
                constructor(properties?: jspb.test.OptionalFields.Nested$Properties);
                public anInt: number;
                public static create(properties?: jspb.test.OptionalFields.Nested$Properties): jspb.test.OptionalFields.Nested;
                public static encode(message: jspb.test.OptionalFields.Nested$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.OptionalFields.Nested$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields.Nested;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                public static from(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                public static toObject(message: jspb.test.OptionalFields.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type HasExtensions$Properties = {
            str1?: string;
            str2?: string;
            str3?: string;
            ".jspb.test.IsExtension.extField"?: jspb.test.IsExtension$Properties;
            ".jspb.test.IndirectExtension.simple"?: jspb.test.Simple1$Properties;
            ".jspb.test.IndirectExtension.str"?: string;
            ".jspb.test.IndirectExtension.repeatedStr"?: string[];
            ".jspb.test.IndirectExtension.repeatedSimple"?: jspb.test.Simple1$Properties[];
            ".jspb.test.simple1"?: jspb.test.Simple1$Properties;
        };

        class HasExtensions {
            constructor(properties?: jspb.test.HasExtensions$Properties);
            public str1: string;
            public str2: string;
            public str3: string;
            public [".jspb.test.IsExtension.extField"]: (jspb.test.IsExtension$Properties|null);
            public [".jspb.test.IndirectExtension.simple"]: (jspb.test.Simple1$Properties|null);
            public [".jspb.test.IndirectExtension.str"]: string;
            public [".jspb.test.IndirectExtension.repeatedStr"]: string[];
            public [".jspb.test.IndirectExtension.repeatedSimple"]: jspb.test.Simple1$Properties[];
            public [".jspb.test.simple1"]: (jspb.test.Simple1$Properties|null);
            public static create(properties?: jspb.test.HasExtensions$Properties): jspb.test.HasExtensions;
            public static encode(message: jspb.test.HasExtensions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.HasExtensions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.HasExtensions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.HasExtensions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.HasExtensions;
            public static from(object: { [k: string]: any }): jspb.test.HasExtensions;
            public static toObject(message: jspb.test.HasExtensions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type Complex$Properties = {
            aString: string;
            anOutOfOrderBool: boolean;
            aNestedMessage?: jspb.test.Complex.Nested$Properties;
            aRepeatedMessage?: jspb.test.Complex.Nested$Properties[];
            aRepeatedString?: string[];
        };

        class Complex {
            constructor(properties?: jspb.test.Complex$Properties);
            public aString: string;
            public anOutOfOrderBool: boolean;
            public aNestedMessage: (jspb.test.Complex.Nested$Properties|null);
            public aRepeatedMessage: jspb.test.Complex.Nested$Properties[];
            public aRepeatedString: string[];
            public static create(properties?: jspb.test.Complex$Properties): jspb.test.Complex;
            public static encode(message: jspb.test.Complex$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.Complex$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Complex;
            public static from(object: { [k: string]: any }): jspb.test.Complex;
            public static toObject(message: jspb.test.Complex, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace Complex {

            type Nested$Properties = {
                anInt: number;
            };

            class Nested {
                constructor(properties?: jspb.test.Complex.Nested$Properties);
                public anInt: number;
                public static create(properties?: jspb.test.Complex.Nested$Properties): jspb.test.Complex.Nested;
                public static encode(message: jspb.test.Complex.Nested$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.Complex.Nested$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex.Nested;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.Complex.Nested;
                public static from(object: { [k: string]: any }): jspb.test.Complex.Nested;
                public static toObject(message: jspb.test.Complex.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type OuterMessage$Properties = {};

        class OuterMessage {
            constructor(properties?: jspb.test.OuterMessage$Properties);
            public static create(properties?: jspb.test.OuterMessage$Properties): jspb.test.OuterMessage;
            public static encode(message: jspb.test.OuterMessage$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.OuterMessage$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage;
            public static from(object: { [k: string]: any }): jspb.test.OuterMessage;
            public static toObject(message: jspb.test.OuterMessage, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace OuterMessage {

            type Complex$Properties = {
                innerComplexField?: number;
            };

            class Complex {
                constructor(properties?: jspb.test.OuterMessage.Complex$Properties);
                public innerComplexField: number;
                public static create(properties?: jspb.test.OuterMessage.Complex$Properties): jspb.test.OuterMessage.Complex;
                public static encode(message: jspb.test.OuterMessage.Complex$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.OuterMessage.Complex$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage.Complex;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                public static from(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                public static toObject(message: jspb.test.OuterMessage.Complex, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type IsExtension$Properties = {
            ext1?: string;
        };

        class IsExtension {
            constructor(properties?: jspb.test.IsExtension$Properties);
            public ext1: string;
            public static create(properties?: jspb.test.IsExtension$Properties): jspb.test.IsExtension;
            public static encode(message: jspb.test.IsExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IsExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IsExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IsExtension;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.IsExtension;
            public static from(object: { [k: string]: any }): jspb.test.IsExtension;
            public static toObject(message: jspb.test.IsExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type IndirectExtension$Properties = {};

        class IndirectExtension {
            constructor(properties?: jspb.test.IndirectExtension$Properties);
            public static create(properties?: jspb.test.IndirectExtension$Properties): jspb.test.IndirectExtension;
            public static encode(message: jspb.test.IndirectExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IndirectExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IndirectExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IndirectExtension;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.IndirectExtension;
            public static from(object: { [k: string]: any }): jspb.test.IndirectExtension;
            public static toObject(message: jspb.test.IndirectExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type DefaultValues$Properties = {
            stringField?: string;
            boolField?: boolean;
            intField?: (number|Long);
            enumField?: jspb.test.DefaultValues.Enum;
            emptyField?: string;
            bytesField?: Uint8Array;
        };

        class DefaultValues {
            constructor(properties?: jspb.test.DefaultValues$Properties);
            public stringField: string;
            public boolField: boolean;
            public intField: (number|Long);
            public enumField: jspb.test.DefaultValues.Enum;
            public emptyField: string;
            public bytesField: Uint8Array;
            public static create(properties?: jspb.test.DefaultValues$Properties): jspb.test.DefaultValues;
            public static encode(message: jspb.test.DefaultValues$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.DefaultValues$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.DefaultValues;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.DefaultValues;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.DefaultValues;
            public static from(object: { [k: string]: any }): jspb.test.DefaultValues;
            public static toObject(message: jspb.test.DefaultValues, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace DefaultValues {

            enum Enum {
                E1 = 13,
                E2 = 77
            }
        }

        type FloatingPointFields$Properties = {
            optionalFloatField?: number;
            requiredFloatField: number;
            repeatedFloatField?: number[];
            defaultFloatField?: number;
            optionalDoubleField?: number;
            requiredDoubleField: number;
            repeatedDoubleField?: number[];
            defaultDoubleField?: number;
        };

        class FloatingPointFields {
            constructor(properties?: jspb.test.FloatingPointFields$Properties);
            public optionalFloatField: number;
            public requiredFloatField: number;
            public repeatedFloatField: number[];
            public defaultFloatField: number;
            public optionalDoubleField: number;
            public requiredDoubleField: number;
            public repeatedDoubleField: number[];
            public defaultDoubleField: number;
            public static create(properties?: jspb.test.FloatingPointFields$Properties): jspb.test.FloatingPointFields;
            public static encode(message: jspb.test.FloatingPointFields$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.FloatingPointFields$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.FloatingPointFields;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            public static from(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            public static toObject(message: jspb.test.FloatingPointFields, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestClone$Properties = {
            str?: string;
            simple1?: jspb.test.Simple1$Properties;
            simple2?: jspb.test.Simple1$Properties[];
            bytesField?: Uint8Array;
            unused?: string;
            ".jspb.test.CloneExtension.extField"?: jspb.test.CloneExtension$Properties;
        };

        class TestClone {
            constructor(properties?: jspb.test.TestClone$Properties);
            public str: string;
            public simple1: (jspb.test.Simple1$Properties|null);
            public simple2: jspb.test.Simple1$Properties[];
            public bytesField: Uint8Array;
            public unused: string;
            public [".jspb.test.CloneExtension.extField"]: (jspb.test.CloneExtension$Properties|null);
            public static create(properties?: jspb.test.TestClone$Properties): jspb.test.TestClone;
            public static encode(message: jspb.test.TestClone$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestClone$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestClone;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestClone;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestClone;
            public static from(object: { [k: string]: any }): jspb.test.TestClone;
            public static toObject(message: jspb.test.TestClone, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type CloneExtension$Properties = {
            ext?: string;
        };

        class CloneExtension {
            constructor(properties?: jspb.test.CloneExtension$Properties);
            public ext: string;
            public static create(properties?: jspb.test.CloneExtension$Properties): jspb.test.CloneExtension;
            public static encode(message: jspb.test.CloneExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.CloneExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.CloneExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.CloneExtension;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.CloneExtension;
            public static from(object: { [k: string]: any }): jspb.test.CloneExtension;
            public static toObject(message: jspb.test.CloneExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestGroup$Properties = {
            repeatedGroup?: jspb.test.TestGroup.RepeatedGroup$Properties[];
            requiredGroup: jspb.test.TestGroup.RequiredGroup$Properties;
            optionalGroup?: jspb.test.TestGroup.OptionalGroup$Properties;
            id?: string;
            requiredSimple: jspb.test.Simple2$Properties;
            optionalSimple?: jspb.test.Simple2$Properties;
        };

        class TestGroup {
            constructor(properties?: jspb.test.TestGroup$Properties);
            public repeatedGroup: jspb.test.TestGroup.RepeatedGroup$Properties[];
            public requiredGroup: jspb.test.TestGroup.RequiredGroup$Properties;
            public optionalGroup: (jspb.test.TestGroup.OptionalGroup$Properties|null);
            public id: string;
            public requiredSimple: jspb.test.Simple2$Properties;
            public optionalSimple: (jspb.test.Simple2$Properties|null);
            public static create(properties?: jspb.test.TestGroup$Properties): jspb.test.TestGroup;
            public static encode(message: jspb.test.TestGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup;
            public static from(object: { [k: string]: any }): jspb.test.TestGroup;
            public static toObject(message: jspb.test.TestGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace TestGroup {

            type RepeatedGroup$Properties = {
                id: string;
                someBool?: boolean[];
            };

            class RepeatedGroup {
                constructor(properties?: jspb.test.TestGroup.RepeatedGroup$Properties);
                public id: string;
                public someBool: boolean[];
                public static create(properties?: jspb.test.TestGroup.RepeatedGroup$Properties): jspb.test.TestGroup.RepeatedGroup;
                public static encode(message: jspb.test.TestGroup.RepeatedGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.RepeatedGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RepeatedGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RepeatedGroup;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                public static from(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                public static toObject(message: jspb.test.TestGroup.RepeatedGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            type RequiredGroup$Properties = {
                id: string;
            };

            class RequiredGroup {
                constructor(properties?: jspb.test.TestGroup.RequiredGroup$Properties);
                public id: string;
                public static create(properties?: jspb.test.TestGroup.RequiredGroup$Properties): jspb.test.TestGroup.RequiredGroup;
                public static encode(message: jspb.test.TestGroup.RequiredGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.RequiredGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RequiredGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RequiredGroup;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                public static from(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                public static toObject(message: jspb.test.TestGroup.RequiredGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            type OptionalGroup$Properties = {
                id: string;
            };

            class OptionalGroup {
                constructor(properties?: jspb.test.TestGroup.OptionalGroup$Properties);
                public id: string;
                public static create(properties?: jspb.test.TestGroup.OptionalGroup$Properties): jspb.test.TestGroup.OptionalGroup;
                public static encode(message: jspb.test.TestGroup.OptionalGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.OptionalGroup$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.OptionalGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.OptionalGroup;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                public static from(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                public static toObject(message: jspb.test.TestGroup.OptionalGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type TestGroup1$Properties = {
            group?: jspb.test.TestGroup.RepeatedGroup$Properties;
        };

        class TestGroup1 {
            constructor(properties?: jspb.test.TestGroup1$Properties);
            public group: (jspb.test.TestGroup.RepeatedGroup$Properties|null);
            public static create(properties?: jspb.test.TestGroup1$Properties): jspb.test.TestGroup1;
            public static encode(message: jspb.test.TestGroup1$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestGroup1$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup1;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup1;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup1;
            public static from(object: { [k: string]: any }): jspb.test.TestGroup1;
            public static toObject(message: jspb.test.TestGroup1, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestReservedNames$Properties = {
            extension?: number;
            ".jspb.test.TestReservedNamesExtension.foo"?: number;
        };

        class TestReservedNames {
            constructor(properties?: jspb.test.TestReservedNames$Properties);
            public extension: number;
            public [".jspb.test.TestReservedNamesExtension.foo"]: number;
            public static create(properties?: jspb.test.TestReservedNames$Properties): jspb.test.TestReservedNames;
            public static encode(message: jspb.test.TestReservedNames$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestReservedNames$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNames;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNames;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNames;
            public static from(object: { [k: string]: any }): jspb.test.TestReservedNames;
            public static toObject(message: jspb.test.TestReservedNames, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestReservedNamesExtension$Properties = {};

        class TestReservedNamesExtension {
            constructor(properties?: jspb.test.TestReservedNamesExtension$Properties);
            public static create(properties?: jspb.test.TestReservedNamesExtension$Properties): jspb.test.TestReservedNamesExtension;
            public static encode(message: jspb.test.TestReservedNamesExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestReservedNamesExtension$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNamesExtension;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            public static from(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            public static toObject(message: jspb.test.TestReservedNamesExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestMessageWithOneof$Properties = {
            pone?: string;
            pthree?: string;
            rone?: jspb.test.TestMessageWithOneof$Properties;
            rtwo?: string;
            normalField?: boolean;
            repeatedField?: string[];
            aone?: number;
            atwo?: number;
            bone?: number;
            btwo?: number;
        };

        class TestMessageWithOneof {
            constructor(properties?: jspb.test.TestMessageWithOneof$Properties);
            public pone: string;
            public pthree: string;
            public rone: (jspb.test.TestMessageWithOneof$Properties|null);
            public rtwo: string;
            public normalField: boolean;
            public repeatedField: string[];
            public aone: number;
            public atwo: number;
            public bone: number;
            public btwo: number;
            public partialOneof?: string;
            public recursiveOneof?: string;
            public defaultOneofA?: string;
            public defaultOneofB?: string;
            public static create(properties?: jspb.test.TestMessageWithOneof$Properties): jspb.test.TestMessageWithOneof;
            public static encode(message: jspb.test.TestMessageWithOneof$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestMessageWithOneof$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMessageWithOneof;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            public static from(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            public static toObject(message: jspb.test.TestMessageWithOneof, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestEndsWithBytes$Properties = {
            value?: number;
            data?: Uint8Array;
        };

        class TestEndsWithBytes {
            constructor(properties?: jspb.test.TestEndsWithBytes$Properties);
            public value: number;
            public data: Uint8Array;
            public static create(properties?: jspb.test.TestEndsWithBytes$Properties): jspb.test.TestEndsWithBytes;
            public static encode(message: jspb.test.TestEndsWithBytes$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestEndsWithBytes$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestEndsWithBytes;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            public static from(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            public static toObject(message: jspb.test.TestEndsWithBytes, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type TestMapFieldsNoBinary$Properties = {
            mapStringString?: { [k: string]: string };
            mapStringInt32?: { [k: string]: number };
            mapStringInt64?: { [k: string]: (number|Long) };
            mapStringBool?: { [k: string]: boolean };
            mapStringDouble?: { [k: string]: number };
            mapStringEnum?: { [k: string]: jspb.test.MapValueEnumNoBinary };
            mapStringMsg?: { [k: string]: jspb.test.MapValueMessageNoBinary$Properties };
            mapInt32String?: { [k: string]: string };
            mapInt64String?: { [k: string]: string };
            mapBoolString?: { [k: string]: string };
            testMapFields?: jspb.test.TestMapFieldsNoBinary$Properties;
            mapStringTestmapfields?: { [k: string]: jspb.test.TestMapFieldsNoBinary$Properties };
        };

        class TestMapFieldsNoBinary {
            constructor(properties?: jspb.test.TestMapFieldsNoBinary$Properties);
            public mapStringString: { [k: string]: string };
            public mapStringInt32: { [k: string]: number };
            public mapStringInt64: { [k: string]: (number|Long) };
            public mapStringBool: { [k: string]: boolean };
            public mapStringDouble: { [k: string]: number };
            public mapStringEnum: { [k: string]: jspb.test.MapValueEnumNoBinary };
            public mapStringMsg: { [k: string]: jspb.test.MapValueMessageNoBinary$Properties };
            public mapInt32String: { [k: string]: string };
            public mapInt64String: { [k: string]: string };
            public mapBoolString: { [k: string]: string };
            public testMapFields: (jspb.test.TestMapFieldsNoBinary$Properties|null);
            public mapStringTestmapfields: { [k: string]: jspb.test.TestMapFieldsNoBinary$Properties };
            public static create(properties?: jspb.test.TestMapFieldsNoBinary$Properties): jspb.test.TestMapFieldsNoBinary;
            public static encode(message: jspb.test.TestMapFieldsNoBinary$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.TestMapFieldsNoBinary$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestMapFieldsNoBinary;
            public static from(object: { [k: string]: any }): jspb.test.TestMapFieldsNoBinary;
            public static toObject(message: jspb.test.TestMapFieldsNoBinary, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        enum MapValueEnumNoBinary {
            MAP_VALUE_FOO_NOBINARY = 0,
            MAP_VALUE_BAR_NOBINARY = 1,
            MAP_VALUE_BAZ_NOBINARY = 2
        }

        type MapValueMessageNoBinary$Properties = {
            foo?: number;
        };

        class MapValueMessageNoBinary {
            constructor(properties?: jspb.test.MapValueMessageNoBinary$Properties);
            public foo: number;
            public static create(properties?: jspb.test.MapValueMessageNoBinary$Properties): jspb.test.MapValueMessageNoBinary;
            public static encode(message: jspb.test.MapValueMessageNoBinary$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.MapValueMessageNoBinary$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            public static from(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            public static toObject(message: jspb.test.MapValueMessageNoBinary, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type Deeply$Properties = {};

        class Deeply {
            constructor(properties?: jspb.test.Deeply$Properties);
            public static create(properties?: jspb.test.Deeply$Properties): jspb.test.Deeply;
            public static encode(message: jspb.test.Deeply$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.Deeply$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Deeply;
            public static from(object: { [k: string]: any }): jspb.test.Deeply;
            public static toObject(message: jspb.test.Deeply, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace Deeply {

            type Nested$Properties = {};

            class Nested {
                constructor(properties?: jspb.test.Deeply.Nested$Properties);
                public static create(properties?: jspb.test.Deeply.Nested$Properties): jspb.test.Deeply.Nested;
                public static encode(message: jspb.test.Deeply.Nested$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.Deeply.Nested$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                public static from(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                public static toObject(message: jspb.test.Deeply.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            namespace Nested {

                type Message$Properties = {
                    count?: number;
                };

                class Message {
                    constructor(properties?: jspb.test.Deeply.Nested.Message$Properties);
                    public count: number;
                    public static create(properties?: jspb.test.Deeply.Nested.Message$Properties): jspb.test.Deeply.Nested.Message;
                    public static encode(message: jspb.test.Deeply.Nested.Message$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                    public static encodeDelimited(message: jspb.test.Deeply.Nested.Message$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message;
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested.Message;
                    public static verify(message: { [k: string]: any }): string;
                    public static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested.Message;
                    public static from(object: { [k: string]: any }): jspb.test.Deeply.Nested.Message;
                    public static toObject(message: jspb.test.Deeply.Nested.Message, options?: $protobuf.ConversionOptions): { [k: string]: any };
                    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                    public toJSON(): { [k: string]: any };
                }
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        type FileDescriptorSet$Properties = {
            file?: google.protobuf.FileDescriptorProto$Properties[];
        };

        class FileDescriptorSet {
            constructor(properties?: google.protobuf.FileDescriptorSet$Properties);
            public file: google.protobuf.FileDescriptorProto$Properties[];
            public static create(properties?: google.protobuf.FileDescriptorSet$Properties): google.protobuf.FileDescriptorSet;
            public static encode(message: google.protobuf.FileDescriptorSet$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.FileDescriptorSet$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            public static from(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type FileDescriptorProto$Properties = {
            name?: string;
            "package"?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: google.protobuf.DescriptorProto$Properties[];
            enumType?: google.protobuf.EnumDescriptorProto$Properties[];
            service?: google.protobuf.ServiceDescriptorProto$Properties[];
            extension?: google.protobuf.FieldDescriptorProto$Properties[];
            options?: google.protobuf.FileOptions$Properties;
            sourceCodeInfo?: google.protobuf.SourceCodeInfo$Properties;
            syntax?: string;
        };

        class FileDescriptorProto {
            constructor(properties?: google.protobuf.FileDescriptorProto$Properties);
            public name: string;
            public ["package"]: string;
            public dependency: string[];
            public publicDependency: number[];
            public weakDependency: number[];
            public messageType: google.protobuf.DescriptorProto$Properties[];
            public enumType: google.protobuf.EnumDescriptorProto$Properties[];
            public service: google.protobuf.ServiceDescriptorProto$Properties[];
            public extension: google.protobuf.FieldDescriptorProto$Properties[];
            public options: (google.protobuf.FileOptions$Properties|null);
            public sourceCodeInfo: (google.protobuf.SourceCodeInfo$Properties|null);
            public syntax: string;
            public static create(properties?: google.protobuf.FileDescriptorProto$Properties): google.protobuf.FileDescriptorProto;
            public static encode(message: google.protobuf.FileDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.FileDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type DescriptorProto$Properties = {
            name?: string;
            field?: google.protobuf.FieldDescriptorProto$Properties[];
            extension?: google.protobuf.FieldDescriptorProto$Properties[];
            nestedType?: google.protobuf.DescriptorProto$Properties[];
            enumType?: google.protobuf.EnumDescriptorProto$Properties[];
            extensionRange?: google.protobuf.DescriptorProto.ExtensionRange$Properties[];
            oneofDecl?: google.protobuf.OneofDescriptorProto$Properties[];
            options?: google.protobuf.MessageOptions$Properties;
            reservedRange?: google.protobuf.DescriptorProto.ReservedRange$Properties[];
            reservedName?: string[];
        };

        class DescriptorProto {
            constructor(properties?: google.protobuf.DescriptorProto$Properties);
            public name: string;
            public field: google.protobuf.FieldDescriptorProto$Properties[];
            public extension: google.protobuf.FieldDescriptorProto$Properties[];
            public nestedType: google.protobuf.DescriptorProto$Properties[];
            public enumType: google.protobuf.EnumDescriptorProto$Properties[];
            public extensionRange: google.protobuf.DescriptorProto.ExtensionRange$Properties[];
            public oneofDecl: google.protobuf.OneofDescriptorProto$Properties[];
            public options: (google.protobuf.MessageOptions$Properties|null);
            public reservedRange: google.protobuf.DescriptorProto.ReservedRange$Properties[];
            public reservedName: string[];
            public static create(properties?: google.protobuf.DescriptorProto$Properties): google.protobuf.DescriptorProto;
            public static encode(message: google.protobuf.DescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.DescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            type ExtensionRange$Properties = {
                start?: number;
                end?: number;
            };

            class ExtensionRange {
                constructor(properties?: google.protobuf.DescriptorProto.ExtensionRange$Properties);
                public start: number;
                public end: number;
                public static create(properties?: google.protobuf.DescriptorProto.ExtensionRange$Properties): google.protobuf.DescriptorProto.ExtensionRange;
                public static encode(message: google.protobuf.DescriptorProto.ExtensionRange$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.DescriptorProto.ExtensionRange$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                public static from(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            type ReservedRange$Properties = {
                start?: number;
                end?: number;
            };

            class ReservedRange {
                constructor(properties?: google.protobuf.DescriptorProto.ReservedRange$Properties);
                public start: number;
                public end: number;
                public static create(properties?: google.protobuf.DescriptorProto.ReservedRange$Properties): google.protobuf.DescriptorProto.ReservedRange;
                public static encode(message: google.protobuf.DescriptorProto.ReservedRange$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.DescriptorProto.ReservedRange$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                public static from(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type FieldDescriptorProto$Properties = {
            name?: string;
            number?: number;
            label?: google.protobuf.FieldDescriptorProto.Label;
            type?: google.protobuf.FieldDescriptorProto.Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: google.protobuf.FieldOptions$Properties;
        };

        class FieldDescriptorProto {
            constructor(properties?: google.protobuf.FieldDescriptorProto$Properties);
            public name: string;
            public number: number;
            public label: google.protobuf.FieldDescriptorProto.Label;
            public type: google.protobuf.FieldDescriptorProto.Type;
            public typeName: string;
            public extendee: string;
            public defaultValue: string;
            public oneofIndex: number;
            public jsonName: string;
            public options: (google.protobuf.FieldOptions$Properties|null);
            public static create(properties?: google.protobuf.FieldDescriptorProto$Properties): google.protobuf.FieldDescriptorProto;
            public static encode(message: google.protobuf.FieldDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.FieldDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace FieldDescriptorProto {

            enum Type {
                TYPE_DOUBLE = 1,
                TYPE_FLOAT = 2,
                TYPE_INT64 = 3,
                TYPE_UINT64 = 4,
                TYPE_INT32 = 5,
                TYPE_FIXED64 = 6,
                TYPE_FIXED32 = 7,
                TYPE_BOOL = 8,
                TYPE_STRING = 9,
                TYPE_GROUP = 10,
                TYPE_MESSAGE = 11,
                TYPE_BYTES = 12,
                TYPE_UINT32 = 13,
                TYPE_ENUM = 14,
                TYPE_SFIXED32 = 15,
                TYPE_SFIXED64 = 16,
                TYPE_SINT32 = 17,
                TYPE_SINT64 = 18
            }

            enum Label {
                LABEL_OPTIONAL = 1,
                LABEL_REQUIRED = 2,
                LABEL_REPEATED = 3
            }
        }

        type OneofDescriptorProto$Properties = {
            name?: string;
            options?: google.protobuf.OneofOptions$Properties;
        };

        class OneofDescriptorProto {
            constructor(properties?: google.protobuf.OneofDescriptorProto$Properties);
            public name: string;
            public options: (google.protobuf.OneofOptions$Properties|null);
            public static create(properties?: google.protobuf.OneofDescriptorProto$Properties): google.protobuf.OneofDescriptorProto;
            public static encode(message: google.protobuf.OneofDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.OneofDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type EnumDescriptorProto$Properties = {
            name?: string;
            value?: google.protobuf.EnumValueDescriptorProto$Properties[];
            options?: google.protobuf.EnumOptions$Properties;
        };

        class EnumDescriptorProto {
            constructor(properties?: google.protobuf.EnumDescriptorProto$Properties);
            public name: string;
            public value: google.protobuf.EnumValueDescriptorProto$Properties[];
            public options: (google.protobuf.EnumOptions$Properties|null);
            public static create(properties?: google.protobuf.EnumDescriptorProto$Properties): google.protobuf.EnumDescriptorProto;
            public static encode(message: google.protobuf.EnumDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.EnumDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type EnumValueDescriptorProto$Properties = {
            name?: string;
            number?: number;
            options?: google.protobuf.EnumValueOptions$Properties;
        };

        class EnumValueDescriptorProto {
            constructor(properties?: google.protobuf.EnumValueDescriptorProto$Properties);
            public name: string;
            public number: number;
            public options: (google.protobuf.EnumValueOptions$Properties|null);
            public static create(properties?: google.protobuf.EnumValueDescriptorProto$Properties): google.protobuf.EnumValueDescriptorProto;
            public static encode(message: google.protobuf.EnumValueDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.EnumValueDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type ServiceDescriptorProto$Properties = {
            name?: string;
            method?: google.protobuf.MethodDescriptorProto$Properties[];
            options?: google.protobuf.ServiceOptions$Properties;
        };

        class ServiceDescriptorProto {
            constructor(properties?: google.protobuf.ServiceDescriptorProto$Properties);
            public name: string;
            public method: google.protobuf.MethodDescriptorProto$Properties[];
            public options: (google.protobuf.ServiceOptions$Properties|null);
            public static create(properties?: google.protobuf.ServiceDescriptorProto$Properties): google.protobuf.ServiceDescriptorProto;
            public static encode(message: google.protobuf.ServiceDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.ServiceDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type MethodDescriptorProto$Properties = {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: google.protobuf.MethodOptions$Properties;
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        };

        class MethodDescriptorProto {
            constructor(properties?: google.protobuf.MethodDescriptorProto$Properties);
            public name: string;
            public inputType: string;
            public outputType: string;
            public options: (google.protobuf.MethodOptions$Properties|null);
            public clientStreaming: boolean;
            public serverStreaming: boolean;
            public static create(properties?: google.protobuf.MethodDescriptorProto$Properties): google.protobuf.MethodDescriptorProto;
            public static encode(message: google.protobuf.MethodDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.MethodDescriptorProto$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type FileOptions$Properties = {
            javaPackage?: string;
            javaOuterClassname?: string;
            javaMultipleFiles?: boolean;
            javaGenerateEqualsAndHash?: boolean;
            javaStringCheckUtf8?: boolean;
            optimizeFor?: google.protobuf.FileOptions.OptimizeMode;
            goPackage?: string;
            ccGenericServices?: boolean;
            javaGenericServices?: boolean;
            pyGenericServices?: boolean;
            deprecated?: boolean;
            ccEnableArenas?: boolean;
            objcClassPrefix?: string;
            csharpNamespace?: string;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class FileOptions {
            constructor(properties?: google.protobuf.FileOptions$Properties);
            public javaPackage: string;
            public javaOuterClassname: string;
            public javaMultipleFiles: boolean;
            public javaGenerateEqualsAndHash: boolean;
            public javaStringCheckUtf8: boolean;
            public optimizeFor: google.protobuf.FileOptions.OptimizeMode;
            public goPackage: string;
            public ccGenericServices: boolean;
            public javaGenericServices: boolean;
            public pyGenericServices: boolean;
            public deprecated: boolean;
            public ccEnableArenas: boolean;
            public objcClassPrefix: string;
            public csharpNamespace: string;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.FileOptions$Properties): google.protobuf.FileOptions;
            public static encode(message: google.protobuf.FileOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.FileOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;
            public static from(object: { [k: string]: any }): google.protobuf.FileOptions;
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace FileOptions {

            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        type MessageOptions$Properties = {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class MessageOptions {
            constructor(properties?: google.protobuf.MessageOptions$Properties);
            public messageSetWireFormat: boolean;
            public noStandardDescriptorAccessor: boolean;
            public deprecated: boolean;
            public mapEntry: boolean;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.MessageOptions$Properties): google.protobuf.MessageOptions;
            public static encode(message: google.protobuf.MessageOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.MessageOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;
            public static from(object: { [k: string]: any }): google.protobuf.MessageOptions;
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type FieldOptions$Properties = {
            ctype?: google.protobuf.FieldOptions.CType;
            packed?: boolean;
            jstype?: google.protobuf.FieldOptions.JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class FieldOptions {
            constructor(properties?: google.protobuf.FieldOptions$Properties);
            public ctype: google.protobuf.FieldOptions.CType;
            public packed: boolean;
            public jstype: google.protobuf.FieldOptions.JSType;
            public lazy: boolean;
            public deprecated: boolean;
            public weak: boolean;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.FieldOptions$Properties): google.protobuf.FieldOptions;
            public static encode(message: google.protobuf.FieldOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.FieldOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;
            public static from(object: { [k: string]: any }): google.protobuf.FieldOptions;
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace FieldOptions {

            enum CType {
                STRING = 0,
                CORD = 1,
                STRING_PIECE = 2
            }

            enum JSType {
                JS_NORMAL = 0,
                JS_STRING = 1,
                JS_NUMBER = 2
            }
        }

        type OneofOptions$Properties = {
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class OneofOptions {
            constructor(properties?: google.protobuf.OneofOptions$Properties);
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.OneofOptions$Properties): google.protobuf.OneofOptions;
            public static encode(message: google.protobuf.OneofOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.OneofOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;
            public static from(object: { [k: string]: any }): google.protobuf.OneofOptions;
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type EnumOptions$Properties = {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
            ".jspb.test.IsExtension.simpleOption"?: string;
        };

        class EnumOptions {
            constructor(properties?: google.protobuf.EnumOptions$Properties);
            public allowAlias: boolean;
            public deprecated: boolean;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public [".jspb.test.IsExtension.simpleOption"]: string;
            public static create(properties?: google.protobuf.EnumOptions$Properties): google.protobuf.EnumOptions;
            public static encode(message: google.protobuf.EnumOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.EnumOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;
            public static from(object: { [k: string]: any }): google.protobuf.EnumOptions;
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type EnumValueOptions$Properties = {
            deprecated?: boolean;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class EnumValueOptions {
            constructor(properties?: google.protobuf.EnumValueOptions$Properties);
            public deprecated: boolean;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.EnumValueOptions$Properties): google.protobuf.EnumValueOptions;
            public static encode(message: google.protobuf.EnumValueOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.EnumValueOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            public static from(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type ServiceOptions$Properties = {
            deprecated?: boolean;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class ServiceOptions {
            constructor(properties?: google.protobuf.ServiceOptions$Properties);
            public deprecated: boolean;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.ServiceOptions$Properties): google.protobuf.ServiceOptions;
            public static encode(message: google.protobuf.ServiceOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.ServiceOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            public static from(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        type MethodOptions$Properties = {
            deprecated?: boolean;
            idempotencyLevel?: google.protobuf.MethodOptions.IdempotencyLevel;
            uninterpretedOption?: google.protobuf.UninterpretedOption$Properties[];
        };

        class MethodOptions {
            constructor(properties?: google.protobuf.MethodOptions$Properties);
            public deprecated: boolean;
            public idempotencyLevel: google.protobuf.MethodOptions.IdempotencyLevel;
            public uninterpretedOption: google.protobuf.UninterpretedOption$Properties[];
            public static create(properties?: google.protobuf.MethodOptions$Properties): google.protobuf.MethodOptions;
            public static encode(message: google.protobuf.MethodOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.MethodOptions$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;
            public static from(object: { [k: string]: any }): google.protobuf.MethodOptions;
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace MethodOptions {

            enum IdempotencyLevel {
                IDEMPOTENCY_UNKNOWN = 0,
                NO_SIDE_EFFECTS = 1,
                IDEMPOTENT = 2
            }
        }

        type UninterpretedOption$Properties = {
            name?: google.protobuf.UninterpretedOption.NamePart$Properties[];
            identifierValue?: string;
            positiveIntValue?: (number|Long);
            negativeIntValue?: (number|Long);
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        };

        class UninterpretedOption {
            constructor(properties?: google.protobuf.UninterpretedOption$Properties);
            public name: google.protobuf.UninterpretedOption.NamePart$Properties[];
            public identifierValue: string;
            public positiveIntValue: (number|Long);
            public negativeIntValue: (number|Long);
            public doubleValue: number;
            public stringValue: Uint8Array;
            public aggregateValue: string;
            public static create(properties?: google.protobuf.UninterpretedOption$Properties): google.protobuf.UninterpretedOption;
            public static encode(message: google.protobuf.UninterpretedOption$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.UninterpretedOption$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            public static from(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            type NamePart$Properties = {
                namePart: string;
                isExtension: boolean;
            };

            class NamePart {
                constructor(properties?: google.protobuf.UninterpretedOption.NamePart$Properties);
                public namePart: string;
                public isExtension: boolean;
                public static create(properties?: google.protobuf.UninterpretedOption.NamePart$Properties): google.protobuf.UninterpretedOption.NamePart;
                public static encode(message: google.protobuf.UninterpretedOption.NamePart$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.UninterpretedOption.NamePart$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                public static from(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type SourceCodeInfo$Properties = {
            location?: google.protobuf.SourceCodeInfo.Location$Properties[];
        };

        class SourceCodeInfo {
            constructor(properties?: google.protobuf.SourceCodeInfo$Properties);
            public location: google.protobuf.SourceCodeInfo.Location$Properties[];
            public static create(properties?: google.protobuf.SourceCodeInfo$Properties): google.protobuf.SourceCodeInfo;
            public static encode(message: google.protobuf.SourceCodeInfo$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.SourceCodeInfo$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            public static from(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            type Location$Properties = {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            };

            class Location {
                constructor(properties?: google.protobuf.SourceCodeInfo.Location$Properties);
                public path: number[];
                public span: number[];
                public leadingComments: string;
                public trailingComments: string;
                public leadingDetachedComments: string[];
                public static create(properties?: google.protobuf.SourceCodeInfo.Location$Properties): google.protobuf.SourceCodeInfo.Location;
                public static encode(message: google.protobuf.SourceCodeInfo.Location$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.SourceCodeInfo.Location$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                public static from(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        type GeneratedCodeInfo$Properties = {
            annotation?: google.protobuf.GeneratedCodeInfo.Annotation$Properties[];
        };

        class GeneratedCodeInfo {
            constructor(properties?: google.protobuf.GeneratedCodeInfo$Properties);
            public annotation: google.protobuf.GeneratedCodeInfo.Annotation$Properties[];
            public static create(properties?: google.protobuf.GeneratedCodeInfo$Properties): google.protobuf.GeneratedCodeInfo;
            public static encode(message: google.protobuf.GeneratedCodeInfo$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;
            public static verify(message: { [k: string]: any }): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            public static from(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            type Annotation$Properties = {
                path?: number[];
                sourceFile?: string;
                begin?: number;
                end?: number;
            };

            class Annotation {
                constructor(properties?: google.protobuf.GeneratedCodeInfo.Annotation$Properties);
                public path: number[];
                public sourceFile: string;
                public begin: number;
                public end: number;
                public static create(properties?: google.protobuf.GeneratedCodeInfo.Annotation$Properties): google.protobuf.GeneratedCodeInfo.Annotation;
                public static encode(message: google.protobuf.GeneratedCodeInfo.Annotation$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.Annotation$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;
                public static verify(message: { [k: string]: any }): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                public static from(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
