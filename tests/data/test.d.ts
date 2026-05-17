import * as $protobuf from "../..";

export namespace jspb {

    namespace test {

        interface IEmpty extends jspb.test.Empty.$Properties {
        }

        class Empty {
            constructor(properties?: jspb.test.Empty.$Properties);
            $unknowns?: Uint8Array[];
            static create(properties: jspb.test.Empty.$Shape): jspb.test.Empty & jspb.test.Empty.$Shape;
            static create(properties?: jspb.test.Empty.$Properties): jspb.test.Empty;
            static encode(message: jspb.test.Empty.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.Empty.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Empty & jspb.test.Empty.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Empty & jspb.test.Empty.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.Empty;
            static toObject(message: jspb.test.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Empty {
            interface $Properties {
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.Empty.$Properties;
        }

        enum OuterEnum {
            FOO = 1,
            BAR = 2
        }

        interface IEnumContainer extends jspb.test.EnumContainer.$Properties {
        }

        class EnumContainer {
            constructor(properties?: jspb.test.EnumContainer.$Properties);
            $unknowns?: Uint8Array[];
            outerEnum: jspb.test.OuterEnum;
            static create(properties: jspb.test.EnumContainer.$Shape): jspb.test.EnumContainer & jspb.test.EnumContainer.$Shape;
            static create(properties?: jspb.test.EnumContainer.$Properties): jspb.test.EnumContainer;
            static encode(message: jspb.test.EnumContainer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.EnumContainer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.EnumContainer & jspb.test.EnumContainer.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.EnumContainer & jspb.test.EnumContainer.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.EnumContainer;
            static toObject(message: jspb.test.EnumContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EnumContainer {
            interface $Properties {
                outerEnum?: (jspb.test.OuterEnum|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.EnumContainer.$Properties;
        }

        interface ISimple1 extends jspb.test.Simple1.$Properties {
        }

        class Simple1 {
            constructor(properties?: jspb.test.Simple1.$Properties);
            $unknowns?: Uint8Array[];
            aString: string;
            aRepeatedString: string[];
            aBoolean: boolean;
            static create(properties: jspb.test.Simple1.$Shape): jspb.test.Simple1 & jspb.test.Simple1.$Shape;
            static create(properties?: jspb.test.Simple1.$Properties): jspb.test.Simple1;
            static encode(message: jspb.test.Simple1.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.Simple1.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple1 & jspb.test.Simple1.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple1 & jspb.test.Simple1.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.Simple1;
            static toObject(message: jspb.test.Simple1, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Simple1 {
            interface $Properties {
                aString: string;
                aRepeatedString?: (string[]|null);
                aBoolean?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.Simple1.$Properties;
        }

        interface ISimple2 extends jspb.test.Simple2.$Properties {
        }

        class Simple2 {
            constructor(properties?: jspb.test.Simple2.$Properties);
            $unknowns?: Uint8Array[];
            aString: string;
            aRepeatedString: string[];
            static create(properties: jspb.test.Simple2.$Shape): jspb.test.Simple2 & jspb.test.Simple2.$Shape;
            static create(properties?: jspb.test.Simple2.$Properties): jspb.test.Simple2;
            static encode(message: jspb.test.Simple2.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.Simple2.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple2 & jspb.test.Simple2.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Simple2 & jspb.test.Simple2.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.Simple2;
            static toObject(message: jspb.test.Simple2, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Simple2 {
            interface $Properties {
                aString: string;
                aRepeatedString?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.Simple2.$Properties;
        }

        interface ISpecialCases extends jspb.test.SpecialCases.$Properties {
        }

        class SpecialCases {
            constructor(properties?: jspb.test.SpecialCases.$Properties);
            $unknowns?: Uint8Array[];
            normal: string;
            default: string;
            function: string;
            var: string;
            static create(properties: jspb.test.SpecialCases.$Shape): jspb.test.SpecialCases & jspb.test.SpecialCases.$Shape;
            static create(properties?: jspb.test.SpecialCases.$Properties): jspb.test.SpecialCases;
            static encode(message: jspb.test.SpecialCases.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.SpecialCases.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.SpecialCases & jspb.test.SpecialCases.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.SpecialCases & jspb.test.SpecialCases.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.SpecialCases;
            static toObject(message: jspb.test.SpecialCases, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SpecialCases {
            interface $Properties {
                normal: string;
                "default": string;
                "function": string;
                "var": string;
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.SpecialCases.$Properties;
        }

        interface IOptionalFields extends jspb.test.OptionalFields.$Properties {
        }

        class OptionalFields {
            constructor(properties?: jspb.test.OptionalFields.$Properties);
            $unknowns?: Uint8Array[];
            aString: string;
            aBool: boolean;
            aNestedMessage?: (jspb.test.OptionalFields.Nested.$Properties|null);
            aRepeatedMessage: jspb.test.OptionalFields.Nested.$Properties[];
            aRepeatedString: string[];
            static create(properties: jspb.test.OptionalFields.$Shape): jspb.test.OptionalFields & jspb.test.OptionalFields.$Shape;
            static create(properties?: jspb.test.OptionalFields.$Properties): jspb.test.OptionalFields;
            static encode(message: jspb.test.OptionalFields.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.OptionalFields.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields & jspb.test.OptionalFields.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields & jspb.test.OptionalFields.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields;
            static toObject(message: jspb.test.OptionalFields, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace OptionalFields {
            interface $Properties {
                aString?: (string|null);
                aBool: boolean;
                aNestedMessage?: (jspb.test.OptionalFields.Nested.$Properties|null);
                aRepeatedMessage?: (jspb.test.OptionalFields.Nested.$Properties[]|null);
                aRepeatedString?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.OptionalFields.$Properties;

            interface INested extends jspb.test.OptionalFields.Nested.$Properties {
            }

            class Nested {
                constructor(properties?: jspb.test.OptionalFields.Nested.$Properties);
                $unknowns?: Uint8Array[];
                anInt: number;
                static create(properties: jspb.test.OptionalFields.Nested.$Shape): jspb.test.OptionalFields.Nested & jspb.test.OptionalFields.Nested.$Shape;
                static create(properties?: jspb.test.OptionalFields.Nested.$Properties): jspb.test.OptionalFields.Nested;
                static encode(message: jspb.test.OptionalFields.Nested.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.OptionalFields.Nested.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested & jspb.test.OptionalFields.Nested.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields.Nested & jspb.test.OptionalFields.Nested.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.OptionalFields.Nested;
                static toObject(message: jspb.test.OptionalFields.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Nested {
                interface $Properties {
                    anInt?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.OptionalFields.Nested.$Properties;
            }
        }

        interface IHasExtensions extends jspb.test.HasExtensions.$Properties {
        }

        class HasExtensions {
            constructor(properties?: jspb.test.HasExtensions.$Properties);
            ".jspb.test.IsExtension.extField"?: (jspb.test.IsExtension.$Properties|null);
            ".jspb.test.IndirectExtension.simple"?: (jspb.test.Simple1.$Properties|null);
            ".jspb.test.IndirectExtension.str": string;
            ".jspb.test.IndirectExtension.repeatedStr": string[];
            ".jspb.test.IndirectExtension.repeatedSimple": jspb.test.Simple1.$Properties[];
            ".jspb.test.simple1"?: (jspb.test.Simple1.$Properties|null);
            $unknowns?: Uint8Array[];
            str1: string;
            str2: string;
            str3: string;
            static create(properties: jspb.test.HasExtensions.$Shape): jspb.test.HasExtensions & jspb.test.HasExtensions.$Shape;
            static create(properties?: jspb.test.HasExtensions.$Properties): jspb.test.HasExtensions;
            static encode(message: jspb.test.HasExtensions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.HasExtensions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.HasExtensions & jspb.test.HasExtensions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.HasExtensions & jspb.test.HasExtensions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.HasExtensions;
            static toObject(message: jspb.test.HasExtensions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HasExtensions {
            interface $Properties {
                str1?: (string|null);
                str2?: (string|null);
                str3?: (string|null);
                ".jspb.test.IsExtension.extField"?: (jspb.test.IsExtension.$Properties|null);
                ".jspb.test.IndirectExtension.simple"?: (jspb.test.Simple1.$Properties|null);
                ".jspb.test.IndirectExtension.str"?: (string|null);
                ".jspb.test.IndirectExtension.repeatedStr"?: (string[]|null);
                ".jspb.test.IndirectExtension.repeatedSimple"?: (jspb.test.Simple1.$Properties[]|null);
                ".jspb.test.simple1"?: (jspb.test.Simple1.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.HasExtensions.$Properties;
        }

        interface IComplex extends jspb.test.Complex.$Properties {
        }

        class Complex {
            constructor(properties?: jspb.test.Complex.$Properties);
            $unknowns?: Uint8Array[];
            aString: string;
            anOutOfOrderBool: boolean;
            aNestedMessage?: (jspb.test.Complex.Nested.$Properties|null);
            aRepeatedMessage: jspb.test.Complex.Nested.$Properties[];
            aRepeatedString: string[];
            static create(properties: jspb.test.Complex.$Shape): jspb.test.Complex & jspb.test.Complex.$Shape;
            static create(properties?: jspb.test.Complex.$Properties): jspb.test.Complex;
            static encode(message: jspb.test.Complex.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.Complex.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex & jspb.test.Complex.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex & jspb.test.Complex.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.Complex;
            static toObject(message: jspb.test.Complex, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Complex {
            interface $Properties {
                aString: string;
                anOutOfOrderBool: boolean;
                aNestedMessage?: (jspb.test.Complex.Nested.$Properties|null);
                aRepeatedMessage?: (jspb.test.Complex.Nested.$Properties[]|null);
                aRepeatedString?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.Complex.$Properties;

            interface INested extends jspb.test.Complex.Nested.$Properties {
            }

            class Nested {
                constructor(properties?: jspb.test.Complex.Nested.$Properties);
                $unknowns?: Uint8Array[];
                anInt: number;
                static create(properties: jspb.test.Complex.Nested.$Shape): jspb.test.Complex.Nested & jspb.test.Complex.Nested.$Shape;
                static create(properties?: jspb.test.Complex.Nested.$Properties): jspb.test.Complex.Nested;
                static encode(message: jspb.test.Complex.Nested.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.Complex.Nested.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex.Nested & jspb.test.Complex.Nested.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Complex.Nested & jspb.test.Complex.Nested.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.Complex.Nested;
                static toObject(message: jspb.test.Complex.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Nested {
                interface $Properties {
                    anInt: number;
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.Complex.Nested.$Properties;
            }
        }

        interface IOuterMessage extends jspb.test.OuterMessage.$Properties {
        }

        class OuterMessage {
            constructor(properties?: jspb.test.OuterMessage.$Properties);
            $unknowns?: Uint8Array[];
            static create(properties: jspb.test.OuterMessage.$Shape): jspb.test.OuterMessage & jspb.test.OuterMessage.$Shape;
            static create(properties?: jspb.test.OuterMessage.$Properties): jspb.test.OuterMessage;
            static encode(message: jspb.test.OuterMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.OuterMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage & jspb.test.OuterMessage.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage & jspb.test.OuterMessage.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage;
            static toObject(message: jspb.test.OuterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace OuterMessage {
            interface $Properties {
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.OuterMessage.$Properties;

            interface IComplex extends jspb.test.OuterMessage.Complex.$Properties {
            }

            class Complex {
                constructor(properties?: jspb.test.OuterMessage.Complex.$Properties);
                $unknowns?: Uint8Array[];
                innerComplexField: number;
                static create(properties: jspb.test.OuterMessage.Complex.$Shape): jspb.test.OuterMessage.Complex & jspb.test.OuterMessage.Complex.$Shape;
                static create(properties?: jspb.test.OuterMessage.Complex.$Properties): jspb.test.OuterMessage.Complex;
                static encode(message: jspb.test.OuterMessage.Complex.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.OuterMessage.Complex.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex & jspb.test.OuterMessage.Complex.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage.Complex & jspb.test.OuterMessage.Complex.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.OuterMessage.Complex;
                static toObject(message: jspb.test.OuterMessage.Complex, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Complex {
                interface $Properties {
                    innerComplexField?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.OuterMessage.Complex.$Properties;
            }
        }

        interface IIsExtension extends jspb.test.IsExtension.$Properties {
        }

        class IsExtension {
            constructor(properties?: jspb.test.IsExtension.$Properties);
            $unknowns?: Uint8Array[];
            ext1: string;
            static create(properties: jspb.test.IsExtension.$Shape): jspb.test.IsExtension & jspb.test.IsExtension.$Shape;
            static create(properties?: jspb.test.IsExtension.$Properties): jspb.test.IsExtension;
            static encode(message: jspb.test.IsExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.IsExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IsExtension & jspb.test.IsExtension.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IsExtension & jspb.test.IsExtension.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.IsExtension;
            static toObject(message: jspb.test.IsExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace IsExtension {
            interface $Properties {
                ext1?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.IsExtension.$Properties;
        }

        interface IIndirectExtension extends jspb.test.IndirectExtension.$Properties {
        }

        class IndirectExtension {
            constructor(properties?: jspb.test.IndirectExtension.$Properties);
            $unknowns?: Uint8Array[];
            static create(properties: jspb.test.IndirectExtension.$Shape): jspb.test.IndirectExtension & jspb.test.IndirectExtension.$Shape;
            static create(properties?: jspb.test.IndirectExtension.$Properties): jspb.test.IndirectExtension;
            static encode(message: jspb.test.IndirectExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.IndirectExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IndirectExtension & jspb.test.IndirectExtension.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.IndirectExtension & jspb.test.IndirectExtension.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.IndirectExtension;
            static toObject(message: jspb.test.IndirectExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace IndirectExtension {
            interface $Properties {
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.IndirectExtension.$Properties;
        }

        interface IDefaultValues extends jspb.test.DefaultValues.$Properties {
        }

        class DefaultValues {
            constructor(properties?: jspb.test.DefaultValues.$Properties);
            $unknowns?: Uint8Array[];
            stringField: string;
            boolField: boolean;
            intField: (number|bigint);
            enumField: jspb.test.DefaultValues.Enum;
            emptyField: string;
            bytesField: Uint8Array;
            static create(properties: jspb.test.DefaultValues.$Shape): jspb.test.DefaultValues & jspb.test.DefaultValues.$Shape;
            static create(properties?: jspb.test.DefaultValues.$Properties): jspb.test.DefaultValues;
            static encode(message: jspb.test.DefaultValues.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.DefaultValues.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.DefaultValues & jspb.test.DefaultValues.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.DefaultValues & jspb.test.DefaultValues.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.DefaultValues;
            static toObject(message: jspb.test.DefaultValues, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DefaultValues {
            interface $Properties {
                stringField?: (string|null);
                boolField?: (boolean|null);
                intField?: (number|bigint|null);
                enumField?: (jspb.test.DefaultValues.Enum|null);
                emptyField?: (string|null);
                bytesField?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.DefaultValues.$Properties;

            enum Enum {
                E1 = 13,
                E2 = 77
            }
        }

        interface IFloatingPointFields extends jspb.test.FloatingPointFields.$Properties {
        }

        class FloatingPointFields {
            constructor(properties?: jspb.test.FloatingPointFields.$Properties);
            $unknowns?: Uint8Array[];
            optionalFloatField: number;
            requiredFloatField: number;
            repeatedFloatField: number[];
            defaultFloatField: number;
            optionalDoubleField: number;
            requiredDoubleField: number;
            repeatedDoubleField: number[];
            defaultDoubleField: number;
            static create(properties: jspb.test.FloatingPointFields.$Shape): jspb.test.FloatingPointFields & jspb.test.FloatingPointFields.$Shape;
            static create(properties?: jspb.test.FloatingPointFields.$Properties): jspb.test.FloatingPointFields;
            static encode(message: jspb.test.FloatingPointFields.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.FloatingPointFields.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields & jspb.test.FloatingPointFields.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.FloatingPointFields & jspb.test.FloatingPointFields.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.FloatingPointFields;
            static toObject(message: jspb.test.FloatingPointFields, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FloatingPointFields {
            interface $Properties {
                optionalFloatField?: (number|null);
                requiredFloatField: number;
                repeatedFloatField?: (number[]|null);
                defaultFloatField?: (number|null);
                optionalDoubleField?: (number|null);
                requiredDoubleField: number;
                repeatedDoubleField?: (number[]|null);
                defaultDoubleField?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.FloatingPointFields.$Properties;
        }

        interface ITestClone extends jspb.test.TestClone.$Properties {
        }

        class TestClone {
            constructor(properties?: jspb.test.TestClone.$Properties);
            ".jspb.test.CloneExtension.extField"?: (jspb.test.CloneExtension.$Properties|null);
            $unknowns?: Uint8Array[];
            str: string;
            simple1?: (jspb.test.Simple1.$Properties|null);
            simple2: jspb.test.Simple1.$Properties[];
            bytesField: Uint8Array;
            unused: string;
            static create(properties: jspb.test.TestClone.$Shape): jspb.test.TestClone & jspb.test.TestClone.$Shape;
            static create(properties?: jspb.test.TestClone.$Properties): jspb.test.TestClone;
            static encode(message: jspb.test.TestClone.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestClone.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestClone & jspb.test.TestClone.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestClone & jspb.test.TestClone.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestClone;
            static toObject(message: jspb.test.TestClone, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestClone {
            interface $Properties {
                str?: (string|null);
                simple1?: (jspb.test.Simple1.$Properties|null);
                simple2?: (jspb.test.Simple1.$Properties[]|null);
                bytesField?: (Uint8Array|null);
                unused?: (string|null);
                ".jspb.test.CloneExtension.extField"?: (jspb.test.CloneExtension.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestClone.$Properties;
        }

        interface ICloneExtension extends jspb.test.CloneExtension.$Properties {
        }

        class CloneExtension {
            constructor(properties?: jspb.test.CloneExtension.$Properties);
            $unknowns?: Uint8Array[];
            ext: string;
            static create(properties: jspb.test.CloneExtension.$Shape): jspb.test.CloneExtension & jspb.test.CloneExtension.$Shape;
            static create(properties?: jspb.test.CloneExtension.$Properties): jspb.test.CloneExtension;
            static encode(message: jspb.test.CloneExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.CloneExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.CloneExtension & jspb.test.CloneExtension.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.CloneExtension & jspb.test.CloneExtension.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.CloneExtension;
            static toObject(message: jspb.test.CloneExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CloneExtension {
            interface $Properties {
                ext?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.CloneExtension.$Properties;
        }

        interface ITestGroup extends jspb.test.TestGroup.$Properties {
        }

        class TestGroup {
            constructor(properties?: jspb.test.TestGroup.$Properties);
            $unknowns?: Uint8Array[];
            repeatedGroup: jspb.test.TestGroup.RepeatedGroup.$Properties[];
            requiredGroup: jspb.test.TestGroup.RequiredGroup.$Properties;
            optionalGroup?: (jspb.test.TestGroup.OptionalGroup.$Properties|null);
            messageInGroup?: (jspb.test.TestGroup.MessageInGroup.$Properties|null);
            enumInGroup?: (jspb.test.TestGroup.EnumInGroup.$Properties|null);
            id: string;
            requiredSimple: jspb.test.Simple2.$Properties;
            optionalSimple?: (jspb.test.Simple2.$Properties|null);
            static create(properties: jspb.test.TestGroup.$Shape): jspb.test.TestGroup & jspb.test.TestGroup.$Shape;
            static create(properties?: jspb.test.TestGroup.$Properties): jspb.test.TestGroup;
            static encode(message: jspb.test.TestGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup & jspb.test.TestGroup.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup & jspb.test.TestGroup.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestGroup;
            static toObject(message: jspb.test.TestGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestGroup {
            interface $Properties {
                repeatedGroup?: (jspb.test.TestGroup.RepeatedGroup.$Properties[]|null);
                requiredGroup: jspb.test.TestGroup.RequiredGroup.$Properties;
                optionalGroup?: (jspb.test.TestGroup.OptionalGroup.$Properties|null);
                messageInGroup?: (jspb.test.TestGroup.MessageInGroup.$Properties|null);
                enumInGroup?: (jspb.test.TestGroup.EnumInGroup.$Properties|null);
                id?: (string|null);
                requiredSimple: jspb.test.Simple2.$Properties;
                optionalSimple?: (jspb.test.Simple2.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestGroup.$Properties;

            interface IRepeatedGroup extends jspb.test.TestGroup.RepeatedGroup.$Properties {
            }

            class RepeatedGroup {
                constructor(properties?: jspb.test.TestGroup.RepeatedGroup.$Properties);
                $unknowns?: Uint8Array[];
                id: string;
                someBool: boolean[];
                static create(properties: jspb.test.TestGroup.RepeatedGroup.$Shape): jspb.test.TestGroup.RepeatedGroup & jspb.test.TestGroup.RepeatedGroup.$Shape;
                static create(properties?: jspb.test.TestGroup.RepeatedGroup.$Properties): jspb.test.TestGroup.RepeatedGroup;
                static encode(message: jspb.test.TestGroup.RepeatedGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.TestGroup.RepeatedGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RepeatedGroup & jspb.test.TestGroup.RepeatedGroup.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RepeatedGroup & jspb.test.TestGroup.RepeatedGroup.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RepeatedGroup;
                static toObject(message: jspb.test.TestGroup.RepeatedGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace RepeatedGroup {
                interface $Properties {
                    id: string;
                    someBool?: (boolean[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.TestGroup.RepeatedGroup.$Properties;
            }

            interface IRequiredGroup extends jspb.test.TestGroup.RequiredGroup.$Properties {
            }

            class RequiredGroup {
                constructor(properties?: jspb.test.TestGroup.RequiredGroup.$Properties);
                $unknowns?: Uint8Array[];
                id: string;
                static create(properties: jspb.test.TestGroup.RequiredGroup.$Shape): jspb.test.TestGroup.RequiredGroup & jspb.test.TestGroup.RequiredGroup.$Shape;
                static create(properties?: jspb.test.TestGroup.RequiredGroup.$Properties): jspb.test.TestGroup.RequiredGroup;
                static encode(message: jspb.test.TestGroup.RequiredGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.TestGroup.RequiredGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.RequiredGroup & jspb.test.TestGroup.RequiredGroup.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.RequiredGroup & jspb.test.TestGroup.RequiredGroup.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.RequiredGroup;
                static toObject(message: jspb.test.TestGroup.RequiredGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace RequiredGroup {
                interface $Properties {
                    id: string;
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.TestGroup.RequiredGroup.$Properties;
            }

            interface IOptionalGroup extends jspb.test.TestGroup.OptionalGroup.$Properties {
            }

            class OptionalGroup {
                constructor(properties?: jspb.test.TestGroup.OptionalGroup.$Properties);
                $unknowns?: Uint8Array[];
                id: string;
                static create(properties: jspb.test.TestGroup.OptionalGroup.$Shape): jspb.test.TestGroup.OptionalGroup & jspb.test.TestGroup.OptionalGroup.$Shape;
                static create(properties?: jspb.test.TestGroup.OptionalGroup.$Properties): jspb.test.TestGroup.OptionalGroup;
                static encode(message: jspb.test.TestGroup.OptionalGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.TestGroup.OptionalGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.OptionalGroup & jspb.test.TestGroup.OptionalGroup.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.OptionalGroup & jspb.test.TestGroup.OptionalGroup.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.OptionalGroup;
                static toObject(message: jspb.test.TestGroup.OptionalGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace OptionalGroup {
                interface $Properties {
                    id: string;
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.TestGroup.OptionalGroup.$Properties;
            }

            interface IMessageInGroup extends jspb.test.TestGroup.MessageInGroup.$Properties {
            }

            class MessageInGroup {
                constructor(properties?: jspb.test.TestGroup.MessageInGroup.$Properties);
                $unknowns?: Uint8Array[];
                id: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties;
                static create(properties: jspb.test.TestGroup.MessageInGroup.$Shape): jspb.test.TestGroup.MessageInGroup & jspb.test.TestGroup.MessageInGroup.$Shape;
                static create(properties?: jspb.test.TestGroup.MessageInGroup.$Properties): jspb.test.TestGroup.MessageInGroup;
                static encode(message: jspb.test.TestGroup.MessageInGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.TestGroup.MessageInGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.MessageInGroup & jspb.test.TestGroup.MessageInGroup.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.MessageInGroup & jspb.test.TestGroup.MessageInGroup.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.MessageInGroup;
                static toObject(message: jspb.test.TestGroup.MessageInGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace MessageInGroup {
                interface $Properties {
                    id: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties;
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.TestGroup.MessageInGroup.$Properties;

                interface INestedMessage extends jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties {
                }

                class NestedMessage {
                    constructor(properties?: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties);
                    $unknowns?: Uint8Array[];
                    id: string;
                    static create(properties: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Shape): jspb.test.TestGroup.MessageInGroup.NestedMessage & jspb.test.TestGroup.MessageInGroup.NestedMessage.$Shape;
                    static create(properties?: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties): jspb.test.TestGroup.MessageInGroup.NestedMessage;
                    static encode(message: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                    static encodeDelimited(message: jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.MessageInGroup.NestedMessage & jspb.test.TestGroup.MessageInGroup.NestedMessage.$Shape;
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.MessageInGroup.NestedMessage & jspb.test.TestGroup.MessageInGroup.NestedMessage.$Shape;
                    static verify(message: { [k: string]: any }): (string|null);
                    static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.MessageInGroup.NestedMessage;
                    static toObject(message: jspb.test.TestGroup.MessageInGroup.NestedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace NestedMessage {
                    interface $Properties {
                        id?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = jspb.test.TestGroup.MessageInGroup.NestedMessage.$Properties;
                }
            }

            interface IEnumInGroup extends jspb.test.TestGroup.EnumInGroup.$Properties {
            }

            class EnumInGroup {
                constructor(properties?: jspb.test.TestGroup.EnumInGroup.$Properties);
                $unknowns?: Uint8Array[];
                id: jspb.test.TestGroup.EnumInGroup.NestedEnum;
                static create(properties: jspb.test.TestGroup.EnumInGroup.$Shape): jspb.test.TestGroup.EnumInGroup & jspb.test.TestGroup.EnumInGroup.$Shape;
                static create(properties?: jspb.test.TestGroup.EnumInGroup.$Properties): jspb.test.TestGroup.EnumInGroup;
                static encode(message: jspb.test.TestGroup.EnumInGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.TestGroup.EnumInGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup.EnumInGroup & jspb.test.TestGroup.EnumInGroup.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup.EnumInGroup & jspb.test.TestGroup.EnumInGroup.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.TestGroup.EnumInGroup;
                static toObject(message: jspb.test.TestGroup.EnumInGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace EnumInGroup {
                interface $Properties {
                    id: jspb.test.TestGroup.EnumInGroup.NestedEnum;
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.TestGroup.EnumInGroup.$Properties;

                enum NestedEnum {
                    first = 0,
                    second = 1
                }
            }
        }

        interface ITestGroup1 extends jspb.test.TestGroup1.$Properties {
        }

        class TestGroup1 {
            constructor(properties?: jspb.test.TestGroup1.$Properties);
            $unknowns?: Uint8Array[];
            group?: (jspb.test.TestGroup.RepeatedGroup.$Properties|null);
            static create(properties: jspb.test.TestGroup1.$Shape): jspb.test.TestGroup1 & jspb.test.TestGroup1.$Shape;
            static create(properties?: jspb.test.TestGroup1.$Properties): jspb.test.TestGroup1;
            static encode(message: jspb.test.TestGroup1.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestGroup1.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup1 & jspb.test.TestGroup1.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup1 & jspb.test.TestGroup1.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestGroup1;
            static toObject(message: jspb.test.TestGroup1, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestGroup1 {
            interface $Properties {
                group?: (jspb.test.TestGroup.RepeatedGroup.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestGroup1.$Properties;
        }

        interface ITestReservedNames extends jspb.test.TestReservedNames.$Properties {
        }

        class TestReservedNames {
            constructor(properties?: jspb.test.TestReservedNames.$Properties);
            ".jspb.test.TestReservedNamesExtension.foo": number;
            $unknowns?: Uint8Array[];
            extension: number;
            static create(properties: jspb.test.TestReservedNames.$Shape): jspb.test.TestReservedNames & jspb.test.TestReservedNames.$Shape;
            static create(properties?: jspb.test.TestReservedNames.$Properties): jspb.test.TestReservedNames;
            static encode(message: jspb.test.TestReservedNames.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestReservedNames.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNames & jspb.test.TestReservedNames.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNames & jspb.test.TestReservedNames.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNames;
            static toObject(message: jspb.test.TestReservedNames, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestReservedNames {
            interface $Properties {
                extension?: (number|null);
                ".jspb.test.TestReservedNamesExtension.foo"?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestReservedNames.$Properties;
        }

        interface ITestReservedNamesExtension extends jspb.test.TestReservedNamesExtension.$Properties {
        }

        class TestReservedNamesExtension {
            constructor(properties?: jspb.test.TestReservedNamesExtension.$Properties);
            $unknowns?: Uint8Array[];
            static create(properties: jspb.test.TestReservedNamesExtension.$Shape): jspb.test.TestReservedNamesExtension & jspb.test.TestReservedNamesExtension.$Shape;
            static create(properties?: jspb.test.TestReservedNamesExtension.$Properties): jspb.test.TestReservedNamesExtension;
            static encode(message: jspb.test.TestReservedNamesExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestReservedNamesExtension.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension & jspb.test.TestReservedNamesExtension.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNamesExtension & jspb.test.TestReservedNamesExtension.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestReservedNamesExtension;
            static toObject(message: jspb.test.TestReservedNamesExtension, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestReservedNamesExtension {
            interface $Properties {
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestReservedNamesExtension.$Properties;
        }

        interface ITestMessageWithOneof extends jspb.test.TestMessageWithOneof.$Properties {
        }

        class TestMessageWithOneof {
            constructor(properties?: jspb.test.TestMessageWithOneof.$Properties);
            $unknowns?: Uint8Array[];
            pone?: (string|null);
            pthree?: (string|null);
            rone?: (jspb.test.TestMessageWithOneof.$Properties|null);
            rtwo?: (string|null);
            normalField: boolean;
            repeatedField: string[];
            aone?: (number|null);
            atwo?: (number|null);
            bone?: (number|null);
            btwo?: (number|null);
            partialOneof?: ("pone"|"pthree");
            recursiveOneof?: ("rone"|"rtwo");
            defaultOneofA?: ("aone"|"atwo");
            defaultOneofB?: ("bone"|"btwo");
            static create(properties: jspb.test.TestMessageWithOneof.$Shape): jspb.test.TestMessageWithOneof & jspb.test.TestMessageWithOneof.$Shape;
            static create(properties?: jspb.test.TestMessageWithOneof.$Properties): jspb.test.TestMessageWithOneof;
            static encode(message: jspb.test.TestMessageWithOneof.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestMessageWithOneof.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof & jspb.test.TestMessageWithOneof.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMessageWithOneof & jspb.test.TestMessageWithOneof.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestMessageWithOneof;
            static toObject(message: jspb.test.TestMessageWithOneof, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestMessageWithOneof {
            interface $Properties {
                pone?: (string|null);
                pthree?: (string|null);
                rone?: (jspb.test.TestMessageWithOneof.$Properties|null);
                rtwo?: (string|null);
                normalField?: (boolean|null);
                repeatedField?: (string[]|null);
                aone?: (number|null);
                atwo?: (number|null);
                bone?: (number|null);
                btwo?: (number|null);
                partialOneof?: ("pone"|"pthree");
                recursiveOneof?: ("rone"|"rtwo");
                defaultOneofA?: ("aone"|"atwo");
                defaultOneofB?: ("bone"|"btwo");
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
  pone?: string|null;
  pthree?: string|null;
  rone?: jspb.test.TestMessageWithOneof.$Shape|null;
  rtwo?: string|null;
  normalField?: boolean|null;
  repeatedField?: string[]|null;
  aone?: number|null;
  atwo?: number|null;
  bone?: number|null;
  btwo?: number|null;
  $unknowns?: Uint8Array[];
} & (
  ({ partialOneof?: undefined; pone?: null; pthree?: null }|{ partialOneof?: "pone"; pone: string; pthree?: null }|{ partialOneof?: "pthree"; pone?: null; pthree: string })
) & (
  ({ recursiveOneof?: undefined; rone?: null; rtwo?: null }|{ recursiveOneof?: "rone"; rone: jspb.test.TestMessageWithOneof.$Shape; rtwo?: null }|{ recursiveOneof?: "rtwo"; rone?: null; rtwo: string })
) & (
  ({ defaultOneofA?: undefined; aone?: null; atwo?: null }|{ defaultOneofA?: "aone"; aone: number; atwo?: null }|{ defaultOneofA?: "atwo"; aone?: null; atwo: number })
) & (
  ({ defaultOneofB?: undefined; bone?: null; btwo?: null }|{ defaultOneofB?: "bone"; bone: number; btwo?: null }|{ defaultOneofB?: "btwo"; bone?: null; btwo: number })
);
        }

        interface ITestEndsWithBytes extends jspb.test.TestEndsWithBytes.$Properties {
        }

        class TestEndsWithBytes {
            constructor(properties?: jspb.test.TestEndsWithBytes.$Properties);
            $unknowns?: Uint8Array[];
            value: number;
            data: Uint8Array;
            static create(properties: jspb.test.TestEndsWithBytes.$Shape): jspb.test.TestEndsWithBytes & jspb.test.TestEndsWithBytes.$Shape;
            static create(properties?: jspb.test.TestEndsWithBytes.$Properties): jspb.test.TestEndsWithBytes;
            static encode(message: jspb.test.TestEndsWithBytes.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestEndsWithBytes.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes & jspb.test.TestEndsWithBytes.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestEndsWithBytes & jspb.test.TestEndsWithBytes.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestEndsWithBytes;
            static toObject(message: jspb.test.TestEndsWithBytes, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestEndsWithBytes {
            interface $Properties {
                value?: (number|null);
                data?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestEndsWithBytes.$Properties;
        }

        interface ITestMapFieldsNoBinary extends jspb.test.TestMapFieldsNoBinary.$Properties {
        }

        class TestMapFieldsNoBinary {
            constructor(properties?: jspb.test.TestMapFieldsNoBinary.$Properties);
            $unknowns?: Uint8Array[];
            mapStringString: { [k: string]: string };
            mapStringInt32: { [k: string]: number };
            mapStringInt64: { [k: string]: (number|bigint) };
            mapStringBool: { [k: string]: boolean };
            mapStringDouble: { [k: string]: number };
            mapStringEnum: { [k: string]: jspb.test.MapValueEnumNoBinary };
            mapStringMsg: { [k: string]: jspb.test.MapValueMessageNoBinary.$Properties };
            mapInt32String: { [k: string]: string };
            mapInt64String: { [k: string]: string };
            mapBoolString: { [k: string]: string };
            testMapFields?: (jspb.test.TestMapFieldsNoBinary.$Properties|null);
            mapStringTestmapfields: { [k: string]: jspb.test.TestMapFieldsNoBinary.$Properties };
            static create(properties: jspb.test.TestMapFieldsNoBinary.$Shape): jspb.test.TestMapFieldsNoBinary & jspb.test.TestMapFieldsNoBinary.$Shape;
            static create(properties?: jspb.test.TestMapFieldsNoBinary.$Properties): jspb.test.TestMapFieldsNoBinary;
            static encode(message: jspb.test.TestMapFieldsNoBinary.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.TestMapFieldsNoBinary.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary & jspb.test.TestMapFieldsNoBinary.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary & jspb.test.TestMapFieldsNoBinary.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.TestMapFieldsNoBinary;
            static toObject(message: jspb.test.TestMapFieldsNoBinary, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TestMapFieldsNoBinary {
            interface $Properties {
                mapStringString?: ({ [k: string]: string }|null);
                mapStringInt32?: ({ [k: string]: number }|null);
                mapStringInt64?: ({ [k: string]: (number|bigint) }|null);
                mapStringBool?: ({ [k: string]: boolean }|null);
                mapStringDouble?: ({ [k: string]: number }|null);
                mapStringEnum?: ({ [k: string]: jspb.test.MapValueEnumNoBinary }|null);
                mapStringMsg?: ({ [k: string]: jspb.test.MapValueMessageNoBinary.$Properties }|null);
                mapInt32String?: ({ [k: string]: string }|null);
                mapInt64String?: ({ [k: string]: string }|null);
                mapBoolString?: ({ [k: string]: string }|null);
                testMapFields?: (jspb.test.TestMapFieldsNoBinary.$Properties|null);
                mapStringTestmapfields?: ({ [k: string]: jspb.test.TestMapFieldsNoBinary.$Properties }|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.TestMapFieldsNoBinary.$Properties;
        }

        enum MapValueEnumNoBinary {
            MAP_VALUE_FOO_NOBINARY = 0,
            MAP_VALUE_BAR_NOBINARY = 1,
            MAP_VALUE_BAZ_NOBINARY = 2
        }

        interface IMapValueMessageNoBinary extends jspb.test.MapValueMessageNoBinary.$Properties {
        }

        class MapValueMessageNoBinary {
            constructor(properties?: jspb.test.MapValueMessageNoBinary.$Properties);
            $unknowns?: Uint8Array[];
            foo: number;
            static create(properties: jspb.test.MapValueMessageNoBinary.$Shape): jspb.test.MapValueMessageNoBinary & jspb.test.MapValueMessageNoBinary.$Shape;
            static create(properties?: jspb.test.MapValueMessageNoBinary.$Properties): jspb.test.MapValueMessageNoBinary;
            static encode(message: jspb.test.MapValueMessageNoBinary.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.MapValueMessageNoBinary.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary & jspb.test.MapValueMessageNoBinary.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary & jspb.test.MapValueMessageNoBinary.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.MapValueMessageNoBinary;
            static toObject(message: jspb.test.MapValueMessageNoBinary, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MapValueMessageNoBinary {
            interface $Properties {
                foo?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.MapValueMessageNoBinary.$Properties;
        }

        interface IDeeply extends jspb.test.Deeply.$Properties {
        }

        class Deeply {
            constructor(properties?: jspb.test.Deeply.$Properties);
            $unknowns?: Uint8Array[];
            static create(properties: jspb.test.Deeply.$Shape): jspb.test.Deeply & jspb.test.Deeply.$Shape;
            static create(properties?: jspb.test.Deeply.$Properties): jspb.test.Deeply;
            static encode(message: jspb.test.Deeply.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: jspb.test.Deeply.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply & jspb.test.Deeply.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply & jspb.test.Deeply.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): jspb.test.Deeply;
            static toObject(message: jspb.test.Deeply, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Deeply {
            interface $Properties {
                $unknowns?: Uint8Array[];
            }
            type $Shape = jspb.test.Deeply.$Properties;

            interface INested extends jspb.test.Deeply.Nested.$Properties {
            }

            class Nested {
                constructor(properties?: jspb.test.Deeply.Nested.$Properties);
                $unknowns?: Uint8Array[];
                static create(properties: jspb.test.Deeply.Nested.$Shape): jspb.test.Deeply.Nested & jspb.test.Deeply.Nested.$Shape;
                static create(properties?: jspb.test.Deeply.Nested.$Properties): jspb.test.Deeply.Nested;
                static encode(message: jspb.test.Deeply.Nested.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: jspb.test.Deeply.Nested.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested & jspb.test.Deeply.Nested.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested & jspb.test.Deeply.Nested.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested;
                static toObject(message: jspb.test.Deeply.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Nested {
                interface $Properties {
                    $unknowns?: Uint8Array[];
                }
                type $Shape = jspb.test.Deeply.Nested.$Properties;

                interface IMessage extends jspb.test.Deeply.Nested.Message.$Properties {
                }

                class Message {
                    constructor(properties?: jspb.test.Deeply.Nested.Message.$Properties);
                    $unknowns?: Uint8Array[];
                    count: number;
                    static create(properties: jspb.test.Deeply.Nested.Message.$Shape): jspb.test.Deeply.Nested.Message & jspb.test.Deeply.Nested.Message.$Shape;
                    static create(properties?: jspb.test.Deeply.Nested.Message.$Properties): jspb.test.Deeply.Nested.Message;
                    static encode(message: jspb.test.Deeply.Nested.Message.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                    static encodeDelimited(message: jspb.test.Deeply.Nested.Message.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message & jspb.test.Deeply.Nested.Message.$Shape;
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested.Message & jspb.test.Deeply.Nested.Message.$Shape;
                    static verify(message: { [k: string]: any }): (string|null);
                    static fromObject(object: { [k: string]: any }): jspb.test.Deeply.Nested.Message;
                    static toObject(message: jspb.test.Deeply.Nested.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Message {
                    interface $Properties {
                        count?: (number|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = jspb.test.Deeply.Nested.Message.$Properties;
                }
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        interface IFileDescriptorSet extends google.protobuf.FileDescriptorSet.$Properties {
        }

        class FileDescriptorSet {
            constructor(properties?: google.protobuf.FileDescriptorSet.$Properties);
            $unknowns?: Uint8Array[];
            file: google.protobuf.FileDescriptorProto.$Properties[];
            static create(properties: google.protobuf.FileDescriptorSet.$Shape): google.protobuf.FileDescriptorSet & google.protobuf.FileDescriptorSet.$Shape;
            static create(properties?: google.protobuf.FileDescriptorSet.$Properties): google.protobuf.FileDescriptorSet;
            static encode(message: google.protobuf.FileDescriptorSet.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FileDescriptorSet.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet & google.protobuf.FileDescriptorSet.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet & google.protobuf.FileDescriptorSet.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;
            static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FileDescriptorSet {
            interface $Properties {
                file?: (google.protobuf.FileDescriptorProto.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FileDescriptorSet.$Properties;
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

        interface IFileDescriptorProto extends google.protobuf.FileDescriptorProto.$Properties {
        }

        class FileDescriptorProto {
            constructor(properties?: google.protobuf.FileDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            package: string;
            dependency: string[];
            publicDependency: number[];
            weakDependency: number[];
            optionDependency: string[];
            messageType: google.protobuf.DescriptorProto.$Properties[];
            enumType: google.protobuf.EnumDescriptorProto.$Properties[];
            service: google.protobuf.ServiceDescriptorProto.$Properties[];
            extension: google.protobuf.FieldDescriptorProto.$Properties[];
            options?: (google.protobuf.FileOptions.$Properties|null);
            sourceCodeInfo?: (google.protobuf.SourceCodeInfo.$Properties|null);
            syntax: string;
            edition: google.protobuf.Edition;
            static create(properties: google.protobuf.FileDescriptorProto.$Shape): google.protobuf.FileDescriptorProto & google.protobuf.FileDescriptorProto.$Shape;
            static create(properties?: google.protobuf.FileDescriptorProto.$Properties): google.protobuf.FileDescriptorProto;
            static encode(message: google.protobuf.FileDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FileDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto & google.protobuf.FileDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto & google.protobuf.FileDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;
            static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FileDescriptorProto {
            interface $Properties {
                name?: (string|null);
                "package"?: (string|null);
                dependency?: (string[]|null);
                publicDependency?: (number[]|null);
                weakDependency?: (number[]|null);
                optionDependency?: (string[]|null);
                messageType?: (google.protobuf.DescriptorProto.$Properties[]|null);
                enumType?: (google.protobuf.EnumDescriptorProto.$Properties[]|null);
                service?: (google.protobuf.ServiceDescriptorProto.$Properties[]|null);
                extension?: (google.protobuf.FieldDescriptorProto.$Properties[]|null);
                options?: (google.protobuf.FileOptions.$Properties|null);
                sourceCodeInfo?: (google.protobuf.SourceCodeInfo.$Properties|null);
                syntax?: (string|null);
                edition?: (google.protobuf.Edition|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FileDescriptorProto.$Properties;
        }

        interface IDescriptorProto extends google.protobuf.DescriptorProto.$Properties {
        }

        class DescriptorProto {
            constructor(properties?: google.protobuf.DescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            field: google.protobuf.FieldDescriptorProto.$Properties[];
            extension: google.protobuf.FieldDescriptorProto.$Properties[];
            nestedType: google.protobuf.DescriptorProto.$Properties[];
            enumType: google.protobuf.EnumDescriptorProto.$Properties[];
            extensionRange: google.protobuf.DescriptorProto.ExtensionRange.$Properties[];
            oneofDecl: google.protobuf.OneofDescriptorProto.$Properties[];
            options?: (google.protobuf.MessageOptions.$Properties|null);
            reservedRange: google.protobuf.DescriptorProto.ReservedRange.$Properties[];
            reservedName: string[];
            visibility: google.protobuf.SymbolVisibility;
            static create(properties: google.protobuf.DescriptorProto.$Shape): google.protobuf.DescriptorProto & google.protobuf.DescriptorProto.$Shape;
            static create(properties?: google.protobuf.DescriptorProto.$Properties): google.protobuf.DescriptorProto;
            static encode(message: google.protobuf.DescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.DescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto & google.protobuf.DescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto & google.protobuf.DescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;
            static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DescriptorProto {
            interface $Properties {
                name?: (string|null);
                field?: (google.protobuf.FieldDescriptorProto.$Properties[]|null);
                extension?: (google.protobuf.FieldDescriptorProto.$Properties[]|null);
                nestedType?: (google.protobuf.DescriptorProto.$Properties[]|null);
                enumType?: (google.protobuf.EnumDescriptorProto.$Properties[]|null);
                extensionRange?: (google.protobuf.DescriptorProto.ExtensionRange.$Properties[]|null);
                oneofDecl?: (google.protobuf.OneofDescriptorProto.$Properties[]|null);
                options?: (google.protobuf.MessageOptions.$Properties|null);
                reservedRange?: (google.protobuf.DescriptorProto.ReservedRange.$Properties[]|null);
                reservedName?: (string[]|null);
                visibility?: (google.protobuf.SymbolVisibility|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.DescriptorProto.$Properties;

            interface IExtensionRange extends google.protobuf.DescriptorProto.ExtensionRange.$Properties {
            }

            class ExtensionRange {
                constructor(properties?: google.protobuf.DescriptorProto.ExtensionRange.$Properties);
                $unknowns?: Uint8Array[];
                start: number;
                end: number;
                options?: (google.protobuf.ExtensionRangeOptions.$Properties|null);
                static create(properties: google.protobuf.DescriptorProto.ExtensionRange.$Shape): google.protobuf.DescriptorProto.ExtensionRange & google.protobuf.DescriptorProto.ExtensionRange.$Shape;
                static create(properties?: google.protobuf.DescriptorProto.ExtensionRange.$Properties): google.protobuf.DescriptorProto.ExtensionRange;
                static encode(message: google.protobuf.DescriptorProto.ExtensionRange.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.DescriptorProto.ExtensionRange.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange & google.protobuf.DescriptorProto.ExtensionRange.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange & google.protobuf.DescriptorProto.ExtensionRange.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;
                static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ExtensionRange {
                interface $Properties {
                    start?: (number|null);
                    end?: (number|null);
                    options?: (google.protobuf.ExtensionRangeOptions.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.DescriptorProto.ExtensionRange.$Properties;
            }

            interface IReservedRange extends google.protobuf.DescriptorProto.ReservedRange.$Properties {
            }

            class ReservedRange {
                constructor(properties?: google.protobuf.DescriptorProto.ReservedRange.$Properties);
                $unknowns?: Uint8Array[];
                start: number;
                end: number;
                static create(properties: google.protobuf.DescriptorProto.ReservedRange.$Shape): google.protobuf.DescriptorProto.ReservedRange & google.protobuf.DescriptorProto.ReservedRange.$Shape;
                static create(properties?: google.protobuf.DescriptorProto.ReservedRange.$Properties): google.protobuf.DescriptorProto.ReservedRange;
                static encode(message: google.protobuf.DescriptorProto.ReservedRange.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.DescriptorProto.ReservedRange.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange & google.protobuf.DescriptorProto.ReservedRange.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange & google.protobuf.DescriptorProto.ReservedRange.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;
                static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ReservedRange {
                interface $Properties {
                    start?: (number|null);
                    end?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.DescriptorProto.ReservedRange.$Properties;
            }
        }

        interface IExtensionRangeOptions extends google.protobuf.ExtensionRangeOptions.$Properties {
        }

        class ExtensionRangeOptions {
            constructor(properties?: google.protobuf.ExtensionRangeOptions.$Properties);
            $unknowns?: Uint8Array[];
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            declaration: google.protobuf.ExtensionRangeOptions.Declaration.$Properties[];
            features?: (google.protobuf.FeatureSet.$Properties|null);
            verification: google.protobuf.ExtensionRangeOptions.VerificationState;
            static create(properties: google.protobuf.ExtensionRangeOptions.$Shape): google.protobuf.ExtensionRangeOptions & google.protobuf.ExtensionRangeOptions.$Shape;
            static create(properties?: google.protobuf.ExtensionRangeOptions.$Properties): google.protobuf.ExtensionRangeOptions;
            static encode(message: google.protobuf.ExtensionRangeOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.ExtensionRangeOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions & google.protobuf.ExtensionRangeOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions & google.protobuf.ExtensionRangeOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions;
            static toObject(message: google.protobuf.ExtensionRangeOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ExtensionRangeOptions {
            interface $Properties {
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                declaration?: (google.protobuf.ExtensionRangeOptions.Declaration.$Properties[]|null);
                features?: (google.protobuf.FeatureSet.$Properties|null);
                verification?: (google.protobuf.ExtensionRangeOptions.VerificationState|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.ExtensionRangeOptions.$Properties;

            interface IDeclaration extends google.protobuf.ExtensionRangeOptions.Declaration.$Properties {
            }

            class Declaration {
                constructor(properties?: google.protobuf.ExtensionRangeOptions.Declaration.$Properties);
                $unknowns?: Uint8Array[];
                number: number;
                fullName: string;
                type: string;
                reserved: boolean;
                repeated: boolean;
                static create(properties: google.protobuf.ExtensionRangeOptions.Declaration.$Shape): google.protobuf.ExtensionRangeOptions.Declaration & google.protobuf.ExtensionRangeOptions.Declaration.$Shape;
                static create(properties?: google.protobuf.ExtensionRangeOptions.Declaration.$Properties): google.protobuf.ExtensionRangeOptions.Declaration;
                static encode(message: google.protobuf.ExtensionRangeOptions.Declaration.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.ExtensionRangeOptions.Declaration.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions.Declaration & google.protobuf.ExtensionRangeOptions.Declaration.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions.Declaration & google.protobuf.ExtensionRangeOptions.Declaration.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions.Declaration;
                static toObject(message: google.protobuf.ExtensionRangeOptions.Declaration, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Declaration {
                interface $Properties {
                    number?: (number|null);
                    fullName?: (string|null);
                    type?: (string|null);
                    reserved?: (boolean|null);
                    repeated?: (boolean|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.ExtensionRangeOptions.Declaration.$Properties;
            }

            enum VerificationState {
                DECLARATION = 0,
                UNVERIFIED = 1
            }
        }

        interface IFieldDescriptorProto extends google.protobuf.FieldDescriptorProto.$Properties {
        }

        class FieldDescriptorProto {
            constructor(properties?: google.protobuf.FieldDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            number: number;
            label: google.protobuf.FieldDescriptorProto.Label;
            type: google.protobuf.FieldDescriptorProto.Type;
            typeName: string;
            extendee: string;
            defaultValue: string;
            oneofIndex: number;
            jsonName: string;
            options?: (google.protobuf.FieldOptions.$Properties|null);
            proto3Optional: boolean;
            static create(properties: google.protobuf.FieldDescriptorProto.$Shape): google.protobuf.FieldDescriptorProto & google.protobuf.FieldDescriptorProto.$Shape;
            static create(properties?: google.protobuf.FieldDescriptorProto.$Properties): google.protobuf.FieldDescriptorProto;
            static encode(message: google.protobuf.FieldDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FieldDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto & google.protobuf.FieldDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto & google.protobuf.FieldDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;
            static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FieldDescriptorProto {
            interface $Properties {
                name?: (string|null);
                number?: (number|null);
                label?: (google.protobuf.FieldDescriptorProto.Label|null);
                type?: (google.protobuf.FieldDescriptorProto.Type|null);
                typeName?: (string|null);
                extendee?: (string|null);
                defaultValue?: (string|null);
                oneofIndex?: (number|null);
                jsonName?: (string|null);
                options?: (google.protobuf.FieldOptions.$Properties|null);
                proto3Optional?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FieldDescriptorProto.$Properties;

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

        interface IOneofDescriptorProto extends google.protobuf.OneofDescriptorProto.$Properties {
        }

        class OneofDescriptorProto {
            constructor(properties?: google.protobuf.OneofDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            options?: (google.protobuf.OneofOptions.$Properties|null);
            static create(properties: google.protobuf.OneofDescriptorProto.$Shape): google.protobuf.OneofDescriptorProto & google.protobuf.OneofDescriptorProto.$Shape;
            static create(properties?: google.protobuf.OneofDescriptorProto.$Properties): google.protobuf.OneofDescriptorProto;
            static encode(message: google.protobuf.OneofDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.OneofDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto & google.protobuf.OneofDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto & google.protobuf.OneofDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;
            static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace OneofDescriptorProto {
            interface $Properties {
                name?: (string|null);
                options?: (google.protobuf.OneofOptions.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.OneofDescriptorProto.$Properties;
        }

        interface IEnumDescriptorProto extends google.protobuf.EnumDescriptorProto.$Properties {
        }

        class EnumDescriptorProto {
            constructor(properties?: google.protobuf.EnumDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            value: google.protobuf.EnumValueDescriptorProto.$Properties[];
            options?: (google.protobuf.EnumOptions.$Properties|null);
            reservedRange: google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties[];
            reservedName: string[];
            visibility: google.protobuf.SymbolVisibility;
            static create(properties: google.protobuf.EnumDescriptorProto.$Shape): google.protobuf.EnumDescriptorProto & google.protobuf.EnumDescriptorProto.$Shape;
            static create(properties?: google.protobuf.EnumDescriptorProto.$Properties): google.protobuf.EnumDescriptorProto;
            static encode(message: google.protobuf.EnumDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.EnumDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto & google.protobuf.EnumDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto & google.protobuf.EnumDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;
            static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EnumDescriptorProto {
            interface $Properties {
                name?: (string|null);
                value?: (google.protobuf.EnumValueDescriptorProto.$Properties[]|null);
                options?: (google.protobuf.EnumOptions.$Properties|null);
                reservedRange?: (google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties[]|null);
                reservedName?: (string[]|null);
                visibility?: (google.protobuf.SymbolVisibility|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.EnumDescriptorProto.$Properties;

            interface IEnumReservedRange extends google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties {
            }

            class EnumReservedRange {
                constructor(properties?: google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties);
                $unknowns?: Uint8Array[];
                start: number;
                end: number;
                static create(properties: google.protobuf.EnumDescriptorProto.EnumReservedRange.$Shape): google.protobuf.EnumDescriptorProto.EnumReservedRange & google.protobuf.EnumDescriptorProto.EnumReservedRange.$Shape;
                static create(properties?: google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties): google.protobuf.EnumDescriptorProto.EnumReservedRange;
                static encode(message: google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto.EnumReservedRange & google.protobuf.EnumDescriptorProto.EnumReservedRange.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto.EnumReservedRange & google.protobuf.EnumDescriptorProto.EnumReservedRange.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto.EnumReservedRange;
                static toObject(message: google.protobuf.EnumDescriptorProto.EnumReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace EnumReservedRange {
                interface $Properties {
                    start?: (number|null);
                    end?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.EnumDescriptorProto.EnumReservedRange.$Properties;
            }
        }

        interface IEnumValueDescriptorProto extends google.protobuf.EnumValueDescriptorProto.$Properties {
        }

        class EnumValueDescriptorProto {
            constructor(properties?: google.protobuf.EnumValueDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            number: number;
            options?: (google.protobuf.EnumValueOptions.$Properties|null);
            static create(properties: google.protobuf.EnumValueDescriptorProto.$Shape): google.protobuf.EnumValueDescriptorProto & google.protobuf.EnumValueDescriptorProto.$Shape;
            static create(properties?: google.protobuf.EnumValueDescriptorProto.$Properties): google.protobuf.EnumValueDescriptorProto;
            static encode(message: google.protobuf.EnumValueDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.EnumValueDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto & google.protobuf.EnumValueDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto & google.protobuf.EnumValueDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;
            static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EnumValueDescriptorProto {
            interface $Properties {
                name?: (string|null);
                number?: (number|null);
                options?: (google.protobuf.EnumValueOptions.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.EnumValueDescriptorProto.$Properties;
        }

        interface IServiceDescriptorProto extends google.protobuf.ServiceDescriptorProto.$Properties {
        }

        class ServiceDescriptorProto {
            constructor(properties?: google.protobuf.ServiceDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            method: google.protobuf.MethodDescriptorProto.$Properties[];
            options?: (google.protobuf.ServiceOptions.$Properties|null);
            static create(properties: google.protobuf.ServiceDescriptorProto.$Shape): google.protobuf.ServiceDescriptorProto & google.protobuf.ServiceDescriptorProto.$Shape;
            static create(properties?: google.protobuf.ServiceDescriptorProto.$Properties): google.protobuf.ServiceDescriptorProto;
            static encode(message: google.protobuf.ServiceDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.ServiceDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto & google.protobuf.ServiceDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto & google.protobuf.ServiceDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;
            static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ServiceDescriptorProto {
            interface $Properties {
                name?: (string|null);
                method?: (google.protobuf.MethodDescriptorProto.$Properties[]|null);
                options?: (google.protobuf.ServiceOptions.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.ServiceDescriptorProto.$Properties;
        }

        interface IMethodDescriptorProto extends google.protobuf.MethodDescriptorProto.$Properties {
        }

        class MethodDescriptorProto {
            constructor(properties?: google.protobuf.MethodDescriptorProto.$Properties);
            $unknowns?: Uint8Array[];
            name: string;
            inputType: string;
            outputType: string;
            options?: (google.protobuf.MethodOptions.$Properties|null);
            clientStreaming: boolean;
            serverStreaming: boolean;
            static create(properties: google.protobuf.MethodDescriptorProto.$Shape): google.protobuf.MethodDescriptorProto & google.protobuf.MethodDescriptorProto.$Shape;
            static create(properties?: google.protobuf.MethodDescriptorProto.$Properties): google.protobuf.MethodDescriptorProto;
            static encode(message: google.protobuf.MethodDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.MethodDescriptorProto.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto & google.protobuf.MethodDescriptorProto.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto & google.protobuf.MethodDescriptorProto.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;
            static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MethodDescriptorProto {
            interface $Properties {
                name?: (string|null);
                inputType?: (string|null);
                outputType?: (string|null);
                options?: (google.protobuf.MethodOptions.$Properties|null);
                clientStreaming?: (boolean|null);
                serverStreaming?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.MethodDescriptorProto.$Properties;
        }

        interface IFileOptions extends google.protobuf.FileOptions.$Properties {
        }

        class FileOptions {
            constructor(properties?: google.protobuf.FileOptions.$Properties);
            $unknowns?: Uint8Array[];
            javaPackage: string;
            javaOuterClassname: string;
            javaMultipleFiles: boolean;
            javaGenerateEqualsAndHash: boolean;
            javaStringCheckUtf8: boolean;
            optimizeFor: google.protobuf.FileOptions.OptimizeMode;
            goPackage: string;
            ccGenericServices: boolean;
            javaGenericServices: boolean;
            pyGenericServices: boolean;
            deprecated: boolean;
            ccEnableArenas: boolean;
            objcClassPrefix: string;
            csharpNamespace: string;
            swiftPrefix: string;
            phpClassPrefix: string;
            phpNamespace: string;
            phpMetadataNamespace: string;
            rubyPackage: string;
            features?: (google.protobuf.FeatureSet.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.FileOptions.$Shape): google.protobuf.FileOptions & google.protobuf.FileOptions.$Shape;
            static create(properties?: google.protobuf.FileOptions.$Properties): google.protobuf.FileOptions;
            static encode(message: google.protobuf.FileOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FileOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions & google.protobuf.FileOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions & google.protobuf.FileOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;
            static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FileOptions {
            interface $Properties {
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
                features?: (google.protobuf.FeatureSet.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FileOptions.$Properties;

            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        interface IMessageOptions extends google.protobuf.MessageOptions.$Properties {
        }

        class MessageOptions {
            constructor(properties?: google.protobuf.MessageOptions.$Properties);
            $unknowns?: Uint8Array[];
            messageSetWireFormat: boolean;
            noStandardDescriptorAccessor: boolean;
            deprecated: boolean;
            mapEntry: boolean;
            deprecatedLegacyJsonFieldConflicts: boolean;
            features?: (google.protobuf.FeatureSet.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.MessageOptions.$Shape): google.protobuf.MessageOptions & google.protobuf.MessageOptions.$Shape;
            static create(properties?: google.protobuf.MessageOptions.$Properties): google.protobuf.MessageOptions;
            static encode(message: google.protobuf.MessageOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.MessageOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions & google.protobuf.MessageOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions & google.protobuf.MessageOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;
            static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MessageOptions {
            interface $Properties {
                messageSetWireFormat?: (boolean|null);
                noStandardDescriptorAccessor?: (boolean|null);
                deprecated?: (boolean|null);
                mapEntry?: (boolean|null);
                deprecatedLegacyJsonFieldConflicts?: (boolean|null);
                features?: (google.protobuf.FeatureSet.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.MessageOptions.$Properties;
        }

        interface IFieldOptions extends google.protobuf.FieldOptions.$Properties {
        }

        class FieldOptions {
            constructor(properties?: google.protobuf.FieldOptions.$Properties);
            $unknowns?: Uint8Array[];
            ctype: google.protobuf.FieldOptions.CType;
            packed: boolean;
            jstype: google.protobuf.FieldOptions.JSType;
            lazy: boolean;
            unverifiedLazy: boolean;
            deprecated: boolean;
            weak: boolean;
            debugRedact: boolean;
            retention: google.protobuf.FieldOptions.OptionRetention;
            targets: google.protobuf.FieldOptions.OptionTargetType[];
            editionDefaults: google.protobuf.FieldOptions.EditionDefault.$Properties[];
            features?: (google.protobuf.FeatureSet.$Properties|null);
            featureSupport?: (google.protobuf.FieldOptions.FeatureSupport.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.FieldOptions.$Shape): google.protobuf.FieldOptions & google.protobuf.FieldOptions.$Shape;
            static create(properties?: google.protobuf.FieldOptions.$Properties): google.protobuf.FieldOptions;
            static encode(message: google.protobuf.FieldOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FieldOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions & google.protobuf.FieldOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions & google.protobuf.FieldOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;
            static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FieldOptions {
            interface $Properties {
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
                editionDefaults?: (google.protobuf.FieldOptions.EditionDefault.$Properties[]|null);
                features?: (google.protobuf.FeatureSet.$Properties|null);
                featureSupport?: (google.protobuf.FieldOptions.FeatureSupport.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FieldOptions.$Properties;

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

            interface IEditionDefault extends google.protobuf.FieldOptions.EditionDefault.$Properties {
            }

            class EditionDefault {
                constructor(properties?: google.protobuf.FieldOptions.EditionDefault.$Properties);
                $unknowns?: Uint8Array[];
                edition: google.protobuf.Edition;
                value: string;
                static create(properties: google.protobuf.FieldOptions.EditionDefault.$Shape): google.protobuf.FieldOptions.EditionDefault & google.protobuf.FieldOptions.EditionDefault.$Shape;
                static create(properties?: google.protobuf.FieldOptions.EditionDefault.$Properties): google.protobuf.FieldOptions.EditionDefault;
                static encode(message: google.protobuf.FieldOptions.EditionDefault.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.FieldOptions.EditionDefault.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions.EditionDefault & google.protobuf.FieldOptions.EditionDefault.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions.EditionDefault & google.protobuf.FieldOptions.EditionDefault.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions.EditionDefault;
                static toObject(message: google.protobuf.FieldOptions.EditionDefault, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace EditionDefault {
                interface $Properties {
                    edition?: (google.protobuf.Edition|null);
                    value?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.FieldOptions.EditionDefault.$Properties;
            }

            interface IFeatureSupport extends google.protobuf.FieldOptions.FeatureSupport.$Properties {
            }

            class FeatureSupport {
                constructor(properties?: google.protobuf.FieldOptions.FeatureSupport.$Properties);
                $unknowns?: Uint8Array[];
                editionIntroduced: google.protobuf.Edition;
                editionDeprecated: google.protobuf.Edition;
                deprecationWarning: string;
                editionRemoved: google.protobuf.Edition;
                static create(properties: google.protobuf.FieldOptions.FeatureSupport.$Shape): google.protobuf.FieldOptions.FeatureSupport & google.protobuf.FieldOptions.FeatureSupport.$Shape;
                static create(properties?: google.protobuf.FieldOptions.FeatureSupport.$Properties): google.protobuf.FieldOptions.FeatureSupport;
                static encode(message: google.protobuf.FieldOptions.FeatureSupport.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.FieldOptions.FeatureSupport.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions.FeatureSupport & google.protobuf.FieldOptions.FeatureSupport.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions.FeatureSupport & google.protobuf.FieldOptions.FeatureSupport.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions.FeatureSupport;
                static toObject(message: google.protobuf.FieldOptions.FeatureSupport, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace FeatureSupport {
                interface $Properties {
                    editionIntroduced?: (google.protobuf.Edition|null);
                    editionDeprecated?: (google.protobuf.Edition|null);
                    deprecationWarning?: (string|null);
                    editionRemoved?: (google.protobuf.Edition|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.FieldOptions.FeatureSupport.$Properties;
            }
        }

        interface IOneofOptions extends google.protobuf.OneofOptions.$Properties {
        }

        class OneofOptions {
            constructor(properties?: google.protobuf.OneofOptions.$Properties);
            $unknowns?: Uint8Array[];
            features?: (google.protobuf.FeatureSet.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.OneofOptions.$Shape): google.protobuf.OneofOptions & google.protobuf.OneofOptions.$Shape;
            static create(properties?: google.protobuf.OneofOptions.$Properties): google.protobuf.OneofOptions;
            static encode(message: google.protobuf.OneofOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.OneofOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions & google.protobuf.OneofOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions & google.protobuf.OneofOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;
            static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace OneofOptions {
            interface $Properties {
                features?: (google.protobuf.FeatureSet.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.OneofOptions.$Properties;
        }

        interface IEnumOptions extends google.protobuf.EnumOptions.$Properties {
        }

        class EnumOptions {
            constructor(properties?: google.protobuf.EnumOptions.$Properties);
            ".jspb.test.IsExtension.simpleOption": string;
            $unknowns?: Uint8Array[];
            allowAlias: boolean;
            deprecated: boolean;
            deprecatedLegacyJsonFieldConflicts: boolean;
            features?: (google.protobuf.FeatureSet.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.EnumOptions.$Shape): google.protobuf.EnumOptions & google.protobuf.EnumOptions.$Shape;
            static create(properties?: google.protobuf.EnumOptions.$Properties): google.protobuf.EnumOptions;
            static encode(message: google.protobuf.EnumOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.EnumOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions & google.protobuf.EnumOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions & google.protobuf.EnumOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;
            static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EnumOptions {
            interface $Properties {
                allowAlias?: (boolean|null);
                deprecated?: (boolean|null);
                deprecatedLegacyJsonFieldConflicts?: (boolean|null);
                features?: (google.protobuf.FeatureSet.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                ".jspb.test.IsExtension.simpleOption"?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.EnumOptions.$Properties;
        }

        interface IEnumValueOptions extends google.protobuf.EnumValueOptions.$Properties {
        }

        class EnumValueOptions {
            constructor(properties?: google.protobuf.EnumValueOptions.$Properties);
            $unknowns?: Uint8Array[];
            deprecated: boolean;
            features?: (google.protobuf.FeatureSet.$Properties|null);
            debugRedact: boolean;
            featureSupport?: (google.protobuf.FieldOptions.FeatureSupport.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.EnumValueOptions.$Shape): google.protobuf.EnumValueOptions & google.protobuf.EnumValueOptions.$Shape;
            static create(properties?: google.protobuf.EnumValueOptions.$Properties): google.protobuf.EnumValueOptions;
            static encode(message: google.protobuf.EnumValueOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.EnumValueOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions & google.protobuf.EnumValueOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions & google.protobuf.EnumValueOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;
            static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EnumValueOptions {
            interface $Properties {
                deprecated?: (boolean|null);
                features?: (google.protobuf.FeatureSet.$Properties|null);
                debugRedact?: (boolean|null);
                featureSupport?: (google.protobuf.FieldOptions.FeatureSupport.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.EnumValueOptions.$Properties;
        }

        interface IServiceOptions extends google.protobuf.ServiceOptions.$Properties {
        }

        class ServiceOptions {
            constructor(properties?: google.protobuf.ServiceOptions.$Properties);
            $unknowns?: Uint8Array[];
            features?: (google.protobuf.FeatureSet.$Properties|null);
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.ServiceOptions.$Shape): google.protobuf.ServiceOptions & google.protobuf.ServiceOptions.$Shape;
            static create(properties?: google.protobuf.ServiceOptions.$Properties): google.protobuf.ServiceOptions;
            static encode(message: google.protobuf.ServiceOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.ServiceOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions & google.protobuf.ServiceOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions & google.protobuf.ServiceOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;
            static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ServiceOptions {
            interface $Properties {
                features?: (google.protobuf.FeatureSet.$Properties|null);
                deprecated?: (boolean|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.ServiceOptions.$Properties;
        }

        interface IMethodOptions extends google.protobuf.MethodOptions.$Properties {
        }

        class MethodOptions {
            constructor(properties?: google.protobuf.MethodOptions.$Properties);
            $unknowns?: Uint8Array[];
            deprecated: boolean;
            idempotencyLevel: google.protobuf.MethodOptions.IdempotencyLevel;
            features?: (google.protobuf.FeatureSet.$Properties|null);
            uninterpretedOption: google.protobuf.UninterpretedOption.$Properties[];
            static create(properties: google.protobuf.MethodOptions.$Shape): google.protobuf.MethodOptions & google.protobuf.MethodOptions.$Shape;
            static create(properties?: google.protobuf.MethodOptions.$Properties): google.protobuf.MethodOptions;
            static encode(message: google.protobuf.MethodOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.MethodOptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions & google.protobuf.MethodOptions.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions & google.protobuf.MethodOptions.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;
            static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MethodOptions {
            interface $Properties {
                deprecated?: (boolean|null);
                idempotencyLevel?: (google.protobuf.MethodOptions.IdempotencyLevel|null);
                features?: (google.protobuf.FeatureSet.$Properties|null);
                uninterpretedOption?: (google.protobuf.UninterpretedOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.MethodOptions.$Properties;

            enum IdempotencyLevel {
                IDEMPOTENCY_UNKNOWN = 0,
                NO_SIDE_EFFECTS = 1,
                IDEMPOTENT = 2
            }
        }

        interface IUninterpretedOption extends google.protobuf.UninterpretedOption.$Properties {
        }

        class UninterpretedOption {
            constructor(properties?: google.protobuf.UninterpretedOption.$Properties);
            $unknowns?: Uint8Array[];
            name: google.protobuf.UninterpretedOption.NamePart.$Properties[];
            identifierValue: string;
            positiveIntValue: (number|bigint);
            negativeIntValue: (number|bigint);
            doubleValue: number;
            stringValue: Uint8Array;
            aggregateValue: string;
            static create(properties: google.protobuf.UninterpretedOption.$Shape): google.protobuf.UninterpretedOption & google.protobuf.UninterpretedOption.$Shape;
            static create(properties?: google.protobuf.UninterpretedOption.$Properties): google.protobuf.UninterpretedOption;
            static encode(message: google.protobuf.UninterpretedOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.UninterpretedOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption & google.protobuf.UninterpretedOption.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption & google.protobuf.UninterpretedOption.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;
            static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UninterpretedOption {
            interface $Properties {
                name?: (google.protobuf.UninterpretedOption.NamePart.$Properties[]|null);
                identifierValue?: (string|null);
                positiveIntValue?: (number|bigint|null);
                negativeIntValue?: (number|bigint|null);
                doubleValue?: (number|null);
                stringValue?: (Uint8Array|null);
                aggregateValue?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.UninterpretedOption.$Properties;

            interface INamePart extends google.protobuf.UninterpretedOption.NamePart.$Properties {
            }

            class NamePart {
                constructor(properties?: google.protobuf.UninterpretedOption.NamePart.$Properties);
                $unknowns?: Uint8Array[];
                namePart: string;
                isExtension: boolean;
                static create(properties: google.protobuf.UninterpretedOption.NamePart.$Shape): google.protobuf.UninterpretedOption.NamePart & google.protobuf.UninterpretedOption.NamePart.$Shape;
                static create(properties?: google.protobuf.UninterpretedOption.NamePart.$Properties): google.protobuf.UninterpretedOption.NamePart;
                static encode(message: google.protobuf.UninterpretedOption.NamePart.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.UninterpretedOption.NamePart.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart & google.protobuf.UninterpretedOption.NamePart.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart & google.protobuf.UninterpretedOption.NamePart.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;
                static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace NamePart {
                interface $Properties {
                    namePart: string;
                    isExtension: boolean;
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.UninterpretedOption.NamePart.$Properties;
            }
        }

        interface IFeatureSet extends google.protobuf.FeatureSet.$Properties {
        }

        class FeatureSet {
            constructor(properties?: google.protobuf.FeatureSet.$Properties);
            $unknowns?: Uint8Array[];
            fieldPresence: google.protobuf.FeatureSet.FieldPresence;
            enumType: google.protobuf.FeatureSet.EnumType;
            repeatedFieldEncoding: google.protobuf.FeatureSet.RepeatedFieldEncoding;
            utf8Validation: google.protobuf.FeatureSet.Utf8Validation;
            messageEncoding: google.protobuf.FeatureSet.MessageEncoding;
            jsonFormat: google.protobuf.FeatureSet.JsonFormat;
            enforceNamingStyle: google.protobuf.FeatureSet.EnforceNamingStyle;
            defaultSymbolVisibility: google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility;
            static create(properties: google.protobuf.FeatureSet.$Shape): google.protobuf.FeatureSet & google.protobuf.FeatureSet.$Shape;
            static create(properties?: google.protobuf.FeatureSet.$Properties): google.protobuf.FeatureSet;
            static encode(message: google.protobuf.FeatureSet.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FeatureSet.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSet & google.protobuf.FeatureSet.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSet & google.protobuf.FeatureSet.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSet;
            static toObject(message: google.protobuf.FeatureSet, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FeatureSet {
            interface $Properties {
                fieldPresence?: (google.protobuf.FeatureSet.FieldPresence|null);
                enumType?: (google.protobuf.FeatureSet.EnumType|null);
                repeatedFieldEncoding?: (google.protobuf.FeatureSet.RepeatedFieldEncoding|null);
                utf8Validation?: (google.protobuf.FeatureSet.Utf8Validation|null);
                messageEncoding?: (google.protobuf.FeatureSet.MessageEncoding|null);
                jsonFormat?: (google.protobuf.FeatureSet.JsonFormat|null);
                enforceNamingStyle?: (google.protobuf.FeatureSet.EnforceNamingStyle|null);
                defaultSymbolVisibility?: (google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FeatureSet.$Properties;

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

            interface IVisibilityFeature extends google.protobuf.FeatureSet.VisibilityFeature.$Properties {
            }

            class VisibilityFeature {
                constructor(properties?: google.protobuf.FeatureSet.VisibilityFeature.$Properties);
                $unknowns?: Uint8Array[];
                static create(properties: google.protobuf.FeatureSet.VisibilityFeature.$Shape): google.protobuf.FeatureSet.VisibilityFeature & google.protobuf.FeatureSet.VisibilityFeature.$Shape;
                static create(properties?: google.protobuf.FeatureSet.VisibilityFeature.$Properties): google.protobuf.FeatureSet.VisibilityFeature;
                static encode(message: google.protobuf.FeatureSet.VisibilityFeature.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.FeatureSet.VisibilityFeature.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSet.VisibilityFeature & google.protobuf.FeatureSet.VisibilityFeature.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSet.VisibilityFeature & google.protobuf.FeatureSet.VisibilityFeature.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSet.VisibilityFeature;
                static toObject(message: google.protobuf.FeatureSet.VisibilityFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace VisibilityFeature {
                interface $Properties {
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.FeatureSet.VisibilityFeature.$Properties;

                enum DefaultSymbolVisibility {
                    DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0,
                    EXPORT_ALL = 1,
                    EXPORT_TOP_LEVEL = 2,
                    LOCAL_ALL = 3,
                    STRICT = 4
                }
            }
        }

        interface IFeatureSetDefaults extends google.protobuf.FeatureSetDefaults.$Properties {
        }

        class FeatureSetDefaults {
            constructor(properties?: google.protobuf.FeatureSetDefaults.$Properties);
            $unknowns?: Uint8Array[];
            defaults: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties[];
            minimumEdition: google.protobuf.Edition;
            maximumEdition: google.protobuf.Edition;
            static create(properties: google.protobuf.FeatureSetDefaults.$Shape): google.protobuf.FeatureSetDefaults & google.protobuf.FeatureSetDefaults.$Shape;
            static create(properties?: google.protobuf.FeatureSetDefaults.$Properties): google.protobuf.FeatureSetDefaults;
            static encode(message: google.protobuf.FeatureSetDefaults.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.FeatureSetDefaults.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSetDefaults & google.protobuf.FeatureSetDefaults.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSetDefaults & google.protobuf.FeatureSetDefaults.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSetDefaults;
            static toObject(message: google.protobuf.FeatureSetDefaults, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FeatureSetDefaults {
            interface $Properties {
                defaults?: (google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties[]|null);
                minimumEdition?: (google.protobuf.Edition|null);
                maximumEdition?: (google.protobuf.Edition|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.FeatureSetDefaults.$Properties;

            interface IFeatureSetEditionDefault extends google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties {
            }

            class FeatureSetEditionDefault {
                constructor(properties?: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties);
                $unknowns?: Uint8Array[];
                edition: google.protobuf.Edition;
                overridableFeatures?: (google.protobuf.FeatureSet.$Properties|null);
                fixedFeatures?: (google.protobuf.FeatureSet.$Properties|null);
                static create(properties: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Shape): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault & google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Shape;
                static create(properties?: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault;
                static encode(message: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault & google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault & google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault;
                static toObject(message: google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace FeatureSetEditionDefault {
                interface $Properties {
                    edition?: (google.protobuf.Edition|null);
                    overridableFeatures?: (google.protobuf.FeatureSet.$Properties|null);
                    fixedFeatures?: (google.protobuf.FeatureSet.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.$Properties;
            }
        }

        interface ISourceCodeInfo extends google.protobuf.SourceCodeInfo.$Properties {
        }

        class SourceCodeInfo {
            constructor(properties?: google.protobuf.SourceCodeInfo.$Properties);
            $unknowns?: Uint8Array[];
            location: google.protobuf.SourceCodeInfo.Location.$Properties[];
            static create(properties: google.protobuf.SourceCodeInfo.$Shape): google.protobuf.SourceCodeInfo & google.protobuf.SourceCodeInfo.$Shape;
            static create(properties?: google.protobuf.SourceCodeInfo.$Properties): google.protobuf.SourceCodeInfo;
            static encode(message: google.protobuf.SourceCodeInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.SourceCodeInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo & google.protobuf.SourceCodeInfo.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo & google.protobuf.SourceCodeInfo.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;
            static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SourceCodeInfo {
            interface $Properties {
                location?: (google.protobuf.SourceCodeInfo.Location.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.SourceCodeInfo.$Properties;

            interface ILocation extends google.protobuf.SourceCodeInfo.Location.$Properties {
            }

            class Location {
                constructor(properties?: google.protobuf.SourceCodeInfo.Location.$Properties);
                $unknowns?: Uint8Array[];
                path: number[];
                span: number[];
                leadingComments: string;
                trailingComments: string;
                leadingDetachedComments: string[];
                static create(properties: google.protobuf.SourceCodeInfo.Location.$Shape): google.protobuf.SourceCodeInfo.Location & google.protobuf.SourceCodeInfo.Location.$Shape;
                static create(properties?: google.protobuf.SourceCodeInfo.Location.$Properties): google.protobuf.SourceCodeInfo.Location;
                static encode(message: google.protobuf.SourceCodeInfo.Location.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.SourceCodeInfo.Location.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location & google.protobuf.SourceCodeInfo.Location.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location & google.protobuf.SourceCodeInfo.Location.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;
                static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Location {
                interface $Properties {
                    path?: (number[]|null);
                    span?: (number[]|null);
                    leadingComments?: (string|null);
                    trailingComments?: (string|null);
                    leadingDetachedComments?: (string[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.SourceCodeInfo.Location.$Properties;
            }
        }

        interface IGeneratedCodeInfo extends google.protobuf.GeneratedCodeInfo.$Properties {
        }

        class GeneratedCodeInfo {
            constructor(properties?: google.protobuf.GeneratedCodeInfo.$Properties);
            $unknowns?: Uint8Array[];
            annotation: google.protobuf.GeneratedCodeInfo.Annotation.$Properties[];
            static create(properties: google.protobuf.GeneratedCodeInfo.$Shape): google.protobuf.GeneratedCodeInfo & google.protobuf.GeneratedCodeInfo.$Shape;
            static create(properties?: google.protobuf.GeneratedCodeInfo.$Properties): google.protobuf.GeneratedCodeInfo;
            static encode(message: google.protobuf.GeneratedCodeInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo & google.protobuf.GeneratedCodeInfo.$Shape;
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo & google.protobuf.GeneratedCodeInfo.$Shape;
            static verify(message: { [k: string]: any }): (string|null);
            static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;
            static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace GeneratedCodeInfo {
            interface $Properties {
                annotation?: (google.protobuf.GeneratedCodeInfo.Annotation.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = google.protobuf.GeneratedCodeInfo.$Properties;

            interface IAnnotation extends google.protobuf.GeneratedCodeInfo.Annotation.$Properties {
            }

            class Annotation {
                constructor(properties?: google.protobuf.GeneratedCodeInfo.Annotation.$Properties);
                $unknowns?: Uint8Array[];
                path: number[];
                sourceFile: string;
                begin: number;
                end: number;
                semantic: google.protobuf.GeneratedCodeInfo.Annotation.Semantic;
                static create(properties: google.protobuf.GeneratedCodeInfo.Annotation.$Shape): google.protobuf.GeneratedCodeInfo.Annotation & google.protobuf.GeneratedCodeInfo.Annotation.$Shape;
                static create(properties?: google.protobuf.GeneratedCodeInfo.Annotation.$Properties): google.protobuf.GeneratedCodeInfo.Annotation;
                static encode(message: google.protobuf.GeneratedCodeInfo.Annotation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.Annotation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation & google.protobuf.GeneratedCodeInfo.Annotation.$Shape;
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation & google.protobuf.GeneratedCodeInfo.Annotation.$Shape;
                static verify(message: { [k: string]: any }): (string|null);
                static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;
                static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Annotation {
                interface $Properties {
                    path?: (number[]|null);
                    sourceFile?: (string|null);
                    begin?: (number|null);
                    end?: (number|null);
                    semantic?: (google.protobuf.GeneratedCodeInfo.Annotation.Semantic|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = google.protobuf.GeneratedCodeInfo.Annotation.$Properties;

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
