import * as $protobuf from "../..";

export namespace jspb {

    namespace test {

        class Empty {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.Empty;
            static encode(message: (jspb.test.Empty|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Empty|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Empty;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Empty;
            static verify(message: (jspb.test.Empty|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.Empty;
            static from(object: { [k: string]: any }): jspb.test.Empty;
            static toObject(message: jspb.test.Empty, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        enum OuterEnum {
            FOO = 1,
            BAR = 2
        }

        class EnumContainer {
            constructor(properties?: Object);
            outerEnum: number;
            static create(properties?: Object): jspb.test.EnumContainer;
            static encode(message: (jspb.test.EnumContainer|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.EnumContainer|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.EnumContainer;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.EnumContainer;
            static verify(message: (jspb.test.EnumContainer|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.EnumContainer;
            static from(object: { [k: string]: any }): jspb.test.EnumContainer;
            static toObject(message: jspb.test.EnumContainer, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class Simple1 {
            constructor(properties?: Object);
            aString: string;
            aRepeatedString: string[];
            aBoolean: boolean;
            static create(properties?: Object): jspb.test.Simple1;
            static encode(message: (jspb.test.Simple1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Simple1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple1;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple1;
            static verify(message: (jspb.test.Simple1|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.Simple1;
            static from(object: { [k: string]: any }): jspb.test.Simple1;
            static toObject(message: jspb.test.Simple1, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class Simple2 {
            constructor(properties?: Object);
            aString: string;
            aRepeatedString: string[];
            static create(properties?: Object): jspb.test.Simple2;
            static encode(message: (jspb.test.Simple2|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Simple2|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple2;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple2;
            static verify(message: (jspb.test.Simple2|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.Simple2;
            static from(object: { [k: string]: any }): jspb.test.Simple2;
            static toObject(message: jspb.test.Simple2, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class SpecialCases {
            constructor(properties?: Object);
            normal: string;
            default: string;
            function: string;
            var: string;
            static create(properties?: Object): jspb.test.SpecialCases;
            static encode(message: (jspb.test.SpecialCases|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.SpecialCases|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.SpecialCases;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.SpecialCases;
            static verify(message: (jspb.test.SpecialCases|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.SpecialCases;
            static from(object: { [k: string]: any }): jspb.test.SpecialCases;
            static toObject(message: jspb.test.SpecialCases, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class OptionalFields {
            constructor(properties?: Object);
            aString: string;
            aBool: boolean;
            aNestedMessage: jspb.test.OptionalFields.Nested;
            aRepeatedMessage: jspb.test.OptionalFields.Nested[];
            aRepeatedString: string[];
            static create(properties?: Object): jspb.test.OptionalFields;
            static encode(message: (jspb.test.OptionalFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.OptionalFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields;
            static verify(message: (jspb.test.OptionalFields|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields;
            static from(object: { [k: string]: any }): jspb.test.OptionalFields;
            static toObject(message: jspb.test.OptionalFields, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace OptionalFields {

            class Nested {
                constructor(properties?: Object);
                anInt: number;
                static create(properties?: Object): jspb.test.OptionalFields.Nested;
                static encode(message: (jspb.test.OptionalFields.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.OptionalFields.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields.Nested;
                static verify(message: (jspb.test.OptionalFields.Nested|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                static from(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                static toObject(message: jspb.test.OptionalFields.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class HasExtensions {
            constructor(properties?: Object);
            str1: string;
            str2: string;
            str3: string;
            static create(properties?: Object): jspb.test.HasExtensions;
            static encode(message: (jspb.test.HasExtensions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.HasExtensions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.HasExtensions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.HasExtensions;
            static verify(message: (jspb.test.HasExtensions|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.HasExtensions;
            static from(object: { [k: string]: any }): jspb.test.HasExtensions;
            static toObject(message: jspb.test.HasExtensions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class Complex {
            constructor(properties?: Object);
            aString: string;
            anOutOfOrderBool: boolean;
            aNestedMessage: jspb.test.Complex.Nested;
            aRepeatedMessage: jspb.test.Complex.Nested[];
            aRepeatedString: string[];
            static create(properties?: Object): jspb.test.Complex;
            static encode(message: (jspb.test.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex;
            static verify(message: (jspb.test.Complex|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.Complex;
            static from(object: { [k: string]: any }): jspb.test.Complex;
            static toObject(message: jspb.test.Complex, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace Complex {

            class Nested {
                constructor(properties?: Object);
                anInt: number;
                static create(properties?: Object): jspb.test.Complex.Nested;
                static encode(message: (jspb.test.Complex.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.Complex.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex.Nested;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex.Nested;
                static verify(message: (jspb.test.Complex.Nested|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.Complex.Nested;
                static from(object: { [k: string]: any }): jspb.test.Complex.Nested;
                static toObject(message: jspb.test.Complex.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class OuterMessage {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.OuterMessage;
            static encode(message: (jspb.test.OuterMessage|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.OuterMessage|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage;
            static verify(message: (jspb.test.OuterMessage|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage;
            static from(object: { [k: string]: any }): jspb.test.OuterMessage;
            static toObject(message: jspb.test.OuterMessage, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace OuterMessage {

            class Complex {
                constructor(properties?: Object);
                innerComplexField: number;
                static create(properties?: Object): jspb.test.OuterMessage.Complex;
                static encode(message: (jspb.test.OuterMessage.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.OuterMessage.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage.Complex;
                static verify(message: (jspb.test.OuterMessage.Complex|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                static from(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                static toObject(message: jspb.test.OuterMessage.Complex, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class IsExtension {
            constructor(properties?: Object);
            ext1: string;
            static create(properties?: Object): jspb.test.IsExtension;
            static encode(message: (jspb.test.IsExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.IsExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IsExtension;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IsExtension;
            static verify(message: (jspb.test.IsExtension|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.IsExtension;
            static from(object: { [k: string]: any }): jspb.test.IsExtension;
            static toObject(message: jspb.test.IsExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class IndirectExtension {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.IndirectExtension;
            static encode(message: (jspb.test.IndirectExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.IndirectExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IndirectExtension;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IndirectExtension;
            static verify(message: (jspb.test.IndirectExtension|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.IndirectExtension;
            static from(object: { [k: string]: any }): jspb.test.IndirectExtension;
            static toObject(message: jspb.test.IndirectExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class DefaultValues {
            constructor(properties?: Object);
            stringField: string;
            boolField: boolean;
            intField: (number|$protobuf.Long);
            enumField: number;
            emptyField: string;
            bytesField: Uint8Array;
            static create(properties?: Object): jspb.test.DefaultValues;
            static encode(message: (jspb.test.DefaultValues|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.DefaultValues|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.DefaultValues;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.DefaultValues;
            static verify(message: (jspb.test.DefaultValues|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.DefaultValues;
            static from(object: { [k: string]: any }): jspb.test.DefaultValues;
            static toObject(message: jspb.test.DefaultValues, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace DefaultValues {

            enum Enum {
                E1 = 13,
                E2 = 77
            }
        }

        class FloatingPointFields {
            constructor(properties?: Object);
            optionalFloatField: number;
            requiredFloatField: number;
            repeatedFloatField: number[];
            defaultFloatField: number;
            optionalDoubleField: number;
            requiredDoubleField: number;
            repeatedDoubleField: number[];
            defaultDoubleField: number;
            static create(properties?: Object): jspb.test.FloatingPointFields;
            static encode(message: (jspb.test.FloatingPointFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.FloatingPointFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.FloatingPointFields;
            static verify(message: (jspb.test.FloatingPointFields|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            static from(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            static toObject(message: jspb.test.FloatingPointFields, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestClone {
            constructor(properties?: Object);
            str: string;
            simple1: jspb.test.Simple1;
            simple2: jspb.test.Simple1[];
            bytesField: Uint8Array;
            unused: string;
            static create(properties?: Object): jspb.test.TestClone;
            static encode(message: (jspb.test.TestClone|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestClone|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestClone;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestClone;
            static verify(message: (jspb.test.TestClone|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestClone;
            static from(object: { [k: string]: any }): jspb.test.TestClone;
            static toObject(message: jspb.test.TestClone, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class CloneExtension {
            constructor(properties?: Object);
            ext: string;
            static create(properties?: Object): jspb.test.CloneExtension;
            static encode(message: (jspb.test.CloneExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.CloneExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.CloneExtension;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.CloneExtension;
            static verify(message: (jspb.test.CloneExtension|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.CloneExtension;
            static from(object: { [k: string]: any }): jspb.test.CloneExtension;
            static toObject(message: jspb.test.CloneExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestGroup {
            constructor(properties?: Object);
            repeatedGroup: jspb.test.TestGroup.RepeatedGroup[];
            requiredGroup: jspb.test.TestGroup.RequiredGroup;
            optionalGroup: jspb.test.TestGroup.OptionalGroup;
            id: string;
            requiredSimple: jspb.test.Simple2;
            optionalSimple: jspb.test.Simple2;
            static create(properties?: Object): jspb.test.TestGroup;
            static encode(message: (jspb.test.TestGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup;
            static verify(message: (jspb.test.TestGroup|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestGroup;
            static from(object: { [k: string]: any }): jspb.test.TestGroup;
            static toObject(message: jspb.test.TestGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace TestGroup {

            class RepeatedGroup {
                constructor(properties?: Object);
                id: string;
                someBool: boolean[];
                static create(properties?: Object): jspb.test.TestGroup.RepeatedGroup;
                static encode(message: (jspb.test.TestGroup.RepeatedGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.TestGroup.RepeatedGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RepeatedGroup;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RepeatedGroup;
                static verify(message: (jspb.test.TestGroup.RepeatedGroup|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                static from(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                static toObject(message: jspb.test.TestGroup.RepeatedGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }

            class RequiredGroup {
                constructor(properties?: Object);
                id: string;
                static create(properties?: Object): jspb.test.TestGroup.RequiredGroup;
                static encode(message: (jspb.test.TestGroup.RequiredGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.TestGroup.RequiredGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RequiredGroup;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RequiredGroup;
                static verify(message: (jspb.test.TestGroup.RequiredGroup|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                static from(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                static toObject(message: jspb.test.TestGroup.RequiredGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }

            class OptionalGroup {
                constructor(properties?: Object);
                id: string;
                static create(properties?: Object): jspb.test.TestGroup.OptionalGroup;
                static encode(message: (jspb.test.TestGroup.OptionalGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.TestGroup.OptionalGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.OptionalGroup;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.OptionalGroup;
                static verify(message: (jspb.test.TestGroup.OptionalGroup|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                static from(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                static toObject(message: jspb.test.TestGroup.OptionalGroup, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class TestGroup1 {
            constructor(properties?: Object);
            group: jspb.test.TestGroup.RepeatedGroup;
            static create(properties?: Object): jspb.test.TestGroup1;
            static encode(message: (jspb.test.TestGroup1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestGroup1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup1;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup1;
            static verify(message: (jspb.test.TestGroup1|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestGroup1;
            static from(object: { [k: string]: any }): jspb.test.TestGroup1;
            static toObject(message: jspb.test.TestGroup1, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestReservedNames {
            constructor(properties?: Object);
            extension: number;
            static create(properties?: Object): jspb.test.TestReservedNames;
            static encode(message: (jspb.test.TestReservedNames|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestReservedNames|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNames;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNames;
            static verify(message: (jspb.test.TestReservedNames|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNames;
            static from(object: { [k: string]: any }): jspb.test.TestReservedNames;
            static toObject(message: jspb.test.TestReservedNames, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestReservedNamesExtension {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.TestReservedNamesExtension;
            static encode(message: (jspb.test.TestReservedNamesExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestReservedNamesExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNamesExtension;
            static verify(message: (jspb.test.TestReservedNamesExtension|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            static from(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            static toObject(message: jspb.test.TestReservedNamesExtension, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestMessageWithOneof {
            constructor(properties?: Object);
            pone: string;
            pthree: string;
            rone: jspb.test.TestMessageWithOneof;
            rtwo: string;
            normalField: boolean;
            repeatedField: string[];
            aone: number;
            atwo: number;
            bone: number;
            btwo: number;
            partialOneof: (string|undefined);
            recursiveOneof: (string|undefined);
            defaultOneofA: (string|undefined);
            defaultOneofB: (string|undefined);
            static create(properties?: Object): jspb.test.TestMessageWithOneof;
            static encode(message: (jspb.test.TestMessageWithOneof|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestMessageWithOneof|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMessageWithOneof;
            static verify(message: (jspb.test.TestMessageWithOneof|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            static from(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            static toObject(message: jspb.test.TestMessageWithOneof, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestEndsWithBytes {
            constructor(properties?: Object);
            value: number;
            data: Uint8Array;
            static create(properties?: Object): jspb.test.TestEndsWithBytes;
            static encode(message: (jspb.test.TestEndsWithBytes|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestEndsWithBytes|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestEndsWithBytes;
            static verify(message: (jspb.test.TestEndsWithBytes|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            static from(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            static toObject(message: jspb.test.TestEndsWithBytes, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class TestMapFieldsNoBinary {
            constructor(properties?: Object);
            mapStringString: { [k: string]: string };
            mapStringInt32: { [k: string]: number };
            mapStringInt64: { [k: string]: (number|$protobuf.Long) };
            mapStringBool: { [k: string]: boolean };
            mapStringDouble: { [k: string]: number };
            mapStringEnum: { [k: string]: number };
            mapStringMsg: { [k: string]: jspb.test.MapValueMessageNoBinary };
            mapInt32String: { [k: string]: string };
            mapInt64String: { [k: string]: string };
            mapBoolString: { [k: string]: string };
            testMapFields: jspb.test.TestMapFieldsNoBinary;
            mapStringTestmapfields: { [k: string]: jspb.test.TestMapFieldsNoBinary };
            static create(properties?: Object): jspb.test.TestMapFieldsNoBinary;
            static encode(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary;
            static verify(message: (jspb.test.TestMapFieldsNoBinary|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.TestMapFieldsNoBinary;
            static from(object: { [k: string]: any }): jspb.test.TestMapFieldsNoBinary;
            static toObject(message: jspb.test.TestMapFieldsNoBinary, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        enum MapValueEnumNoBinary {
            MAP_VALUE_FOO_NOBINARY = 0,
            MAP_VALUE_BAR_NOBINARY = 1,
            MAP_VALUE_BAZ_NOBINARY = 2
        }

        class MapValueMessageNoBinary {
            constructor(properties?: Object);
            foo: number;
            static create(properties?: Object): jspb.test.MapValueMessageNoBinary;
            static encode(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary;
            static verify(message: (jspb.test.MapValueMessageNoBinary|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            static from(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            static toObject(message: jspb.test.MapValueMessageNoBinary, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class Deeply {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.Deeply;
            static encode(message: (jspb.test.Deeply|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Deeply|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply;
            static verify(message: (jspb.test.Deeply|Object)): string;
            static fromObject(object: { [k: string]: any }): jspb.test.Deeply;
            static from(object: { [k: string]: any }): jspb.test.Deeply;
            static toObject(message: jspb.test.Deeply, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace Deeply {

            class Nested {
                constructor(properties?: Object);
                static create(properties?: Object): jspb.test.Deeply.Nested;
                static encode(message: (jspb.test.Deeply.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.Deeply.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested;
                static verify(message: (jspb.test.Deeply.Nested|Object)): string;
                static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                static from(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                static toObject(message: jspb.test.Deeply.Nested, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }

            namespace Nested {

                class Message {
                    constructor(properties?: Object);
                    count: number;
                    static create(properties?: Object): jspb.test.Deeply.Nested.Message;
                    static encode(message: (jspb.test.Deeply.Nested.Message|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                    static encodeDelimited(message: (jspb.test.Deeply.Nested.Message|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message;
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested.Message;
                    static verify(message: (jspb.test.Deeply.Nested.Message|Object)): string;
                    static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested.Message;
                    static from(object: { [k: string]: any }): jspb.test.Deeply.Nested.Message;
                    static toObject(message: jspb.test.Deeply.Nested.Message, options?: $protobuf.ConversionOptions): { [k: string]: any };
                    toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                }
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        class FileDescriptorSet {
            constructor(properties?: Object);
            file: google.protobuf.FileDescriptorProto[];
            static create(properties?: Object): google.protobuf.FileDescriptorSet;
            static encode(message: (google.protobuf.FileDescriptorSet|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FileDescriptorSet|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;
            static verify(message: (google.protobuf.FileDescriptorSet|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            static from(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class FileDescriptorProto {
            constructor(properties?: Object);
            name: string;
            package: string;
            dependency: string[];
            publicDependency: number[];
            weakDependency: number[];
            messageType: google.protobuf.DescriptorProto[];
            enumType: google.protobuf.EnumDescriptorProto[];
            service: google.protobuf.ServiceDescriptorProto[];
            extension: google.protobuf.FieldDescriptorProto[];
            options: google.protobuf.FileOptions;
            sourceCodeInfo: google.protobuf.SourceCodeInfo;
            syntax: string;
            static create(properties?: Object): google.protobuf.FileDescriptorProto;
            static encode(message: (google.protobuf.FileDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FileDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;
            static verify(message: (google.protobuf.FileDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class DescriptorProto {
            constructor(properties?: Object);
            name: string;
            field: google.protobuf.FieldDescriptorProto[];
            extension: google.protobuf.FieldDescriptorProto[];
            nestedType: google.protobuf.DescriptorProto[];
            enumType: google.protobuf.EnumDescriptorProto[];
            extensionRange: google.protobuf.DescriptorProto.ExtensionRange[];
            oneofDecl: google.protobuf.OneofDescriptorProto[];
            options: google.protobuf.MessageOptions;
            reservedRange: google.protobuf.DescriptorProto.ReservedRange[];
            reservedName: string[];
            static create(properties?: Object): google.protobuf.DescriptorProto;
            static encode(message: (google.protobuf.DescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.DescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;
            static verify(message: (google.protobuf.DescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            class ExtensionRange {
                constructor(properties?: Object);
                start: number;
                end: number;
                static create(properties?: Object): google.protobuf.DescriptorProto.ExtensionRange;
                static encode(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;
                static verify(message: (google.protobuf.DescriptorProto.ExtensionRange|Object)): string;
                static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                static from(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }

            class ReservedRange {
                constructor(properties?: Object);
                start: number;
                end: number;
                static create(properties?: Object): google.protobuf.DescriptorProto.ReservedRange;
                static encode(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;
                static verify(message: (google.protobuf.DescriptorProto.ReservedRange|Object)): string;
                static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                static from(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class FieldDescriptorProto {
            constructor(properties?: Object);
            name: string;
            number: number;
            label: number;
            type: number;
            typeName: string;
            extendee: string;
            defaultValue: string;
            oneofIndex: number;
            jsonName: string;
            options: google.protobuf.FieldOptions;
            static create(properties?: Object): google.protobuf.FieldDescriptorProto;
            static encode(message: (google.protobuf.FieldDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FieldDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;
            static verify(message: (google.protobuf.FieldDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;
            static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
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
            name: string;
            options: google.protobuf.OneofOptions;
            static create(properties?: Object): google.protobuf.OneofDescriptorProto;
            static encode(message: (google.protobuf.OneofDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.OneofDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;
            static verify(message: (google.protobuf.OneofDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class EnumDescriptorProto {
            constructor(properties?: Object);
            name: string;
            value: google.protobuf.EnumValueDescriptorProto[];
            options: google.protobuf.EnumOptions;
            static create(properties?: Object): google.protobuf.EnumDescriptorProto;
            static encode(message: (google.protobuf.EnumDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;
            static verify(message: (google.protobuf.EnumDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class EnumValueDescriptorProto {
            constructor(properties?: Object);
            name: string;
            number: number;
            options: google.protobuf.EnumValueOptions;
            static create(properties?: Object): google.protobuf.EnumValueDescriptorProto;
            static encode(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;
            static verify(message: (google.protobuf.EnumValueDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class ServiceDescriptorProto {
            constructor(properties?: Object);
            name: string;
            method: google.protobuf.MethodDescriptorProto[];
            options: google.protobuf.ServiceOptions;
            static create(properties?: Object): google.protobuf.ServiceDescriptorProto;
            static encode(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;
            static verify(message: (google.protobuf.ServiceDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class MethodDescriptorProto {
            constructor(properties?: Object);
            name: string;
            inputType: string;
            outputType: string;
            options: google.protobuf.MethodOptions;
            clientStreaming: boolean;
            serverStreaming: boolean;
            static create(properties?: Object): google.protobuf.MethodDescriptorProto;
            static encode(message: (google.protobuf.MethodDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.MethodDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;
            static verify(message: (google.protobuf.MethodDescriptorProto|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            static from(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class FileOptions {
            constructor(properties?: Object);
            javaPackage: string;
            javaOuterClassname: string;
            javaMultipleFiles: boolean;
            javaGenerateEqualsAndHash: boolean;
            javaStringCheckUtf8: boolean;
            optimizeFor: number;
            goPackage: string;
            ccGenericServices: boolean;
            javaGenericServices: boolean;
            pyGenericServices: boolean;
            deprecated: boolean;
            ccEnableArenas: boolean;
            objcClassPrefix: string;
            csharpNamespace: string;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.FileOptions;
            static encode(message: (google.protobuf.FileOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FileOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;
            static verify(message: (google.protobuf.FileOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;
            static from(object: { [k: string]: any }): google.protobuf.FileOptions;
            static toObject(message: google.protobuf.FileOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
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
            messageSetWireFormat: boolean;
            noStandardDescriptorAccessor: boolean;
            deprecated: boolean;
            mapEntry: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.MessageOptions;
            static encode(message: (google.protobuf.MessageOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.MessageOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;
            static verify(message: (google.protobuf.MessageOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;
            static from(object: { [k: string]: any }): google.protobuf.MessageOptions;
            static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class FieldOptions {
            constructor(properties?: Object);
            ctype: number;
            packed: boolean;
            jstype: number;
            lazy: boolean;
            deprecated: boolean;
            weak: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.FieldOptions;
            static encode(message: (google.protobuf.FieldOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FieldOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;
            static verify(message: (google.protobuf.FieldOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;
            static from(object: { [k: string]: any }): google.protobuf.FieldOptions;
            static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
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
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.OneofOptions;
            static encode(message: (google.protobuf.OneofOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.OneofOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;
            static verify(message: (google.protobuf.OneofOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;
            static from(object: { [k: string]: any }): google.protobuf.OneofOptions;
            static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class EnumOptions {
            constructor(properties?: Object);
            allowAlias: boolean;
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.EnumOptions;
            static encode(message: (google.protobuf.EnumOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;
            static verify(message: (google.protobuf.EnumOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;
            static from(object: { [k: string]: any }): google.protobuf.EnumOptions;
            static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class EnumValueOptions {
            constructor(properties?: Object);
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.EnumValueOptions;
            static encode(message: (google.protobuf.EnumValueOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumValueOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;
            static verify(message: (google.protobuf.EnumValueOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            static from(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class ServiceOptions {
            constructor(properties?: Object);
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.ServiceOptions;
            static encode(message: (google.protobuf.ServiceOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.ServiceOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;
            static verify(message: (google.protobuf.ServiceOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            static from(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        class MethodOptions {
            constructor(properties?: Object);
            deprecated: boolean;
            idempotencyLevel: number;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.MethodOptions;
            static encode(message: (google.protobuf.MethodOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.MethodOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;
            static verify(message: (google.protobuf.MethodOptions|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;
            static from(object: { [k: string]: any }): google.protobuf.MethodOptions;
            static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
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
            name: google.protobuf.UninterpretedOption.NamePart[];
            identifierValue: string;
            positiveIntValue: (number|$protobuf.Long);
            negativeIntValue: (number|$protobuf.Long);
            doubleValue: number;
            stringValue: Uint8Array;
            aggregateValue: string;
            static create(properties?: Object): google.protobuf.UninterpretedOption;
            static encode(message: (google.protobuf.UninterpretedOption|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.UninterpretedOption|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;
            static verify(message: (google.protobuf.UninterpretedOption|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            static from(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            class NamePart {
                constructor(properties?: Object);
                namePart: string;
                isExtension: boolean;
                static create(properties?: Object): google.protobuf.UninterpretedOption.NamePart;
                static encode(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;
                static verify(message: (google.protobuf.UninterpretedOption.NamePart|Object)): string;
                static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                static from(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class SourceCodeInfo {
            constructor(properties?: Object);
            location: google.protobuf.SourceCodeInfo.Location[];
            static create(properties?: Object): google.protobuf.SourceCodeInfo;
            static encode(message: (google.protobuf.SourceCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.SourceCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;
            static verify(message: (google.protobuf.SourceCodeInfo|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            static from(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            class Location {
                constructor(properties?: Object);
                path: number[];
                span: number[];
                leadingComments: string;
                trailingComments: string;
                leadingDetachedComments: string[];
                static create(properties?: Object): google.protobuf.SourceCodeInfo.Location;
                static encode(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;
                static verify(message: (google.protobuf.SourceCodeInfo.Location|Object)): string;
                static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                static from(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }

        class GeneratedCodeInfo {
            constructor(properties?: Object);
            annotation: google.protobuf.GeneratedCodeInfo.Annotation[];
            static create(properties?: Object): google.protobuf.GeneratedCodeInfo;
            static encode(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;
            static verify(message: (google.protobuf.GeneratedCodeInfo|Object)): string;
            static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            static from(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.ConversionOptions): { [k: string]: any };
            toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            class Annotation {
                constructor(properties?: Object);
                path: number[];
                sourceFile: string;
                begin: number;
                end: number;
                static create(properties?: Object): google.protobuf.GeneratedCodeInfo.Annotation;
                static encode(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;
                static verify(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object)): string;
                static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                static from(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.ConversionOptions): { [k: string]: any };
                toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
            }
        }
    }
}
