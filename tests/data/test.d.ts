import * as $protobuf from "../..";

export namespace jspb {

    namespace test {

        interface IEmpty {
        }

        class Empty {
            constructor(properties?: jspb.test.IEmpty);
        }

        enum OuterEnum {
            FOO = 1,
            BAR = 2
        }

        interface IEnumContainer {
            outerEnum?: jspb.test.OuterEnum;
        }

        class EnumContainer {
            constructor(properties?: jspb.test.IEnumContainer);
        }

        interface ISimple1 {
            aString: string;
            aRepeatedString?: string[];
            aBoolean?: boolean;
        }

        class Simple1 {
            constructor(properties?: jspb.test.ISimple1);
        }

        interface ISimple2 {
            aString: string;
            aRepeatedString?: string[];
        }

        class Simple2 {
            constructor(properties?: jspb.test.ISimple2);
        }

        interface ISpecialCases {
            normal: string;
            default: string;
            function: string;
            var: string;
        }

        class SpecialCases {
            constructor(properties?: jspb.test.ISpecialCases);
        }

        interface IOptionalFields {
            aString?: string;
            aBool: boolean;
            aNestedMessage?: jspb.test.OptionalFields.INested;
            aRepeatedMessage?: jspb.test.OptionalFields.INested[];
            aRepeatedString?: string[];
        }

        class OptionalFields {
            constructor(properties?: jspb.test.IOptionalFields);
        }

        namespace OptionalFields {

            interface INested {
                anInt?: number;
            }

            class Nested {
                constructor(properties?: jspb.test.OptionalFields.INested);
            }
        }

        interface IHasExtensions {
            str1?: string;
            str2?: string;
            str3?: string;
            ".jspb.test.IsExtension.extField"?: jspb.test.IIsExtension;
            ".jspb.test.IndirectExtension.simple"?: jspb.test.ISimple1;
            ".jspb.test.IndirectExtension.str"?: string;
            ".jspb.test.IndirectExtension.repeatedStr"?: string[];
            ".jspb.test.IndirectExtension.repeatedSimple"?: jspb.test.ISimple1[];
            ".jspb.test.simple1"?: jspb.test.ISimple1;
        }

        class HasExtensions {
            constructor(properties?: jspb.test.IHasExtensions);
        }

        interface IComplex {
            aString: string;
            anOutOfOrderBool: boolean;
            aNestedMessage?: jspb.test.Complex.INested;
            aRepeatedMessage?: jspb.test.Complex.INested[];
            aRepeatedString?: string[];
        }

        class Complex {
            constructor(properties?: jspb.test.IComplex);
        }

        namespace Complex {

            interface INested {
                anInt: number;
            }

            class Nested {
                constructor(properties?: jspb.test.Complex.INested);
            }
        }

        interface IOuterMessage {
        }

        class OuterMessage {
            constructor(properties?: jspb.test.IOuterMessage);
        }

        namespace OuterMessage {

            interface IComplex {
                innerComplexField?: number;
            }

            class Complex {
                constructor(properties?: jspb.test.OuterMessage.IComplex);
            }
        }

        interface IIsExtension {
            ext1?: string;
        }

        class IsExtension {
            constructor(properties?: jspb.test.IIsExtension);
        }

        interface IIndirectExtension {
        }

        class IndirectExtension {
            constructor(properties?: jspb.test.IIndirectExtension);
        }

        interface IDefaultValues {
            stringField?: string;
            boolField?: boolean;
            intField?: (number|Long);
            enumField?: jspb.test.DefaultValues.Enum;
            emptyField?: string;
            bytesField?: Uint8Array;
        }

        class DefaultValues {
            constructor(properties?: jspb.test.IDefaultValues);
        }

        namespace DefaultValues {

            enum Enum {
                E1 = 13,
                E2 = 77
            }
        }

        interface IFloatingPointFields {
            optionalFloatField?: number;
            requiredFloatField: number;
            repeatedFloatField?: number[];
            defaultFloatField?: number;
            optionalDoubleField?: number;
            requiredDoubleField: number;
            repeatedDoubleField?: number[];
            defaultDoubleField?: number;
        }

