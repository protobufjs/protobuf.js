import * as $protobuf from "../..";

export namespace jspb {

    namespace test {

        class Empty {
            constructor(properties?: Object);
            public static create(properties?: Object): jspb.test.Empty;
            public static encode(message: (jspb.test.Empty|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.Empty|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Empty;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Empty;
            public static verify(message: (jspb.test.Empty|Object)): string;
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

        class EnumContainer {
            constructor(properties?: Object);
            public outerEnum?: number;
            public static create(properties?: Object): jspb.test.EnumContainer;
            public static encode(message: (jspb.test.EnumContainer|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.EnumContainer|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.EnumContainer;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.EnumContainer;
            public static verify(message: (jspb.test.EnumContainer|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.EnumContainer;
            public static from(object: { [k: string]: any }): jspb.test.EnumContainer;
            public static toObject(message: jspb.test.EnumContainer, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class Simple1 {
            constructor(properties?: Object);
            public aString: string;
            public aRepeatedString?: string[];
            public aBoolean?: boolean;
            public static create(properties?: Object): jspb.test.Simple1;
            public static encode(message: (jspb.test.Simple1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.Simple1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple1;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple1;
            public static verify(message: (jspb.test.Simple1|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Simple1;
            public static from(object: { [k: string]: any }): jspb.test.Simple1;
            public static toObject(message: jspb.test.Simple1, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class Simple2 {
            constructor(properties?: Object);
            public aString: string;
            public aRepeatedString?: string[];
            public static create(properties?: Object): jspb.test.Simple2;
            public static encode(message: (jspb.test.Simple2|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.Simple2|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple2;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple2;
            public static verify(message: (jspb.test.Simple2|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Simple2;
            public static from(object: { [k: string]: any }): jspb.test.Simple2;
            public static toObject(message: jspb.test.Simple2, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class SpecialCases {
            constructor(properties?: Object);
            public normal: string;
            public default: string;
            public function: string;
            public var: string;
            public static create(properties?: Object): jspb.test.SpecialCases;
            public static encode(message: (jspb.test.SpecialCases|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.SpecialCases|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.SpecialCases;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.SpecialCases;
            public static verify(message: (jspb.test.SpecialCases|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.SpecialCases;
            public static from(object: { [k: string]: any }): jspb.test.SpecialCases;
            public static toObject(message: jspb.test.SpecialCases, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class OptionalFields {
            constructor(properties?: Object);
            public aString?: string;
            public aBool: boolean;
            public aNestedMessage?: jspb.test.OptionalFields.Nested;
            public aRepeatedMessage?: jspb.test.OptionalFields.Nested[];
            public aRepeatedString?: string[];
            public static create(properties?: Object): jspb.test.OptionalFields;
            public static encode(message: (jspb.test.OptionalFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.OptionalFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields;
            public static verify(message: (jspb.test.OptionalFields|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields;
            public static from(object: { [k: string]: any }): jspb.test.OptionalFields;
            public static toObject(message: jspb.test.OptionalFields, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace OptionalFields {

            class Nested {
                constructor(properties?: Object);
                public anInt?: number;
                public static create(properties?: Object): jspb.test.OptionalFields.Nested;
                public static encode(message: (jspb.test.OptionalFields.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.OptionalFields.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields.Nested;
                public static verify(message: (jspb.test.OptionalFields.Nested|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                public static from(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                public static toObject(message: jspb.test.OptionalFields.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class HasExtensions {
            constructor(properties?: Object);
            public str1?: string;
            public str2?: string;
            public str3?: string;
            public static create(properties?: Object): jspb.test.HasExtensions;
            public static encode(message: (jspb.test.HasExtensions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.HasExtensions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.HasExtensions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.HasExtensions;
            public static verify(message: (jspb.test.HasExtensions|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.HasExtensions;
            public static from(object: { [k: string]: any }): jspb.test.HasExtensions;
            public static toObject(message: jspb.test.HasExtensions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class Complex {
            constructor(properties?: Object);
            public aString: string;
            public anOutOfOrderBool: boolean;
            public aNestedMessage?: jspb.test.Complex.Nested;
            public aRepeatedMessage?: jspb.test.Complex.Nested[];
            public aRepeatedString?: string[];
            public static create(properties?: Object): jspb.test.Complex;
            public static encode(message: (jspb.test.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex;
            public static verify(message: (jspb.test.Complex|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Complex;
            public static from(object: { [k: string]: any }): jspb.test.Complex;
            public static toObject(message: jspb.test.Complex, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace Complex {

            class Nested {
                constructor(properties?: Object);
                public anInt: number;
                public static create(properties?: Object): jspb.test.Complex.Nested;
                public static encode(message: (jspb.test.Complex.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.Complex.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex.Nested;
                public static verify(message: (jspb.test.Complex.Nested|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.Complex.Nested;
                public static from(object: { [k: string]: any }): jspb.test.Complex.Nested;
                public static toObject(message: jspb.test.Complex.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class OuterMessage {
            constructor(properties?: Object);
            public static create(properties?: Object): jspb.test.OuterMessage;
            public static encode(message: (jspb.test.OuterMessage|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.OuterMessage|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage;
            public static verify(message: (jspb.test.OuterMessage|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage;
            public static from(object: { [k: string]: any }): jspb.test.OuterMessage;
            public static toObject(message: jspb.test.OuterMessage, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace OuterMessage {

            class Complex {
                constructor(properties?: Object);
                public innerComplexField?: number;
                public static create(properties?: Object): jspb.test.OuterMessage.Complex;
                public static encode(message: (jspb.test.OuterMessage.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.OuterMessage.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage.Complex;
                public static verify(message: (jspb.test.OuterMessage.Complex|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                public static from(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                public static toObject(message: jspb.test.OuterMessage.Complex, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class IsExtension {
            constructor(properties?: Object);
            public ext1?: string;
            public static create(properties?: Object): jspb.test.IsExtension;
            public static encode(message: (jspb.test.IsExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.IsExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IsExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IsExtension;
            public static verify(message: (jspb.test.IsExtension|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.IsExtension;
            public static from(object: { [k: string]: any }): jspb.test.IsExtension;
            public static toObject(message: jspb.test.IsExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class IndirectExtension {
            constructor(properties?: Object);
            public static create(properties?: Object): jspb.test.IndirectExtension;
            public static encode(message: (jspb.test.IndirectExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.IndirectExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IndirectExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IndirectExtension;
            public static verify(message: (jspb.test.IndirectExtension|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.IndirectExtension;
            public static from(object: { [k: string]: any }): jspb.test.IndirectExtension;
            public static toObject(message: jspb.test.IndirectExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class DefaultValues {
            constructor(properties?: Object);
            public stringField?: string;
            public boolField?: boolean;
            public intField?: (number|$protobuf.Long);
            public enumField?: number;
            public emptyField?: string;
            public bytesField?: Uint8Array;
            public static create(properties?: Object): jspb.test.DefaultValues;
            public static encode(message: (jspb.test.DefaultValues|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.DefaultValues|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.DefaultValues;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.DefaultValues;
            public static verify(message: (jspb.test.DefaultValues|Object)): string;
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

        class FloatingPointFields {
            constructor(properties?: Object);
            public optionalFloatField?: number;
            public requiredFloatField: number;
            public repeatedFloatField?: number[];
            public defaultFloatField?: number;
            public optionalDoubleField?: number;
            public requiredDoubleField: number;
            public repeatedDoubleField?: number[];
            public defaultDoubleField?: number;
            public static create(properties?: Object): jspb.test.FloatingPointFields;
            public static encode(message: (jspb.test.FloatingPointFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.FloatingPointFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.FloatingPointFields;
            public static verify(message: (jspb.test.FloatingPointFields|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            public static from(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            public static toObject(message: jspb.test.FloatingPointFields, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestClone {
            constructor(properties?: Object);
            public str?: string;
            public simple1?: jspb.test.Simple1;
            public simple2?: jspb.test.Simple1[];
            public bytesField?: Uint8Array;
            public unused?: string;
            public static create(properties?: Object): jspb.test.TestClone;
            public static encode(message: (jspb.test.TestClone|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestClone|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestClone;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestClone;
            public static verify(message: (jspb.test.TestClone|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestClone;
            public static from(object: { [k: string]: any }): jspb.test.TestClone;
            public static toObject(message: jspb.test.TestClone, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class CloneExtension {
            constructor(properties?: Object);
            public ext?: string;
            public static create(properties?: Object): jspb.test.CloneExtension;
            public static encode(message: (jspb.test.CloneExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.CloneExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.CloneExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.CloneExtension;
            public static verify(message: (jspb.test.CloneExtension|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.CloneExtension;
            public static from(object: { [k: string]: any }): jspb.test.CloneExtension;
            public static toObject(message: jspb.test.CloneExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestGroup {
            constructor(properties?: Object);
            public repeatedGroup?: jspb.test.TestGroup.RepeatedGroup[];
            public requiredGroup: jspb.test.TestGroup.RequiredGroup;
            public optionalGroup?: jspb.test.TestGroup.OptionalGroup;
            public id?: string;
            public requiredSimple: jspb.test.Simple2;
            public optionalSimple?: jspb.test.Simple2;
            public static create(properties?: Object): jspb.test.TestGroup;
            public static encode(message: (jspb.test.TestGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup;
            public static verify(message: (jspb.test.TestGroup|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup;
            public static from(object: { [k: string]: any }): jspb.test.TestGroup;
            public static toObject(message: jspb.test.TestGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace TestGroup {

            class RepeatedGroup {
                constructor(properties?: Object);
                public id: string;
                public someBool?: boolean[];
                public static create(properties?: Object): jspb.test.TestGroup.RepeatedGroup;
                public static encode(message: (jspb.test.TestGroup.RepeatedGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.TestGroup.RepeatedGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RepeatedGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RepeatedGroup;
                public static verify(message: (jspb.test.TestGroup.RepeatedGroup|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                public static from(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                public static toObject(message: jspb.test.TestGroup.RepeatedGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            class RequiredGroup {
                constructor(properties?: Object);
                public id: string;
                public static create(properties?: Object): jspb.test.TestGroup.RequiredGroup;
                public static encode(message: (jspb.test.TestGroup.RequiredGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.TestGroup.RequiredGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RequiredGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RequiredGroup;
                public static verify(message: (jspb.test.TestGroup.RequiredGroup|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                public static from(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                public static toObject(message: jspb.test.TestGroup.RequiredGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            class OptionalGroup {
                constructor(properties?: Object);
                public id: string;
                public static create(properties?: Object): jspb.test.TestGroup.OptionalGroup;
                public static encode(message: (jspb.test.TestGroup.OptionalGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.TestGroup.OptionalGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.OptionalGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.OptionalGroup;
                public static verify(message: (jspb.test.TestGroup.OptionalGroup|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                public static from(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                public static toObject(message: jspb.test.TestGroup.OptionalGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class TestGroup1 {
            constructor(properties?: Object);
            public group?: jspb.test.TestGroup.RepeatedGroup;
            public static create(properties?: Object): jspb.test.TestGroup1;
            public static encode(message: (jspb.test.TestGroup1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestGroup1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup1;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup1;
            public static verify(message: (jspb.test.TestGroup1|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup1;
            public static from(object: { [k: string]: any }): jspb.test.TestGroup1;
            public static toObject(message: jspb.test.TestGroup1, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestReservedNames {
            constructor(properties?: Object);
            public extension?: number;
            public static create(properties?: Object): jspb.test.TestReservedNames;
            public static encode(message: (jspb.test.TestReservedNames|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestReservedNames|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNames;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNames;
            public static verify(message: (jspb.test.TestReservedNames|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNames;
            public static from(object: { [k: string]: any }): jspb.test.TestReservedNames;
            public static toObject(message: jspb.test.TestReservedNames, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestReservedNamesExtension {
            constructor(properties?: Object);
            public static create(properties?: Object): jspb.test.TestReservedNamesExtension;
            public static encode(message: (jspb.test.TestReservedNamesExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestReservedNamesExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNamesExtension;
            public static verify(message: (jspb.test.TestReservedNamesExtension|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            public static from(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            public static toObject(message: jspb.test.TestReservedNamesExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestMessageWithOneof {
            constructor(properties?: Object);
            public pone?: string;
            public pthree?: string;
            public rone?: jspb.test.TestMessageWithOneof;
            public rtwo?: string;
            public normalField?: boolean;
            public repeatedField?: string[];
            public aone?: number;
            public atwo?: number;
            public bone?: number;
            public btwo?: number;
            public partialOneof?: string;
            public recursiveOneof?: string;
            public defaultOneofA?: string;
            public defaultOneofB?: string;
            public static create(properties?: Object): jspb.test.TestMessageWithOneof;
            public static encode(message: (jspb.test.TestMessageWithOneof|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestMessageWithOneof|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMessageWithOneof;
            public static verify(message: (jspb.test.TestMessageWithOneof|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            public static from(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            public static toObject(message: jspb.test.TestMessageWithOneof, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestEndsWithBytes {
            constructor(properties?: Object);
            public value?: number;
            public data?: Uint8Array;
            public static create(properties?: Object): jspb.test.TestEndsWithBytes;
            public static encode(message: (jspb.test.TestEndsWithBytes|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestEndsWithBytes|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestEndsWithBytes;
            public static verify(message: (jspb.test.TestEndsWithBytes|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            public static from(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            public static toObject(message: jspb.test.TestEndsWithBytes, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class TestMapFieldsNoBinary {
            constructor(properties?: Object);
            public mapStringString?: { [k: string]: string };
            public mapStringInt32?: { [k: string]: number };
            public mapStringInt64?: { [k: string]: (number|$protobuf.Long) };
            public mapStringBool?: { [k: string]: boolean };
            public mapStringDouble?: { [k: string]: number };
            public mapStringEnum?: { [k: string]: number };
            public mapStringMsg?: { [k: string]: jspb.test.MapValueMessageNoBinary };
            public mapInt32String?: { [k: string]: string };
            public mapInt64String?: { [k: string]: string };
            public mapBoolString?: { [k: string]: string };
            public testMapFields?: jspb.test.TestMapFieldsNoBinary;
            public mapStringTestmapfields?: { [k: string]: jspb.test.TestMapFieldsNoBinary };
            public static create(properties?: Object): jspb.test.TestMapFieldsNoBinary;
            public static encode(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary;
            public static verify(message: (jspb.test.TestMapFieldsNoBinary|Object)): string;
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

        class MapValueMessageNoBinary {
            constructor(properties?: Object);
            public foo?: number;
            public static create(properties?: Object): jspb.test.MapValueMessageNoBinary;
            public static encode(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary;
            public static verify(message: (jspb.test.MapValueMessageNoBinary|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            public static from(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            public static toObject(message: jspb.test.MapValueMessageNoBinary, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class Deeply {
            constructor(properties?: Object);
            public static create(properties?: Object): jspb.test.Deeply;
            public static encode(message: (jspb.test.Deeply|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (jspb.test.Deeply|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply;
            public static verify(message: (jspb.test.Deeply|Object)): string;
            public static fromObject(object: { [k: string]: any }): jspb.test.Deeply;
            public static from(object: { [k: string]: any }): jspb.test.Deeply;
            public static toObject(message: jspb.test.Deeply, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace Deeply {

            class Nested {
                constructor(properties?: Object);
                public static create(properties?: Object): jspb.test.Deeply.Nested;
                public static encode(message: (jspb.test.Deeply.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (jspb.test.Deeply.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested;
                public static verify(message: (jspb.test.Deeply.Nested|Object)): string;
                public static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                public static from(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                public static toObject(message: jspb.test.Deeply.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            namespace Nested {

                class Message {
                    constructor(properties?: Object);
                    public count?: number;
                    public static create(properties?: Object): jspb.test.Deeply.Nested.Message;
                    public static encode(message: (jspb.test.Deeply.Nested.Message|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                    public static encodeDelimited(message: (jspb.test.Deeply.Nested.Message|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message;
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested.Message;
                    public static verify(message: (jspb.test.Deeply.Nested.Message|Object)): string;
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

        class FileDescriptorSet {
            constructor(properties?: Object);
            public file?: google.protobuf.FileDescriptorProto[];
            public static create(properties?: Object): google.protobuf.FileDescriptorSet;
            public static encode(message: (google.protobuf.FileDescriptorSet|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.FileDescriptorSet|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;
            public static verify(message: (google.protobuf.FileDescriptorSet|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            public static from(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class FileDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public package?: string;
            public dependency?: string[];
            public publicDependency?: number[];
            public weakDependency?: number[];
            public messageType?: google.protobuf.DescriptorProto[];
            public enumType?: google.protobuf.EnumDescriptorProto[];
            public service?: google.protobuf.ServiceDescriptorProto[];
            public extension?: google.protobuf.FieldDescriptorProto[];
            public options?: google.protobuf.FileOptions;
            public sourceCodeInfo?: google.protobuf.SourceCodeInfo;
            public syntax?: string;
            public static create(properties?: Object): google.protobuf.FileDescriptorProto;
            public static encode(message: (google.protobuf.FileDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.FileDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;
            public static verify(message: (google.protobuf.FileDescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class DescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public field?: google.protobuf.FieldDescriptorProto[];
            public extension?: google.protobuf.FieldDescriptorProto[];
            public nestedType?: google.protobuf.DescriptorProto[];
            public enumType?: google.protobuf.EnumDescriptorProto[];
            public extensionRange?: google.protobuf.DescriptorProto.ExtensionRange[];
            public oneofDecl?: google.protobuf.OneofDescriptorProto[];
            public options?: google.protobuf.MessageOptions;
            public reservedRange?: google.protobuf.DescriptorProto.ReservedRange[];
            public reservedName?: string[];
            public static create(properties?: Object): google.protobuf.DescriptorProto;
            public static encode(message: (google.protobuf.DescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.DescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;
            public static verify(message: (google.protobuf.DescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            class ExtensionRange {
                constructor(properties?: Object);
                public start?: number;
                public end?: number;
                public static create(properties?: Object): google.protobuf.DescriptorProto.ExtensionRange;
                public static encode(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;
                public static verify(message: (google.protobuf.DescriptorProto.ExtensionRange|Object)): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                public static from(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            class ReservedRange {
                constructor(properties?: Object);
                public start?: number;
                public end?: number;
                public static create(properties?: Object): google.protobuf.DescriptorProto.ReservedRange;
                public static encode(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;
                public static verify(message: (google.protobuf.DescriptorProto.ReservedRange|Object)): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                public static from(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class FieldDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public number?: number;
            public label?: number;
            public type?: number;
            public typeName?: string;
            public extendee?: string;
            public defaultValue?: string;
            public oneofIndex?: number;
            public jsonName?: string;
            public options?: google.protobuf.FieldOptions;
            public static create(properties?: Object): google.protobuf.FieldDescriptorProto;
            public static encode(message: (google.protobuf.FieldDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.FieldDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;
            public static verify(message: (google.protobuf.FieldDescriptorProto|Object)): string;
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

        class OneofDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public options?: google.protobuf.OneofOptions;
            public static create(properties?: Object): google.protobuf.OneofDescriptorProto;
            public static encode(message: (google.protobuf.OneofDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.OneofDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;
            public static verify(message: (google.protobuf.OneofDescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class EnumDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public value?: google.protobuf.EnumValueDescriptorProto[];
            public options?: google.protobuf.EnumOptions;
            public static create(properties?: Object): google.protobuf.EnumDescriptorProto;
            public static encode(message: (google.protobuf.EnumDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.EnumDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;
            public static verify(message: (google.protobuf.EnumDescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class EnumValueDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public number?: number;
            public options?: google.protobuf.EnumValueOptions;
            public static create(properties?: Object): google.protobuf.EnumValueDescriptorProto;
            public static encode(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;
            public static verify(message: (google.protobuf.EnumValueDescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class ServiceDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public method?: google.protobuf.MethodDescriptorProto[];
            public options?: google.protobuf.ServiceOptions;
            public static create(properties?: Object): google.protobuf.ServiceDescriptorProto;
            public static encode(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;
            public static verify(message: (google.protobuf.ServiceDescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class MethodDescriptorProto {
            constructor(properties?: Object);
            public name?: string;
            public inputType?: string;
            public outputType?: string;
            public options?: google.protobuf.MethodOptions;
            public clientStreaming?: boolean;
            public serverStreaming?: boolean;
            public static create(properties?: Object): google.protobuf.MethodDescriptorProto;
            public static encode(message: (google.protobuf.MethodDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.MethodDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;
            public static verify(message: (google.protobuf.MethodDescriptorProto|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            public static from(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class FileOptions {
            constructor(properties?: Object);
            public javaPackage?: string;
            public javaOuterClassname?: string;
            public javaMultipleFiles?: boolean;
            public javaGenerateEqualsAndHash?: boolean;
            public javaStringCheckUtf8?: boolean;
            public optimizeFor?: number;
            public goPackage?: string;
            public ccGenericServices?: boolean;
            public javaGenericServices?: boolean;
            public pyGenericServices?: boolean;
            public deprecated?: boolean;
            public ccEnableArenas?: boolean;
            public objcClassPrefix?: string;
            public csharpNamespace?: string;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.FileOptions;
            public static encode(message: (google.protobuf.FileOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.FileOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;
            public static verify(message: (google.protobuf.FileOptions|Object)): string;
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

        class MessageOptions {
            constructor(properties?: Object);
            public messageSetWireFormat?: boolean;
            public noStandardDescriptorAccessor?: boolean;
            public deprecated?: boolean;
            public mapEntry?: boolean;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.MessageOptions;
            public static encode(message: (google.protobuf.MessageOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.MessageOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;
            public static verify(message: (google.protobuf.MessageOptions|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;
            public static from(object: { [k: string]: any }): google.protobuf.MessageOptions;
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class FieldOptions {
            constructor(properties?: Object);
            public ctype?: number;
            public packed?: boolean;
            public jstype?: number;
            public lazy?: boolean;
            public deprecated?: boolean;
            public weak?: boolean;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.FieldOptions;
            public static encode(message: (google.protobuf.FieldOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.FieldOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;
            public static verify(message: (google.protobuf.FieldOptions|Object)): string;
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

        class OneofOptions {
            constructor(properties?: Object);
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.OneofOptions;
            public static encode(message: (google.protobuf.OneofOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.OneofOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;
            public static verify(message: (google.protobuf.OneofOptions|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;
            public static from(object: { [k: string]: any }): google.protobuf.OneofOptions;
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class EnumOptions {
            constructor(properties?: Object);
            public allowAlias?: boolean;
            public deprecated?: boolean;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.EnumOptions;
            public static encode(message: (google.protobuf.EnumOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.EnumOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;
            public static verify(message: (google.protobuf.EnumOptions|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;
            public static from(object: { [k: string]: any }): google.protobuf.EnumOptions;
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class EnumValueOptions {
            constructor(properties?: Object);
            public deprecated?: boolean;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.EnumValueOptions;
            public static encode(message: (google.protobuf.EnumValueOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.EnumValueOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;
            public static verify(message: (google.protobuf.EnumValueOptions|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            public static from(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class ServiceOptions {
            constructor(properties?: Object);
            public deprecated?: boolean;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.ServiceOptions;
            public static encode(message: (google.protobuf.ServiceOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.ServiceOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;
            public static verify(message: (google.protobuf.ServiceOptions|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            public static from(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        class MethodOptions {
            constructor(properties?: Object);
            public deprecated?: boolean;
            public idempotencyLevel?: number;
            public uninterpretedOption?: google.protobuf.UninterpretedOption[];
            public static create(properties?: Object): google.protobuf.MethodOptions;
            public static encode(message: (google.protobuf.MethodOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.MethodOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;
            public static verify(message: (google.protobuf.MethodOptions|Object)): string;
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

        class UninterpretedOption {
            constructor(properties?: Object);
            public name?: google.protobuf.UninterpretedOption.NamePart[];
            public identifierValue?: string;
            public positiveIntValue?: (number|$protobuf.Long);
            public negativeIntValue?: (number|$protobuf.Long);
            public doubleValue?: number;
            public stringValue?: Uint8Array;
            public aggregateValue?: string;
            public static create(properties?: Object): google.protobuf.UninterpretedOption;
            public static encode(message: (google.protobuf.UninterpretedOption|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.UninterpretedOption|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;
            public static verify(message: (google.protobuf.UninterpretedOption|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            public static from(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            class NamePart {
                constructor(properties?: Object);
                public namePart: string;
                public isExtension: boolean;
                public static create(properties?: Object): google.protobuf.UninterpretedOption.NamePart;
                public static encode(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;
                public static verify(message: (google.protobuf.UninterpretedOption.NamePart|Object)): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                public static from(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class SourceCodeInfo {
            constructor(properties?: Object);
            public location?: google.protobuf.SourceCodeInfo.Location[];
            public static create(properties?: Object): google.protobuf.SourceCodeInfo;
            public static encode(message: (google.protobuf.SourceCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.SourceCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;
            public static verify(message: (google.protobuf.SourceCodeInfo|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            public static from(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            class Location {
                constructor(properties?: Object);
                public path?: number[];
                public span?: number[];
                public leadingComments?: string;
                public trailingComments?: string;
                public leadingDetachedComments?: string[];
                public static create(properties?: Object): google.protobuf.SourceCodeInfo.Location;
                public static encode(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;
                public static verify(message: (google.protobuf.SourceCodeInfo.Location|Object)): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                public static from(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        class GeneratedCodeInfo {
            constructor(properties?: Object);
            public annotation?: google.protobuf.GeneratedCodeInfo.Annotation[];
            public static create(properties?: Object): google.protobuf.GeneratedCodeInfo;
            public static encode(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;
            public static verify(message: (google.protobuf.GeneratedCodeInfo|Object)): string;
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            public static from(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            class Annotation {
                constructor(properties?: Object);
                public path?: number[];
                public sourceFile?: string;
                public begin?: number;
                public end?: number;
                public static create(properties?: Object): google.protobuf.GeneratedCodeInfo.Annotation;
                public static encode(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;
                public static verify(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object)): string;
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                public static from(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
