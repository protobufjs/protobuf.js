import * as $protobuf from "../..";
import Long = require("long");
export namespace jspb {

    namespace test {

        interface IEmpty {
        }

        class Empty implements IEmpty {
            constructor(properties?: jspb.test.IEmpty);
            public static create(properties?: jspb.test.IEmpty): jspb.test.Empty;
            public static encode(message: jspb.test.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Empty;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Empty;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.Empty;
            public static toObject(message: jspb.test.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        enum OuterEnum {
            FOO = 1,
            BAR = 2
        }

        interface IEnumContainer {
            outerEnum?: (jspb.test.OuterEnum|null);
        }

        class EnumContainer implements IEnumContainer {
            constructor(properties?: jspb.test.IEnumContainer);
            public outerEnum: jspb.test.OuterEnum;
            public static create(properties?: jspb.test.IEnumContainer): jspb.test.EnumContainer;
            public static encode(message: jspb.test.IEnumContainer, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IEnumContainer, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.EnumContainer;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.EnumContainer;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.EnumContainer;
            public static toObject(message: jspb.test.EnumContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ISimple1 {
            aString: string;
            aRepeatedString?: (string[]|null);
            aBoolean?: (boolean|null);
        }

        class Simple1 implements ISimple1 {
            constructor(properties?: jspb.test.ISimple1);
            public aString: string;
            public aRepeatedString: string[];
            public aBoolean: boolean;
            public static create(properties?: jspb.test.ISimple1): jspb.test.Simple1;
            public static encode(message: jspb.test.ISimple1, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ISimple1, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple1;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple1;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.Simple1;
            public static toObject(message: jspb.test.Simple1, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ISimple2 {
            aString: string;
            aRepeatedString?: (string[]|null);
        }

        class Simple2 implements ISimple2 {
            constructor(properties?: jspb.test.ISimple2);
            public aString: string;
            public aRepeatedString: string[];
            public static create(properties?: jspb.test.ISimple2): jspb.test.Simple2;
            public static encode(message: jspb.test.ISimple2, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ISimple2, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple2;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple2;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.Simple2;
            public static toObject(message: jspb.test.Simple2, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ISpecialCases {
            normal: string;
            "default": string;
            "function": string;
            "var": string;
        }

        class SpecialCases implements ISpecialCases {
            constructor(properties?: jspb.test.ISpecialCases);
            public normal: string;
            public default: string;
            public function: string;
            public var: string;
            public static create(properties?: jspb.test.ISpecialCases): jspb.test.SpecialCases;
            public static encode(message: jspb.test.ISpecialCases, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ISpecialCases, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.SpecialCases;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.SpecialCases;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.SpecialCases;
            public static toObject(message: jspb.test.SpecialCases, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IOptionalFields {
            aString?: (string|null);
            aBool: boolean;
            aNestedMessage?: (jspb.test.OptionalFields.INested|null);
            aRepeatedMessage?: (jspb.test.OptionalFields.INested[]|null);
            aRepeatedString?: (string[]|null);
        }

        class OptionalFields implements IOptionalFields {
            constructor(properties?: jspb.test.IOptionalFields);
            public aString: string;
            public aBool: boolean;
            public aNestedMessage?: (jspb.test.OptionalFields.INested|null);
            public aRepeatedMessage: jspb.test.OptionalFields.INested[];
            public aRepeatedString: string[];
            public static create(properties?: jspb.test.IOptionalFields): jspb.test.OptionalFields;
            public static encode(message: jspb.test.IOptionalFields, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IOptionalFields, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields;
            public static toObject(message: jspb.test.OptionalFields, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace OptionalFields {

            interface INested {
                anInt?: (number|null);
            }

            class Nested implements INested {
                constructor(properties?: jspb.test.OptionalFields.INested);
                public anInt: number;
                public static create(properties?: jspb.test.OptionalFields.INested): jspb.test.OptionalFields.Nested;
                public static encode(message: jspb.test.OptionalFields.INested, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.OptionalFields.INested, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields.Nested;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                public static toObject(message: jspb.test.OptionalFields.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IHasExtensions {
            str1?: (string|null);
            str2?: (string|null);
            str3?: (string|null);
            ".jspb.test.IsExtension.extField"?: (jspb.test.IIsExtension|null);
            ".jspb.test.IndirectExtension.simple"?: (jspb.test.ISimple1|null);
            ".jspb.test.IndirectExtension.str"?: (string|null);
            ".jspb.test.IndirectExtension.repeatedStr"?: (string[]|null);
            ".jspb.test.IndirectExtension.repeatedSimple"?: (jspb.test.ISimple1[]|null);
            ".jspb.test.simple1"?: (jspb.test.ISimple1|null);
        }

        class HasExtensions implements IHasExtensions {
            constructor(properties?: jspb.test.IHasExtensions);
            public ".jspb.test.IsExtension.extField"?: (jspb.test.IIsExtension|null);
            public ".jspb.test.IndirectExtension.simple"?: (jspb.test.ISimple1|null);
            public ".jspb.test.IndirectExtension.str": string;
            public ".jspb.test.IndirectExtension.repeatedStr": string[];
            public ".jspb.test.IndirectExtension.repeatedSimple": jspb.test.ISimple1[];
            public ".jspb.test.simple1"?: (jspb.test.ISimple1|null);
            public str1: string;
            public str2: string;
            public str3: string;
            public static create(properties?: jspb.test.IHasExtensions): jspb.test.HasExtensions;
            public static encode(message: jspb.test.IHasExtensions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IHasExtensions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.HasExtensions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.HasExtensions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.HasExtensions;
            public static toObject(message: jspb.test.HasExtensions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IComplex {
            aString: string;
            anOutOfOrderBool: boolean;
            aNestedMessage?: (jspb.test.Complex.INested|null);
            aRepeatedMessage?: (jspb.test.Complex.INested[]|null);
            aRepeatedString?: (string[]|null);
        }

        class Complex implements IComplex {
            constructor(properties?: jspb.test.IComplex);
            public aString: string;
            public anOutOfOrderBool: boolean;
            public aNestedMessage?: (jspb.test.Complex.INested|null);
            public aRepeatedMessage: jspb.test.Complex.INested[];
            public aRepeatedString: string[];
            public static create(properties?: jspb.test.IComplex): jspb.test.Complex;
            public static encode(message: jspb.test.IComplex, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IComplex, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.Complex;
            public static toObject(message: jspb.test.Complex, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Complex {

            interface INested {
                anInt: number;
            }

            class Nested implements INested {
                constructor(properties?: jspb.test.Complex.INested);
                public anInt: number;
                public static create(properties?: jspb.test.Complex.INested): jspb.test.Complex.Nested;
                public static encode(message: jspb.test.Complex.INested, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.Complex.INested, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex.Nested;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.Complex.Nested;
                public static toObject(message: jspb.test.Complex.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IOuterMessage {
        }

        class OuterMessage implements IOuterMessage {
            constructor(properties?: jspb.test.IOuterMessage);
            public static create(properties?: jspb.test.IOuterMessage): jspb.test.OuterMessage;
            public static encode(message: jspb.test.IOuterMessage, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IOuterMessage, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage;
            public static toObject(message: jspb.test.OuterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace OuterMessage {

            interface IComplex {
                innerComplexField?: (number|null);
            }

            class Complex implements IComplex {
                constructor(properties?: jspb.test.OuterMessage.IComplex);
                public innerComplexField: number;
                public static create(properties?: jspb.test.OuterMessage.IComplex): jspb.test.OuterMessage.Complex;
                public static encode(message: jspb.test.OuterMessage.IComplex, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.OuterMessage.IComplex, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage.Complex;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                public static toObject(message: jspb.test.OuterMessage.Complex, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IIsExtension {
            ext1?: (string|null);
        }

        class IsExtension implements IIsExtension {
            constructor(properties?: jspb.test.IIsExtension);
            public ext1: string;
            public static create(properties?: jspb.test.IIsExtension): jspb.test.IsExtension;
            public static encode(message: jspb.test.IIsExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IIsExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IsExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IsExtension;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.IsExtension;
            public static toObject(message: jspb.test.IsExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IIndirectExtension {
        }

        class IndirectExtension implements IIndirectExtension {
            constructor(properties?: jspb.test.IIndirectExtension);
            public static create(properties?: jspb.test.IIndirectExtension): jspb.test.IndirectExtension;
            public static encode(message: jspb.test.IIndirectExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IIndirectExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IndirectExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IndirectExtension;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.IndirectExtension;
            public static toObject(message: jspb.test.IndirectExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IDefaultValues {
            stringField?: (string|null);
            boolField?: (boolean|null);
            intField?: (number|Long|null);
            enumField?: (jspb.test.DefaultValues.Enum|null);
            emptyField?: (string|null);
            bytesField?: (Uint8Array|null);
        }

        class DefaultValues implements IDefaultValues {
            constructor(properties?: jspb.test.IDefaultValues);
            public stringField: string;
            public boolField: boolean;
            public intField: (number|Long);
            public enumField: jspb.test.DefaultValues.Enum;
            public emptyField: string;
            public bytesField: Uint8Array;
            public static create(properties?: jspb.test.IDefaultValues): jspb.test.DefaultValues;
            public static encode(message: jspb.test.IDefaultValues, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IDefaultValues, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.DefaultValues;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.DefaultValues;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.DefaultValues;
            public static toObject(message: jspb.test.DefaultValues, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace DefaultValues {

            enum Enum {
                E1 = 13,
                E2 = 77
            }
        }

        interface IFloatingPointFields {
            optionalFloatField?: (number|null);
            requiredFloatField: number;
            repeatedFloatField?: (number[]|null);
            defaultFloatField?: (number|null);
            optionalDoubleField?: (number|null);
            requiredDoubleField: number;
            repeatedDoubleField?: (number[]|null);
            defaultDoubleField?: (number|null);
        }

        class FloatingPointFields implements IFloatingPointFields {
            constructor(properties?: jspb.test.IFloatingPointFields);
            public optionalFloatField: number;
            public requiredFloatField: number;
            public repeatedFloatField: number[];
            public defaultFloatField: number;
            public optionalDoubleField: number;
            public requiredDoubleField: number;
            public repeatedDoubleField: number[];
            public defaultDoubleField: number;
            public static create(properties?: jspb.test.IFloatingPointFields): jspb.test.FloatingPointFields;
            public static encode(message: jspb.test.IFloatingPointFields, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IFloatingPointFields, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.FloatingPointFields;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            public static toObject(message: jspb.test.FloatingPointFields, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestClone {
            str?: (string|null);
            simple1?: (jspb.test.ISimple1|null);
            simple2?: (jspb.test.ISimple1[]|null);
            bytesField?: (Uint8Array|null);
            unused?: (string|null);
            ".jspb.test.CloneExtension.extField"?: (jspb.test.ICloneExtension|null);
        }

        class TestClone implements ITestClone {
            constructor(properties?: jspb.test.ITestClone);
            public ".jspb.test.CloneExtension.extField"?: (jspb.test.ICloneExtension|null);
            public str: string;
            public simple1?: (jspb.test.ISimple1|null);
            public simple2: jspb.test.ISimple1[];
            public bytesField: Uint8Array;
            public unused: string;
            public static create(properties?: jspb.test.ITestClone): jspb.test.TestClone;
            public static encode(message: jspb.test.ITestClone, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestClone, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestClone;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestClone;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestClone;
            public static toObject(message: jspb.test.TestClone, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ICloneExtension {
            ext?: (string|null);
        }

        class CloneExtension implements ICloneExtension {
            constructor(properties?: jspb.test.ICloneExtension);
            public ext: string;
            public static create(properties?: jspb.test.ICloneExtension): jspb.test.CloneExtension;
            public static encode(message: jspb.test.ICloneExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ICloneExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.CloneExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.CloneExtension;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.CloneExtension;
            public static toObject(message: jspb.test.CloneExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestGroup {
            repeatedGroup?: (jspb.test.TestGroup.IRepeatedGroup[]|null);
            requiredGroup: jspb.test.TestGroup.IRequiredGroup;
            optionalGroup?: (jspb.test.TestGroup.IOptionalGroup|null);
            messageInGroup?: (jspb.test.TestGroup.IMessageInGroup|null);
            enumInGroup?: (jspb.test.TestGroup.IEnumInGroup|null);
            id?: (string|null);
            requiredSimple: jspb.test.ISimple2;
            optionalSimple?: (jspb.test.ISimple2|null);
        }

        class TestGroup implements ITestGroup {
            constructor(properties?: jspb.test.ITestGroup);
            public repeatedGroup: jspb.test.TestGroup.IRepeatedGroup[];
            public requiredGroup: jspb.test.TestGroup.IRequiredGroup;
            public optionalGroup?: (jspb.test.TestGroup.IOptionalGroup|null);
            public messageInGroup?: (jspb.test.TestGroup.IMessageInGroup|null);
            public enumInGroup?: (jspb.test.TestGroup.IEnumInGroup|null);
            public id: string;
            public requiredSimple: jspb.test.ISimple2;
            public optionalSimple?: (jspb.test.ISimple2|null);
            public static create(properties?: jspb.test.ITestGroup): jspb.test.TestGroup;
            public static encode(message: jspb.test.ITestGroup, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestGroup, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup;
            public static toObject(message: jspb.test.TestGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace TestGroup {

            interface IRepeatedGroup {
                id: string;
                someBool?: (boolean[]|null);
            }

            class RepeatedGroup implements IRepeatedGroup {
                constructor(properties?: jspb.test.TestGroup.IRepeatedGroup);
                public id: string;
                public someBool: boolean[];
                public static create(properties?: jspb.test.TestGroup.IRepeatedGroup): jspb.test.TestGroup.RepeatedGroup;
                public static encode(message: jspb.test.TestGroup.IRepeatedGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.IRepeatedGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RepeatedGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RepeatedGroup;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                public static toObject(message: jspb.test.TestGroup.RepeatedGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            interface IRequiredGroup {
                id: string;
            }

            class RequiredGroup implements IRequiredGroup {
                constructor(properties?: jspb.test.TestGroup.IRequiredGroup);
                public id: string;
                public static create(properties?: jspb.test.TestGroup.IRequiredGroup): jspb.test.TestGroup.RequiredGroup;
                public static encode(message: jspb.test.TestGroup.IRequiredGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.IRequiredGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RequiredGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RequiredGroup;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                public static toObject(message: jspb.test.TestGroup.RequiredGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            interface IOptionalGroup {
                id: string;
            }

            class OptionalGroup implements IOptionalGroup {
                constructor(properties?: jspb.test.TestGroup.IOptionalGroup);
                public id: string;
                public static create(properties?: jspb.test.TestGroup.IOptionalGroup): jspb.test.TestGroup.OptionalGroup;
                public static encode(message: jspb.test.TestGroup.IOptionalGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.IOptionalGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.OptionalGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.OptionalGroup;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                public static toObject(message: jspb.test.TestGroup.OptionalGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            interface IMessageInGroup {
                id: jspb.test.TestGroup.MessageInGroup.INestedMessage;
            }

            class MessageInGroup implements IMessageInGroup {
                constructor(properties?: jspb.test.TestGroup.IMessageInGroup);
                public id: jspb.test.TestGroup.MessageInGroup.INestedMessage;
                public static create(properties?: jspb.test.TestGroup.IMessageInGroup): jspb.test.TestGroup.MessageInGroup;
                public static encode(message: jspb.test.TestGroup.IMessageInGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.IMessageInGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.MessageInGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.MessageInGroup;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.MessageInGroup;
                public static toObject(message: jspb.test.TestGroup.MessageInGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace MessageInGroup {

                interface INestedMessage {
                    id?: (string|null);
                }

                class NestedMessage implements INestedMessage {
                    constructor(properties?: jspb.test.TestGroup.MessageInGroup.INestedMessage);
                    public id: string;
                    public static create(properties?: jspb.test.TestGroup.MessageInGroup.INestedMessage): jspb.test.TestGroup.MessageInGroup.NestedMessage;
                    public static encode(message: jspb.test.TestGroup.MessageInGroup.INestedMessage, writer?: $protobuf.Writer): $protobuf.Writer;
                    public static encodeDelimited(message: jspb.test.TestGroup.MessageInGroup.INestedMessage, writer?: $protobuf.Writer): $protobuf.Writer;
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.MessageInGroup.NestedMessage;
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.MessageInGroup.NestedMessage;
                    public static verify(message: { [k: string]: any }): (string|null);
                    public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.MessageInGroup.NestedMessage;
                    public static toObject(message: jspb.test.TestGroup.MessageInGroup.NestedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
                    public toJSON(): { [k: string]: any };
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            interface IEnumInGroup {
                id: jspb.test.TestGroup.EnumInGroup.NestedEnum;
            }

            class EnumInGroup implements IEnumInGroup {
                constructor(properties?: jspb.test.TestGroup.IEnumInGroup);
                public id: jspb.test.TestGroup.EnumInGroup.NestedEnum;
                public static create(properties?: jspb.test.TestGroup.IEnumInGroup): jspb.test.TestGroup.EnumInGroup;
                public static encode(message: jspb.test.TestGroup.IEnumInGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.TestGroup.IEnumInGroup, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.EnumInGroup;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.EnumInGroup;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.EnumInGroup;
                public static toObject(message: jspb.test.TestGroup.EnumInGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace EnumInGroup {

                enum NestedEnum {
                    first = 0,
                    second = 1
                }
            }
        }

        interface ITestGroup1 {
            group?: (jspb.test.TestGroup.IRepeatedGroup|null);
        }

        class TestGroup1 implements ITestGroup1 {
            constructor(properties?: jspb.test.ITestGroup1);
            public group?: (jspb.test.TestGroup.IRepeatedGroup|null);
            public static create(properties?: jspb.test.ITestGroup1): jspb.test.TestGroup1;
            public static encode(message: jspb.test.ITestGroup1, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestGroup1, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup1;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup1;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestGroup1;
            public static toObject(message: jspb.test.TestGroup1, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestReservedNames {
            extension?: (number|null);
            ".jspb.test.TestReservedNamesExtension.foo"?: (number|null);
        }

        class TestReservedNames implements ITestReservedNames {
            constructor(properties?: jspb.test.ITestReservedNames);
            public ".jspb.test.TestReservedNamesExtension.foo": number;
            public extension: number;
            public static create(properties?: jspb.test.ITestReservedNames): jspb.test.TestReservedNames;
            public static encode(message: jspb.test.ITestReservedNames, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestReservedNames, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNames;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNames;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNames;
            public static toObject(message: jspb.test.TestReservedNames, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestReservedNamesExtension {
        }

        class TestReservedNamesExtension implements ITestReservedNamesExtension {
            constructor(properties?: jspb.test.ITestReservedNamesExtension);
            public static create(properties?: jspb.test.ITestReservedNamesExtension): jspb.test.TestReservedNamesExtension;
            public static encode(message: jspb.test.ITestReservedNamesExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestReservedNamesExtension, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNamesExtension;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            public static toObject(message: jspb.test.TestReservedNamesExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestMessageWithOneof {
            pone?: (string|null);
            pthree?: (string|null);
            rone?: (jspb.test.ITestMessageWithOneof|null);
            rtwo?: (string|null);
            normalField?: (boolean|null);
            repeatedField?: (string[]|null);
            aone?: (number|null);
            atwo?: (number|null);
            bone?: (number|null);
            btwo?: (number|null);
        }

        class TestMessageWithOneof implements ITestMessageWithOneof {
            constructor(properties?: jspb.test.ITestMessageWithOneof);
            public pone?: (string|null);
            public pthree?: (string|null);
            public rone?: (jspb.test.ITestMessageWithOneof|null);
            public rtwo?: (string|null);
            public normalField: boolean;
            public repeatedField: string[];
            public aone?: (number|null);
            public atwo?: (number|null);
            public bone?: (number|null);
            public btwo?: (number|null);
            public partialOneof?: ("pone"|"pthree");
            public recursiveOneof?: ("rone"|"rtwo");
            public defaultOneofA?: ("aone"|"atwo");
            public defaultOneofB?: ("bone"|"btwo");
            public static create(properties?: jspb.test.ITestMessageWithOneof): jspb.test.TestMessageWithOneof;
            public static encode(message: jspb.test.ITestMessageWithOneof, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestMessageWithOneof, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMessageWithOneof;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            public static toObject(message: jspb.test.TestMessageWithOneof, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestEndsWithBytes {
            value?: (number|null);
            data?: (Uint8Array|null);
        }

        class TestEndsWithBytes implements ITestEndsWithBytes {
            constructor(properties?: jspb.test.ITestEndsWithBytes);
            public value: number;
            public data: Uint8Array;
            public static create(properties?: jspb.test.ITestEndsWithBytes): jspb.test.TestEndsWithBytes;
            public static encode(message: jspb.test.ITestEndsWithBytes, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestEndsWithBytes, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestEndsWithBytes;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            public static toObject(message: jspb.test.TestEndsWithBytes, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface ITestMapFieldsNoBinary {
            mapStringString?: ({ [k: string]: string }|null);
            mapStringInt32?: ({ [k: string]: number }|null);
            mapStringInt64?: ({ [k: string]: (number|Long) }|null);
            mapStringBool?: ({ [k: string]: boolean }|null);
            mapStringDouble?: ({ [k: string]: number }|null);
            mapStringEnum?: ({ [k: string]: jspb.test.MapValueEnumNoBinary }|null);
            mapStringMsg?: ({ [k: string]: jspb.test.IMapValueMessageNoBinary }|null);
            mapInt32String?: ({ [k: string]: string }|null);
            mapInt64String?: ({ [k: string]: string }|null);
            mapBoolString?: ({ [k: string]: string }|null);
            testMapFields?: (jspb.test.ITestMapFieldsNoBinary|null);
            mapStringTestmapfields?: ({ [k: string]: jspb.test.ITestMapFieldsNoBinary }|null);
        }

        class TestMapFieldsNoBinary implements ITestMapFieldsNoBinary {
            constructor(properties?: jspb.test.ITestMapFieldsNoBinary);
            public mapStringString: { [k: string]: string };
            public mapStringInt32: { [k: string]: number };
            public mapStringInt64: { [k: string]: (number|Long) };
            public mapStringBool: { [k: string]: boolean };
            public mapStringDouble: { [k: string]: number };
            public mapStringEnum: { [k: string]: jspb.test.MapValueEnumNoBinary };
            public mapStringMsg: { [k: string]: jspb.test.IMapValueMessageNoBinary };
            public mapInt32String: { [k: string]: string };
            public mapInt64String: { [k: string]: string };
            public mapBoolString: { [k: string]: string };
            public testMapFields?: (jspb.test.ITestMapFieldsNoBinary|null);
            public mapStringTestmapfields: { [k: string]: jspb.test.ITestMapFieldsNoBinary };
            public static create(properties?: jspb.test.ITestMapFieldsNoBinary): jspb.test.TestMapFieldsNoBinary;
            public static encode(message: jspb.test.ITestMapFieldsNoBinary, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.ITestMapFieldsNoBinary, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.TestMapFieldsNoBinary;
            public static toObject(message: jspb.test.TestMapFieldsNoBinary, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        enum MapValueEnumNoBinary {
            MAP_VALUE_FOO_NOBINARY = 0,
            MAP_VALUE_BAR_NOBINARY = 1,
            MAP_VALUE_BAZ_NOBINARY = 2
        }

        interface IMapValueMessageNoBinary {
            foo?: (number|null);
        }

        class MapValueMessageNoBinary implements IMapValueMessageNoBinary {
            constructor(properties?: jspb.test.IMapValueMessageNoBinary);
            public foo: number;
            public static create(properties?: jspb.test.IMapValueMessageNoBinary): jspb.test.MapValueMessageNoBinary;
            public static encode(message: jspb.test.IMapValueMessageNoBinary, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IMapValueMessageNoBinary, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            public static toObject(message: jspb.test.MapValueMessageNoBinary, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IDeeply {
        }

        class Deeply implements IDeeply {
            constructor(properties?: jspb.test.IDeeply);
            public static create(properties?: jspb.test.IDeeply): jspb.test.Deeply;
            public static encode(message: jspb.test.IDeeply, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: jspb.test.IDeeply, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): jspb.test.Deeply;
            public static toObject(message: jspb.test.Deeply, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Deeply {

            interface INested {
            }

            class Nested implements INested {
                constructor(properties?: jspb.test.Deeply.INested);
                public static create(properties?: jspb.test.Deeply.INested): jspb.test.Deeply.Nested;
                public static encode(message: jspb.test.Deeply.INested, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: jspb.test.Deeply.INested, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                public static toObject(message: jspb.test.Deeply.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace Nested {

                interface IMessage {
                    count?: (number|null);
                }

                class Message implements IMessage {
                    constructor(properties?: jspb.test.Deeply.Nested.IMessage);
                    public count: number;
                    public static create(properties?: jspb.test.Deeply.Nested.IMessage): jspb.test.Deeply.Nested.Message;
                    public static encode(message: jspb.test.Deeply.Nested.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;
                    public static encodeDelimited(message: jspb.test.Deeply.Nested.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message;
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested.Message;
                    public static verify(message: { [k: string]: any }): (string|null);
                    public static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested.Message;
                    public static toObject(message: jspb.test.Deeply.Nested.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };
                    public toJSON(): { [k: string]: any };
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        interface IFileDescriptorSet {
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        class FileDescriptorSet implements IFileDescriptorSet {
            constructor(properties?: google.protobuf.IFileDescriptorSet);
            public file: google.protobuf.IFileDescriptorProto[];
            public static create(properties?: google.protobuf.IFileDescriptorSet): google.protobuf.FileDescriptorSet;
            public static encode(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        enum Edition {
            EDITION_UNKNOWN = 0,
            EDITION_LEGACY = 900,
            EDITION_PROTO2 = 998,
            EDITION_PROTO3 = 999,
            EDITION_2023 = 1000,
            EDITION_2024 = 1001,
            EDITION_1_TEST_ONLY = 1,
            EDITION_2_TEST_ONLY = 2,
            EDITION_99997_TEST_ONLY = 99997,
            EDITION_99998_TEST_ONLY = 99998,
            EDITION_99999_TEST_ONLY = 99999,
            EDITION_MAX = 2147483647
        }

        interface IFileDescriptorProto {
            name?: (string|null);
            "package"?: (string|null);
            dependency?: (string[]|null);
            publicDependency?: (number[]|null);
            weakDependency?: (number[]|null);
            optionDependency?: (string[]|null);
            messageType?: (google.protobuf.IDescriptorProto[]|null);
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);
            service?: (google.protobuf.IServiceDescriptorProto[]|null);
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);
            options?: (google.protobuf.IFileOptions|null);
            sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);
            syntax?: (string|null);
            edition?: (google.protobuf.Edition|null);
        }

        class FileDescriptorProto implements IFileDescriptorProto {
            constructor(properties?: google.protobuf.IFileDescriptorProto);
            public name: string;
            public package: string;
            public dependency: string[];
            public publicDependency: number[];
            public weakDependency: number[];
            public optionDependency: string[];
            public messageType: google.protobuf.IDescriptorProto[];
            public enumType: google.protobuf.IEnumDescriptorProto[];
            public service: google.protobuf.IServiceDescriptorProto[];
            public extension: google.protobuf.IFieldDescriptorProto[];
            public options?: (google.protobuf.IFileOptions|null);
            public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);
            public syntax: string;
            public edition: google.protobuf.Edition;
            public static create(properties?: google.protobuf.IFileDescriptorProto): google.protobuf.FileDescriptorProto;
            public static encode(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IDescriptorProto {
            name?: (string|null);
            field?: (google.protobuf.IFieldDescriptorProto[]|null);
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);
            nestedType?: (google.protobuf.IDescriptorProto[]|null);
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);
            extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);
            oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);
            options?: (google.protobuf.IMessageOptions|null);
            reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);
            reservedName?: (string[]|null);
            visibility?: (google.protobuf.SymbolVisibility|null);
        }

        class DescriptorProto implements IDescriptorProto {
            constructor(properties?: google.protobuf.IDescriptorProto);
            public name: string;
            public field: google.protobuf.IFieldDescriptorProto[];
            public extension: google.protobuf.IFieldDescriptorProto[];
            public nestedType: google.protobuf.IDescriptorProto[];
            public enumType: google.protobuf.IEnumDescriptorProto[];
            public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];
            public oneofDecl: google.protobuf.IOneofDescriptorProto[];
            public options?: (google.protobuf.IMessageOptions|null);
            public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];
            public reservedName: string[];
            public visibility: google.protobuf.SymbolVisibility;
            public static create(properties?: google.protobuf.IDescriptorProto): google.protobuf.DescriptorProto;
            public static encode(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace DescriptorProto {

            interface IExtensionRange {
                start?: (number|null);
                end?: (number|null);
                options?: (google.protobuf.IExtensionRangeOptions|null);
            }

            class ExtensionRange implements IExtensionRange {
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);
                public start: number;
                public end: number;
                public options?: (google.protobuf.IExtensionRangeOptions|null);
                public static create(properties?: google.protobuf.DescriptorProto.IExtensionRange): google.protobuf.DescriptorProto.ExtensionRange;
                public static encode(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            interface IReservedRange {
                start?: (number|null);
                end?: (number|null);
            }

            class ReservedRange implements IReservedRange {
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);
                public start: number;
                public end: number;
                public static create(properties?: google.protobuf.DescriptorProto.IReservedRange): google.protobuf.DescriptorProto.ReservedRange;
                public static encode(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IExtensionRangeOptions {
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
            declaration?: (google.protobuf.ExtensionRangeOptions.IDeclaration[]|null);
            features?: (google.protobuf.IFeatureSet|null);
            verification?: (google.protobuf.ExtensionRangeOptions.VerificationState|null);
        }

        class ExtensionRangeOptions implements IExtensionRangeOptions {
            constructor(properties?: google.protobuf.IExtensionRangeOptions);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public declaration: google.protobuf.ExtensionRangeOptions.IDeclaration[];
            public features?: (google.protobuf.IFeatureSet|null);
            public verification: google.protobuf.ExtensionRangeOptions.VerificationState;
            public static create(properties?: google.protobuf.IExtensionRangeOptions): google.protobuf.ExtensionRangeOptions;
            public static encode(message: google.protobuf.IExtensionRangeOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IExtensionRangeOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions;
            public static toObject(message: google.protobuf.ExtensionRangeOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace ExtensionRangeOptions {

            interface IDeclaration {
                number?: (number|null);
                fullName?: (string|null);
                type?: (string|null);
                reserved?: (boolean|null);
                repeated?: (boolean|null);
            }

            class Declaration implements IDeclaration {
                constructor(properties?: google.protobuf.ExtensionRangeOptions.IDeclaration);
                public number: number;
                public fullName: string;
                public type: string;
                public reserved: boolean;
                public repeated: boolean;
                public static create(properties?: google.protobuf.ExtensionRangeOptions.IDeclaration): google.protobuf.ExtensionRangeOptions.Declaration;
                public static encode(message: google.protobuf.ExtensionRangeOptions.IDeclaration, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.ExtensionRangeOptions.IDeclaration, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions.Declaration;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions.Declaration;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions.Declaration;
                public static toObject(message: google.protobuf.ExtensionRangeOptions.Declaration, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            enum VerificationState {
                DECLARATION = 0,
                UNVERIFIED = 1
            }
        }

        interface IFieldDescriptorProto {
            name?: (string|null);
            number?: (number|null);
            label?: (google.protobuf.FieldDescriptorProto.Label|null);
            type?: (google.protobuf.FieldDescriptorProto.Type|null);
            typeName?: (string|null);
            extendee?: (string|null);
            defaultValue?: (string|null);
            oneofIndex?: (number|null);
            jsonName?: (string|null);
            options?: (google.protobuf.IFieldOptions|null);
            proto3Optional?: (boolean|null);
        }

        class FieldDescriptorProto implements IFieldDescriptorProto {
            constructor(properties?: google.protobuf.IFieldDescriptorProto);
            public name: string;
            public number: number;
            public label: google.protobuf.FieldDescriptorProto.Label;
            public type: google.protobuf.FieldDescriptorProto.Type;
            public typeName: string;
            public extendee: string;
            public defaultValue: string;
            public oneofIndex: number;
            public jsonName: string;
            public options?: (google.protobuf.IFieldOptions|null);
            public proto3Optional: boolean;
            public static create(properties?: google.protobuf.IFieldDescriptorProto): google.protobuf.FieldDescriptorProto;
            public static encode(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
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
                LABEL_REPEATED = 3,
                LABEL_REQUIRED = 2
            }
        }

        interface IOneofDescriptorProto {
            name?: (string|null);
            options?: (google.protobuf.IOneofOptions|null);
        }

        class OneofDescriptorProto implements IOneofDescriptorProto {
            constructor(properties?: google.protobuf.IOneofDescriptorProto);
            public name: string;
            public options?: (google.protobuf.IOneofOptions|null);
            public static create(properties?: google.protobuf.IOneofDescriptorProto): google.protobuf.OneofDescriptorProto;
            public static encode(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IEnumDescriptorProto {
            name?: (string|null);
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);
            options?: (google.protobuf.IEnumOptions|null);
            reservedRange?: (google.protobuf.EnumDescriptorProto.IEnumReservedRange[]|null);
            reservedName?: (string[]|null);
            visibility?: (google.protobuf.SymbolVisibility|null);
        }

        class EnumDescriptorProto implements IEnumDescriptorProto {
            constructor(properties?: google.protobuf.IEnumDescriptorProto);
            public name: string;
            public value: google.protobuf.IEnumValueDescriptorProto[];
            public options?: (google.protobuf.IEnumOptions|null);
            public reservedRange: google.protobuf.EnumDescriptorProto.IEnumReservedRange[];
            public reservedName: string[];
            public visibility: google.protobuf.SymbolVisibility;
            public static create(properties?: google.protobuf.IEnumDescriptorProto): google.protobuf.EnumDescriptorProto;
            public static encode(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace EnumDescriptorProto {

            interface IEnumReservedRange {
                start?: (number|null);
                end?: (number|null);
            }

            class EnumReservedRange implements IEnumReservedRange {
                constructor(properties?: google.protobuf.EnumDescriptorProto.IEnumReservedRange);
                public start: number;
                public end: number;
                public static create(properties?: google.protobuf.EnumDescriptorProto.IEnumReservedRange): google.protobuf.EnumDescriptorProto.EnumReservedRange;
                public static encode(message: google.protobuf.EnumDescriptorProto.IEnumReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.EnumDescriptorProto.IEnumReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto.EnumReservedRange;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto.EnumReservedRange;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto.EnumReservedRange;
                public static toObject(message: google.protobuf.EnumDescriptorProto.EnumReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IEnumValueDescriptorProto {
            name?: (string|null);
            number?: (number|null);
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);
            public name: string;
            public number: number;
            public options?: (google.protobuf.IEnumValueOptions|null);
            public static create(properties?: google.protobuf.IEnumValueDescriptorProto): google.protobuf.EnumValueDescriptorProto;
            public static encode(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IServiceDescriptorProto {
            name?: (string|null);
            method?: (google.protobuf.IMethodDescriptorProto[]|null);
            options?: (google.protobuf.IServiceOptions|null);
        }

        class ServiceDescriptorProto implements IServiceDescriptorProto {
            constructor(properties?: google.protobuf.IServiceDescriptorProto);
            public name: string;
            public method: google.protobuf.IMethodDescriptorProto[];
            public options?: (google.protobuf.IServiceOptions|null);
            public static create(properties?: google.protobuf.IServiceDescriptorProto): google.protobuf.ServiceDescriptorProto;
            public static encode(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IMethodDescriptorProto {
            name?: (string|null);
            inputType?: (string|null);
            outputType?: (string|null);
            options?: (google.protobuf.IMethodOptions|null);
            clientStreaming?: (boolean|null);
            serverStreaming?: (boolean|null);
        }

        class MethodDescriptorProto implements IMethodDescriptorProto {
            constructor(properties?: google.protobuf.IMethodDescriptorProto);
            public name: string;
            public inputType: string;
            public outputType: string;
            public options?: (google.protobuf.IMethodOptions|null);
            public clientStreaming: boolean;
            public serverStreaming: boolean;
            public static create(properties?: google.protobuf.IMethodDescriptorProto): google.protobuf.MethodDescriptorProto;
            public static encode(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IFileOptions {
            javaPackage?: (string|null);
            javaOuterClassname?: (string|null);
            javaMultipleFiles?: (boolean|null);
            javaGenerateEqualsAndHash?: (boolean|null);
            javaStringCheckUtf8?: (boolean|null);
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|null);
            goPackage?: (string|null);
            ccGenericServices?: (boolean|null);
            javaGenericServices?: (boolean|null);
            pyGenericServices?: (boolean|null);
            deprecated?: (boolean|null);
            ccEnableArenas?: (boolean|null);
            objcClassPrefix?: (string|null);
            csharpNamespace?: (string|null);
            swiftPrefix?: (string|null);
            phpClassPrefix?: (string|null);
            phpNamespace?: (string|null);
            phpMetadataNamespace?: (string|null);
            rubyPackage?: (string|null);
            features?: (google.protobuf.IFeatureSet|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class FileOptions implements IFileOptions {
            constructor(properties?: google.protobuf.IFileOptions);
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
            public swiftPrefix: string;
            public phpClassPrefix: string;
            public phpNamespace: string;
            public phpMetadataNamespace: string;
            public rubyPackage: string;
            public features?: (google.protobuf.IFeatureSet|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IFileOptions): google.protobuf.FileOptions;
            public static encode(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace FileOptions {

            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        interface IMessageOptions {
            messageSetWireFormat?: (boolean|null);
            noStandardDescriptorAccessor?: (boolean|null);
            deprecated?: (boolean|null);
            mapEntry?: (boolean|null);
            deprecatedLegacyJsonFieldConflicts?: (boolean|null);
            features?: (google.protobuf.IFeatureSet|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class MessageOptions implements IMessageOptions {
            constructor(properties?: google.protobuf.IMessageOptions);
            public messageSetWireFormat: boolean;
            public noStandardDescriptorAccessor: boolean;
            public deprecated: boolean;
            public mapEntry: boolean;
            public deprecatedLegacyJsonFieldConflicts: boolean;
            public features?: (google.protobuf.IFeatureSet|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IMessageOptions): google.protobuf.MessageOptions;
            public static encode(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IFieldOptions {
            ctype?: (google.protobuf.FieldOptions.CType|null);
            packed?: (boolean|null);
            jstype?: (google.protobuf.FieldOptions.JSType|null);
            lazy?: (boolean|null);
            unverifiedLazy?: (boolean|null);
            deprecated?: (boolean|null);
            weak?: (boolean|null);
            debugRedact?: (boolean|null);
            retention?: (google.protobuf.FieldOptions.OptionRetention|null);
            targets?: (google.protobuf.FieldOptions.OptionTargetType[]|null);
            editionDefaults?: (google.protobuf.FieldOptions.IEditionDefault[]|null);
            features?: (google.protobuf.IFeatureSet|null);
            featureSupport?: (google.protobuf.FieldOptions.IFeatureSupport|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class FieldOptions implements IFieldOptions {
            constructor(properties?: google.protobuf.IFieldOptions);
            public ctype: google.protobuf.FieldOptions.CType;
            public packed: boolean;
            public jstype: google.protobuf.FieldOptions.JSType;
            public lazy: boolean;
            public unverifiedLazy: boolean;
            public deprecated: boolean;
            public weak: boolean;
            public debugRedact: boolean;
            public retention: google.protobuf.FieldOptions.OptionRetention;
            public targets: google.protobuf.FieldOptions.OptionTargetType[];
            public editionDefaults: google.protobuf.FieldOptions.IEditionDefault[];
            public features?: (google.protobuf.IFeatureSet|null);
            public featureSupport?: (google.protobuf.FieldOptions.IFeatureSupport|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IFieldOptions): google.protobuf.FieldOptions;
            public static encode(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            enum OptionRetention {
                RETENTION_UNKNOWN = 0,
                RETENTION_RUNTIME = 1,
                RETENTION_SOURCE = 2
            }

            enum OptionTargetType {
                TARGET_TYPE_UNKNOWN = 0,
                TARGET_TYPE_FILE = 1,
                TARGET_TYPE_EXTENSION_RANGE = 2,
                TARGET_TYPE_MESSAGE = 3,
                TARGET_TYPE_FIELD = 4,
                TARGET_TYPE_ONEOF = 5,
                TARGET_TYPE_ENUM = 6,
                TARGET_TYPE_ENUM_ENTRY = 7,
                TARGET_TYPE_SERVICE = 8,
                TARGET_TYPE_METHOD = 9
            }

            interface IEditionDefault {
                edition?: (google.protobuf.Edition|null);
                value?: (string|null);
            }

            class EditionDefault implements IEditionDefault {
                constructor(properties?: google.protobuf.FieldOptions.IEditionDefault);
                public edition: google.protobuf.Edition;
                public value: string;
                public static create(properties?: google.protobuf.FieldOptions.IEditionDefault): google.protobuf.FieldOptions.EditionDefault;
                public static encode(message: google.protobuf.FieldOptions.IEditionDefault, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.FieldOptions.IEditionDefault, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions.EditionDefault;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions.EditionDefault;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions.EditionDefault;
                public static toObject(message: google.protobuf.FieldOptions.EditionDefault, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            interface IFeatureSupport {
                editionIntroduced?: (google.protobuf.Edition|null);
                editionDeprecated?: (google.protobuf.Edition|null);
                deprecationWarning?: (string|null);
                editionRemoved?: (google.protobuf.Edition|null);
            }

            class FeatureSupport implements IFeatureSupport {
                constructor(properties?: google.protobuf.FieldOptions.IFeatureSupport);
                public editionIntroduced: google.protobuf.Edition;
                public editionDeprecated: google.protobuf.Edition;
                public deprecationWarning: string;
                public editionRemoved: google.protobuf.Edition;
                public static create(properties?: google.protobuf.FieldOptions.IFeatureSupport): google.protobuf.FieldOptions.FeatureSupport;
                public static encode(message: google.protobuf.FieldOptions.IFeatureSupport, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.FieldOptions.IFeatureSupport, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions.FeatureSupport;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions.FeatureSupport;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions.FeatureSupport;
                public static toObject(message: google.protobuf.FieldOptions.FeatureSupport, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IOneofOptions {
            features?: (google.protobuf.IFeatureSet|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class OneofOptions implements IOneofOptions {
            constructor(properties?: google.protobuf.IOneofOptions);
            public features?: (google.protobuf.IFeatureSet|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IOneofOptions): google.protobuf.OneofOptions;
            public static encode(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IEnumOptions {
            allowAlias?: (boolean|null);
            deprecated?: (boolean|null);
            deprecatedLegacyJsonFieldConflicts?: (boolean|null);
            features?: (google.protobuf.IFeatureSet|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
            ".jspb.test.IsExtension.simpleOption"?: (string|null);
        }

        class EnumOptions implements IEnumOptions {
            constructor(properties?: google.protobuf.IEnumOptions);
            public ".jspb.test.IsExtension.simpleOption": string;
            public allowAlias: boolean;
            public deprecated: boolean;
            public deprecatedLegacyJsonFieldConflicts: boolean;
            public features?: (google.protobuf.IFeatureSet|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IEnumOptions): google.protobuf.EnumOptions;
            public static encode(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IEnumValueOptions {
            deprecated?: (boolean|null);
            features?: (google.protobuf.IFeatureSet|null);
            debugRedact?: (boolean|null);
            featureSupport?: (google.protobuf.FieldOptions.IFeatureSupport|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class EnumValueOptions implements IEnumValueOptions {
            constructor(properties?: google.protobuf.IEnumValueOptions);
            public deprecated: boolean;
            public features?: (google.protobuf.IFeatureSet|null);
            public debugRedact: boolean;
            public featureSupport?: (google.protobuf.FieldOptions.IFeatureSupport|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IEnumValueOptions): google.protobuf.EnumValueOptions;
            public static encode(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IServiceOptions {
            features?: (google.protobuf.IFeatureSet|null);
            deprecated?: (boolean|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class ServiceOptions implements IServiceOptions {
            constructor(properties?: google.protobuf.IServiceOptions);
            public features?: (google.protobuf.IFeatureSet|null);
            public deprecated: boolean;
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IServiceOptions): google.protobuf.ServiceOptions;
            public static encode(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        interface IMethodOptions {
            deprecated?: (boolean|null);
            idempotencyLevel?: (google.protobuf.MethodOptions.IdempotencyLevel|null);
            features?: (google.protobuf.IFeatureSet|null);
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        class MethodOptions implements IMethodOptions {
            constructor(properties?: google.protobuf.IMethodOptions);
            public deprecated: boolean;
            public idempotencyLevel: google.protobuf.MethodOptions.IdempotencyLevel;
            public features?: (google.protobuf.IFeatureSet|null);
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            public static create(properties?: google.protobuf.IMethodOptions): google.protobuf.MethodOptions;
            public static encode(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace MethodOptions {

            enum IdempotencyLevel {
                IDEMPOTENCY_UNKNOWN = 0,
                NO_SIDE_EFFECTS = 1,
                IDEMPOTENT = 2
            }
        }

        interface IUninterpretedOption {
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);
            identifierValue?: (string|null);
            positiveIntValue?: (number|Long|null);
            negativeIntValue?: (number|Long|null);
            doubleValue?: (number|null);
            stringValue?: (Uint8Array|null);
            aggregateValue?: (string|null);
        }

        class UninterpretedOption implements IUninterpretedOption {
            constructor(properties?: google.protobuf.IUninterpretedOption);
            public name: google.protobuf.UninterpretedOption.INamePart[];
            public identifierValue: string;
            public positiveIntValue: (number|Long);
            public negativeIntValue: (number|Long);
            public doubleValue: number;
            public stringValue: Uint8Array;
            public aggregateValue: string;
            public static create(properties?: google.protobuf.IUninterpretedOption): google.protobuf.UninterpretedOption;
            public static encode(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace UninterpretedOption {

            interface INamePart {
                namePart: string;
                isExtension: boolean;
            }

            class NamePart implements INamePart {
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);
                public namePart: string;
                public isExtension: boolean;
                public static create(properties?: google.protobuf.UninterpretedOption.INamePart): google.protobuf.UninterpretedOption.NamePart;
                public static encode(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IFeatureSet {
            fieldPresence?: (google.protobuf.FeatureSet.FieldPresence|null);
            enumType?: (google.protobuf.FeatureSet.EnumType|null);
            repeatedFieldEncoding?: (google.protobuf.FeatureSet.RepeatedFieldEncoding|null);
            utf8Validation?: (google.protobuf.FeatureSet.Utf8Validation|null);
            messageEncoding?: (google.protobuf.FeatureSet.MessageEncoding|null);
            jsonFormat?: (google.protobuf.FeatureSet.JsonFormat|null);
            enforceNamingStyle?: (google.protobuf.FeatureSet.EnforceNamingStyle|null);
            defaultSymbolVisibility?: (google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility|null);
        }

        class FeatureSet implements IFeatureSet {
            constructor(properties?: google.protobuf.IFeatureSet);
            public fieldPresence: google.protobuf.FeatureSet.FieldPresence;
            public enumType: google.protobuf.FeatureSet.EnumType;
            public repeatedFieldEncoding: google.protobuf.FeatureSet.RepeatedFieldEncoding;
            public utf8Validation: google.protobuf.FeatureSet.Utf8Validation;
            public messageEncoding: google.protobuf.FeatureSet.MessageEncoding;
            public jsonFormat: google.protobuf.FeatureSet.JsonFormat;
            public enforceNamingStyle: google.protobuf.FeatureSet.EnforceNamingStyle;
            public defaultSymbolVisibility: google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility;
            public static create(properties?: google.protobuf.IFeatureSet): google.protobuf.FeatureSet;
            public static encode(message: google.protobuf.IFeatureSet, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFeatureSet, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSet;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSet;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSet;
            public static toObject(message: google.protobuf.FeatureSet, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace FeatureSet {

            enum FieldPresence {
                FIELD_PRESENCE_UNKNOWN = 0,
                EXPLICIT = 1,
                IMPLICIT = 2,
                LEGACY_REQUIRED = 3
            }

            enum EnumType {
                ENUM_TYPE_UNKNOWN = 0,
                OPEN = 1,
                CLOSED = 2
            }

            enum RepeatedFieldEncoding {
                REPEATED_FIELD_ENCODING_UNKNOWN = 0,
                PACKED = 1,
                EXPANDED = 2
            }

            enum Utf8Validation {
                UTF8_VALIDATION_UNKNOWN = 0,
                VERIFY = 2,
                NONE = 3
            }

            enum MessageEncoding {
                MESSAGE_ENCODING_UNKNOWN = 0,
                LENGTH_PREFIXED = 1,
                DELIMITED = 2
            }

            enum JsonFormat {
                JSON_FORMAT_UNKNOWN = 0,
                ALLOW = 1,
                LEGACY_BEST_EFFORT = 2
            }

            enum EnforceNamingStyle {
                ENFORCE_NAMING_STYLE_UNKNOWN = 0,
                STYLE2024 = 1,
                STYLE_LEGACY = 2
            }

            interface IVisibilityFeature {
            }

            class VisibilityFeature implements IVisibilityFeature {
                constructor(properties?: google.protobuf.FeatureSet.IVisibilityFeature);
                public static create(properties?: google.protobuf.FeatureSet.IVisibilityFeature): google.protobuf.FeatureSet.VisibilityFeature;
                public static encode(message: google.protobuf.FeatureSet.IVisibilityFeature, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.FeatureSet.IVisibilityFeature, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSet.VisibilityFeature;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSet.VisibilityFeature;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSet.VisibilityFeature;
                public static toObject(message: google.protobuf.FeatureSet.VisibilityFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace VisibilityFeature {

                enum DefaultSymbolVisibility {
                    DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0,
                    EXPORT_ALL = 1,
                    EXPORT_TOP_LEVEL = 2,
                    LOCAL_ALL = 3,
                    STRICT = 4
                }
            }
        }

        interface IFeatureSetDefaults {
            defaults?: (google.protobuf.FeatureSetDefaults.IFeatureSetEditionDefault[]|null);
            minimumEdition?: (google.protobuf.Edition|null);
            maximumEdition?: (google.protobuf.Edition|null);
        }

        class FeatureSetDefaults implements IFeatureSetDefaults {
            constructor(properties?: google.protobuf.IFeatureSetDefaults);
            public defaults: google.protobuf.FeatureSetDefaults.IFeatureSetEditionDefault[];
            public minimumEdition: google.protobuf.Edition;
            public maximumEdition: google.protobuf.Edition;
            public static create(properties?: google.protobuf.IFeatureSetDefaults): google.protobuf.FeatureSetDefaults;
            public static encode(message: google.protobuf.IFeatureSetDefaults, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IFeatureSetDefaults, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSetDefaults;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSetDefaults;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSetDefaults;
            public static toObject(message: google.protobuf.FeatureSetDefaults, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace FeatureSetDefaults {

            interface IFeatureSetEditionDefault {
                edition?: (google.protobuf.Edition|null);
                overridableFeatures?: (google.protobuf.IFeatureSet|null);
                fixedFeatures?: (google.protobuf.IFeatureSet|null);
            }

            class FeatureSetEditionDefault implements IFeatureSetEditionDefault {
                constructor(properties?: google.protobuf.FeatureSetDefaults.IFeatureSetEditionDefault);
                public edition: google.protobuf.Edition;
                public overridableFeatures?: (google.protobuf.IFeatureSet|null);
                public fixedFeatures?: (google.protobuf.IFeatureSet|null);
                public static create(properties?: google.protobuf.FeatureSetDefaults.IFeatureSetEditionDefault): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault;
                public static encode(message: google.protobuf.FeatureSetDefaults.IFeatureSetEditionDefault, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.FeatureSetDefaults.IFeatureSetEditionDefault, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault;
                public static toObject(message: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface ISourceCodeInfo {
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        class SourceCodeInfo implements ISourceCodeInfo {
            constructor(properties?: google.protobuf.ISourceCodeInfo);
            public location: google.protobuf.SourceCodeInfo.ILocation[];
            public static create(properties?: google.protobuf.ISourceCodeInfo): google.protobuf.SourceCodeInfo;
            public static encode(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace SourceCodeInfo {

            interface ILocation {
                path?: (number[]|null);
                span?: (number[]|null);
                leadingComments?: (string|null);
                trailingComments?: (string|null);
                leadingDetachedComments?: (string[]|null);
            }

            class Location implements ILocation {
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);
                public path: number[];
                public span: number[];
                public leadingComments: string;
                public trailingComments: string;
                public leadingDetachedComments: string[];
                public static create(properties?: google.protobuf.SourceCodeInfo.ILocation): google.protobuf.SourceCodeInfo.Location;
                public static encode(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        interface IGeneratedCodeInfo {
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        class GeneratedCodeInfo implements IGeneratedCodeInfo {
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];
            public static create(properties?: google.protobuf.IGeneratedCodeInfo): google.protobuf.GeneratedCodeInfo;
            public static encode(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace GeneratedCodeInfo {

            interface IAnnotation {
                path?: (number[]|null);
                sourceFile?: (string|null);
                begin?: (number|null);
                end?: (number|null);
                semantic?: (google.protobuf.GeneratedCodeInfo.Annotation.Semantic|null);
            }

            class Annotation implements IAnnotation {
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);
                public path: number[];
                public sourceFile: string;
                public begin: number;
                public end: number;
                public semantic: google.protobuf.GeneratedCodeInfo.Annotation.Semantic;
                public static create(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation): google.protobuf.GeneratedCodeInfo.Annotation;
                public static encode(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace Annotation {

                enum Semantic {
                    NONE = 0,
                    SET = 1,
                    ALIAS = 2
                }
            }
        }

        enum SymbolVisibility {
            VISIBILITY_UNSET = 0,
            VISIBILITY_LOCAL = 1,
            VISIBILITY_EXPORT = 2
        }
    }
}