        class FloatingPointFields {
            constructor(properties?: jspb.test.IFloatingPointFields);
        }

        interface ITestClone {
            str?: string;
            simple1?: jspb.test.ISimple1;
            simple2?: jspb.test.ISimple1[];
            bytesField?: Uint8Array;
            unused?: string;
            ".jspb.test.CloneExtension.extField"?: jspb.test.ICloneExtension;
        }

        class TestClone {
            constructor(properties?: jspb.test.ITestClone);
        }

        interface ICloneExtension {
            ext?: string;
        }

        class CloneExtension {
            constructor(properties?: jspb.test.ICloneExtension);
        }

        interface ITestGroup {
            repeatedGroup?: jspb.test.TestGroup.IRepeatedGroup[];
            requiredGroup: jspb.test.TestGroup.IRequiredGroup;
            optionalGroup?: jspb.test.TestGroup.IOptionalGroup;
            id?: string;
            requiredSimple: jspb.test.ISimple2;
            optionalSimple?: jspb.test.ISimple2;
        }

        class TestGroup {
            constructor(properties?: jspb.test.ITestGroup);
        }

        namespace TestGroup {

            interface IRepeatedGroup {
                id: string;
                someBool?: boolean[];
            }

            class RepeatedGroup {
                constructor(properties?: jspb.test.TestGroup.IRepeatedGroup);
            }

            interface IRequiredGroup {
                id: string;
            }

            class RequiredGroup {
                constructor(properties?: jspb.test.TestGroup.IRequiredGroup);
            }

            interface IOptionalGroup {
                id: string;
            }

            class OptionalGroup {
                constructor(properties?: jspb.test.TestGroup.IOptionalGroup);
            }
        }

        interface ITestGroup1 {
            group?: jspb.test.TestGroup.IRepeatedGroup;
        }

        class TestGroup1 {
            constructor(properties?: jspb.test.ITestGroup1);
        }

        interface ITestReservedNames {
            extension?: number;
            ".jspb.test.TestReservedNamesExtension.foo"?: number;
        }

        class TestReservedNames {
            constructor(properties?: jspb.test.ITestReservedNames);
        }

        interface ITestReservedNamesExtension {
        }

        class TestReservedNamesExtension {
            constructor(properties?: jspb.test.ITestReservedNamesExtension);
        }

        interface ITestMessageWithOneof {
            pone?: string;
            pthree?: string;
            rone?: jspb.test.ITestMessageWithOneof;
            rtwo?: string;
            normalField?: boolean;
            repeatedField?: string[];
            aone?: number;
            atwo?: number;
            bone?: number;
            btwo?: number;
        }

        class TestMessageWithOneof {
            constructor(properties?: jspb.test.ITestMessageWithOneof);
        }

        interface ITestEndsWithBytes {
            value?: number;
            data?: Uint8Array;
        }

        class TestEndsWithBytes {
            constructor(properties?: jspb.test.ITestEndsWithBytes);
        }

        interface ITestMapFieldsNoBinary {
            mapStringString?: { [k: string]: string };
            mapStringInt32?: { [k: string]: number };
            mapStringInt64?: { [k: string]: (number|Long) };
            mapStringBool?: { [k: string]: boolean };
            mapStringDouble?: { [k: string]: number };
            mapStringEnum?: { [k: string]: jspb.test.MapValueEnumNoBinary };
            mapStringMsg?: { [k: string]: jspb.test.IMapValueMessageNoBinary };
            mapInt32String?: { [k: string]: string };
            mapInt64String?: { [k: string]: string };
            mapBoolString?: { [k: string]: string };
            testMapFields?: jspb.test.ITestMapFieldsNoBinary;
            mapStringTestmapfields?: { [k: string]: jspb.test.ITestMapFieldsNoBinary };
        }

        class TestMapFieldsNoBinary {
            constructor(properties?: jspb.test.ITestMapFieldsNoBinary);
        }

        enum MapValueEnumNoBinary {
            MAP_VALUE_FOO_NOBINARY = 0,
            MAP_VALUE_BAR_NOBINARY = 1,
            MAP_VALUE_BAZ_NOBINARY = 2
        }

        interface IMapValueMessageNoBinary {
            foo?: number;
        }

        class MapValueMessageNoBinary {
            constructor(properties?: jspb.test.IMapValueMessageNoBinary);
        }

        interface IDeeply {
        }

        class Deeply {
            constructor(properties?: jspb.test.IDeeply);
        }

        namespace Deeply {

            interface INested {
            }

            class Nested {
                constructor(properties?: jspb.test.Deeply.INested);
            }

            namespace Nested {

                interface IMessage {
                    count?: number;
                }

                class Message {
                    constructor(properties?: jspb.test.Deeply.Nested.IMessage);
                }
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        interface IFileDescriptorSet {
            file?: google.protobuf.IFileDescriptorProto[];
        }

        class FileDescriptorSet {
            constructor(properties?: google.protobuf.IFileDescriptorSet);
        }

        interface IFileDescriptorProto {
            name?: string;
            "package"?: string;
            dependency?: string[];
            publicDependency?: number[];
            weakDependency?: number[];
            messageType?: google.protobuf.IDescriptorProto[];
            enumType?: google.protobuf.IEnumDescriptorProto[];
            service?: google.protobuf.IServiceDescriptorProto[];
            extension?: google.protobuf.IFieldDescriptorProto[];
            options?: google.protobuf.IFileOptions;
            sourceCodeInfo?: google.protobuf.ISourceCodeInfo;
            syntax?: string;
        }

        class FileDescriptorProto {
            constructor(properties?: google.protobuf.IFileDescriptorProto);
        }

        interface IDescriptorProto {
            name?: string;
            field?: google.protobuf.IFieldDescriptorProto[];
            extension?: google.protobuf.IFieldDescriptorProto[];
            nestedType?: google.protobuf.IDescriptorProto[];
            enumType?: google.protobuf.IEnumDescriptorProto[];
            extensionRange?: google.protobuf.DescriptorProto.IExtensionRange[];
            oneofDecl?: google.protobuf.IOneofDescriptorProto[];
            options?: google.protobuf.IMessageOptions;
            reservedRange?: google.protobuf.DescriptorProto.IReservedRange[];
            reservedName?: string[];
        }

        class DescriptorProto {
            constructor(properties?: google.protobuf.IDescriptorProto);
        }

        namespace DescriptorProto {

            interface IExtensionRange {
                start?: number;
                end?: number;
            }

            class ExtensionRange {
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);
            }

            interface IReservedRange {
                start?: number;
                end?: number;
            }

            class ReservedRange {
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);
            }
        }

        interface IFieldDescriptorProto {
            name?: string;
            number?: number;
            label?: google.protobuf.FieldDescriptorProto.Label;
            type?: google.protobuf.FieldDescriptorProto.Type;
            typeName?: string;
            extendee?: string;
            defaultValue?: string;
            oneofIndex?: number;
            jsonName?: string;
            options?: google.protobuf.IFieldOptions;
        }

        class FieldDescriptorProto {
            constructor(properties?: google.protobuf.IFieldDescriptorProto);
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

        interface IOneofDescriptorProto {
            name?: string;
            options?: google.protobuf.IOneofOptions;
        }

        class OneofDescriptorProto {
            constructor(properties?: google.protobuf.IOneofDescriptorProto);
        }

        interface IEnumDescriptorProto {
            name?: string;
            value?: google.protobuf.IEnumValueDescriptorProto[];
            options?: google.protobuf.IEnumOptions;
        }

        class EnumDescriptorProto {
            constructor(properties?: google.protobuf.IEnumDescriptorProto);
        }

        interface IEnumValueDescriptorProto {
            name?: string;
            number?: number;
            options?: google.protobuf.IEnumValueOptions;
        }

        class EnumValueDescriptorProto {
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);
        }

        interface IServiceDescriptorProto {
            name?: string;
            method?: google.protobuf.IMethodDescriptorProto[];
            options?: google.protobuf.IServiceOptions;
        }

        class ServiceDescriptorProto {
            constructor(properties?: google.protobuf.IServiceDescriptorProto);
        }

        interface IMethodDescriptorProto {
            name?: string;
            inputType?: string;
            outputType?: string;
            options?: google.protobuf.IMethodOptions;
            clientStreaming?: boolean;
            serverStreaming?: boolean;
        }

        class MethodDescriptorProto {
            constructor(properties?: google.protobuf.IMethodDescriptorProto);
        }

        interface IFileOptions {
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
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class FileOptions {
            constructor(properties?: google.protobuf.IFileOptions);
        }

        namespace FileOptions {

            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        interface IMessageOptions {
            messageSetWireFormat?: boolean;
            noStandardDescriptorAccessor?: boolean;
            deprecated?: boolean;
            mapEntry?: boolean;
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class MessageOptions {
            constructor(properties?: google.protobuf.IMessageOptions);
        }

        interface IFieldOptions {
            ctype?: google.protobuf.FieldOptions.CType;
            packed?: boolean;
            jstype?: google.protobuf.FieldOptions.JSType;
            lazy?: boolean;
            deprecated?: boolean;
            weak?: boolean;
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class FieldOptions {
            constructor(properties?: google.protobuf.IFieldOptions);
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

        interface IOneofOptions {
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class OneofOptions {
            constructor(properties?: google.protobuf.IOneofOptions);
        }

        interface IEnumOptions {
            allowAlias?: boolean;
            deprecated?: boolean;
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
            ".jspb.test.IsExtension.simpleOption"?: string;
        }

        class EnumOptions {
            constructor(properties?: google.protobuf.IEnumOptions);
        }

        interface IEnumValueOptions {
            deprecated?: boolean;
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class EnumValueOptions {
            constructor(properties?: google.protobuf.IEnumValueOptions);
        }

        interface IServiceOptions {
            deprecated?: boolean;
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class ServiceOptions {
            constructor(properties?: google.protobuf.IServiceOptions);
        }

        interface IMethodOptions {
            deprecated?: boolean;
            idempotencyLevel?: google.protobuf.MethodOptions.IdempotencyLevel;
            uninterpretedOption?: google.protobuf.IUninterpretedOption[];
        }

        class MethodOptions {
            constructor(properties?: google.protobuf.IMethodOptions);
        }

        namespace MethodOptions {

            enum IdempotencyLevel {
                IDEMPOTENCY_UNKNOWN = 0,
                NO_SIDE_EFFECTS = 1,
                IDEMPOTENT = 2
            }
        }

        interface IUninterpretedOption {
            name?: google.protobuf.UninterpretedOption.INamePart[];
            identifierValue?: string;
            positiveIntValue?: (number|Long);
            negativeIntValue?: (number|Long);
            doubleValue?: number;
            stringValue?: Uint8Array;
            aggregateValue?: string;
        }

        class UninterpretedOption {
            constructor(properties?: google.protobuf.IUninterpretedOption);
        }

        namespace UninterpretedOption {

            interface INamePart {
                namePart: string;
                isExtension: boolean;
            }

            class NamePart {
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);
            }
        }

        interface ISourceCodeInfo {
            location?: google.protobuf.SourceCodeInfo.ILocation[];
        }

        class SourceCodeInfo {
            constructor(properties?: google.protobuf.ISourceCodeInfo);
        }

        namespace SourceCodeInfo {

            interface ILocation {
                path?: number[];
                span?: number[];
                leadingComments?: string;
                trailingComments?: string;
                leadingDetachedComments?: string[];
            }

            class Location {
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);
            }
        }

        interface IGeneratedCodeInfo {
            annotation?: google.protobuf.GeneratedCodeInfo.IAnnotation[];
        }

        class GeneratedCodeInfo {
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);
        }

        namespace GeneratedCodeInfo {

            interface IAnnotation {
                path?: number[];
                sourceFile?: string;
                begin?: number;
                end?: number;
            }

            class Annotation {
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);
            }
        }
    }
}
