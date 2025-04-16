/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

import * as $protobuf from "@ohos/protobufjs";
import Long from 'long';
$protobuf.util.Long=Long
$protobuf.configure()
/** Properties of a RnApmTracker. */
export interface IRnApmTracker {

    /** RnApmTracker rnScriptExecutionTiming */
    rnScriptExecutionTiming?: (IRnPerformanceMeasure|null);

    /** RnApmTracker rnPageFirstAppearTiming */
    rnPageFirstAppearTiming?: (IRnPerformanceMeasure|null);

    /** RnApmTracker rnHttpRequestTiming */
    rnHttpRequestTiming?: (IRnHttpRequestTiming|null);

    /** RnApmTracker rnPerformanceMeasure */
    rnPerformanceMeasure?: (IRnPerformanceMeasure|null);

    /** RnApmTracker rnResourceTiming */
    rnResourceTiming?: (IRnResourceTiming[]|null);

    /** RnApmTracker rnVideoResourceTiming */
    rnVideoResourceTiming?: (IRnVideoResourceTiming|null);

    /** RnApmTracker rnApmContext */
    rnApmContext?: (IRnApmContext|null);

    /** RnApmTracker rnRouteNotFound */
    rnRouteNotFound?: (IRnRouteNotFound|null);
}

/** Represents a RnApmTracker. */
export class RnApmTracker implements IRnApmTracker {

    /**
     * Constructs a new RnApmTracker.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnApmTracker);

    /** RnApmTracker rnScriptExecutionTiming. */
    public rnScriptExecutionTiming?: (IRnPerformanceMeasure|null);

    /** RnApmTracker rnPageFirstAppearTiming. */
    public rnPageFirstAppearTiming?: (IRnPerformanceMeasure|null);

    /** RnApmTracker rnHttpRequestTiming. */
    public rnHttpRequestTiming?: (IRnHttpRequestTiming|null);

    /** RnApmTracker rnPerformanceMeasure. */
    public rnPerformanceMeasure?: (IRnPerformanceMeasure|null);

    /** RnApmTracker rnResourceTiming. */
    public rnResourceTiming: IRnResourceTiming[];

    /** RnApmTracker rnVideoResourceTiming. */
    public rnVideoResourceTiming?: (IRnVideoResourceTiming|null);

    /** RnApmTracker rnApmContext. */
    public rnApmContext?: (IRnApmContext|null);

    /** RnApmTracker rnRouteNotFound. */
    public rnRouteNotFound?: (IRnRouteNotFound|null);

    /**
     * Creates a new RnApmTracker instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnApmTracker instance
     */
    public static create(properties?: IRnApmTracker): RnApmTracker;

    /**
     * Encodes the specified RnApmTracker message. Does not implicitly {@link RnApmTracker.verify|verify} messages.
     * @param message RnApmTracker message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnApmTracker, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnApmTracker message, length delimited. Does not implicitly {@link RnApmTracker.verify|verify} messages.
     * @param message RnApmTracker message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnApmTracker, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnApmTracker message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnApmTracker
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnApmTracker;

    /**
     * Decodes a RnApmTracker message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnApmTracker
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnApmTracker;

    /**
     * Verifies a RnApmTracker message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnApmTracker message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnApmTracker
     */
    public static fromObject(object: { [k: string]: any }): RnApmTracker;

    /**
     * Creates a plain object from a RnApmTracker message. Also converts values to other types if specified.
     * @param message RnApmTracker
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnApmTracker, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnApmTracker to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnApmTracker
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnApmContext. */
export interface IRnApmContext {

    /** RnApmContext fakeAppVersion */
    fakeAppVersion?: (string|null);

    /** RnApmContext isInstanceReuse */
    isInstanceReuse?: (boolean|null);

    /** RnApmContext isInstancePreload */
    isInstancePreload?: (boolean|null);
}

/** Represents a RnApmContext. */
export class RnApmContext implements IRnApmContext {

    /**
     * Constructs a new RnApmContext.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnApmContext);

    /** RnApmContext fakeAppVersion. */
    public fakeAppVersion: string;

    /** RnApmContext isInstanceReuse. */
    public isInstanceReuse: boolean;

    /** RnApmContext isInstancePreload. */
    public isInstancePreload: boolean;

    /**
     * Creates a new RnApmContext instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnApmContext instance
     */
    public static create(properties?: IRnApmContext): RnApmContext;

    /**
     * Encodes the specified RnApmContext message. Does not implicitly {@link RnApmContext.verify|verify} messages.
     * @param message RnApmContext message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnApmContext, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnApmContext message, length delimited. Does not implicitly {@link RnApmContext.verify|verify} messages.
     * @param message RnApmContext message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnApmContext, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnApmContext message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnApmContext
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnApmContext;

    /**
     * Decodes a RnApmContext message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnApmContext
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnApmContext;

    /**
     * Verifies a RnApmContext message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnApmContext message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnApmContext
     */
    public static fromObject(object: { [k: string]: any }): RnApmContext;

    /**
     * Creates a plain object from a RnApmContext message. Also converts values to other types if specified.
     * @param message RnApmContext
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnApmContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnApmContext to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnApmContext
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnHttpRequestTiming. */
export interface IRnHttpRequestTiming {

    /** RnHttpRequestTiming rnPerformanceMeasure */
    rnPerformanceMeasure?: (IRnPerformanceMeasure|null);

    /** RnHttpRequestTiming method */
    method?: (string|null);

    /** RnHttpRequestTiming matchedPath */
    matchedPath?: (string|null);

    /** RnHttpRequestTiming status */
    status?: (number|null);

    /** RnHttpRequestTiming errorCode */
    errorCode?: (number|null);

    /** RnHttpRequestTiming clientErrorMessage */
    clientErrorMessage?: (string|null);

    /** RnHttpRequestTiming errorType */
    errorType?: (string|null);

    /** RnHttpRequestTiming code */
    code?: (string|null);

    /** RnHttpRequestTiming traceId */
    traceId?: (string|null);

    /** RnHttpRequestTiming duration */
    duration?: (number|null);

    /** RnHttpRequestTiming url */
    url?: (string|null);

    /** RnHttpRequestTiming data */
    data?: (string|null);

    /** RnHttpRequestTiming level */
    level?: (string|null);

    /** RnHttpRequestTiming errorMsg */
    errorMsg?: (string|null);

    /** RnHttpRequestTiming networkErrorInfo */
    networkErrorInfo?: (IRnNetworkErrorInfo|null);
}

/** Represents a RnHttpRequestTiming. */
export class RnHttpRequestTiming implements IRnHttpRequestTiming {

    /**
     * Constructs a new RnHttpRequestTiming.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnHttpRequestTiming);

    /** RnHttpRequestTiming rnPerformanceMeasure. */
    public rnPerformanceMeasure?: (IRnPerformanceMeasure|null);

    /** RnHttpRequestTiming method. */
    public method: string;

    /** RnHttpRequestTiming matchedPath. */
    public matchedPath: string;

    /** RnHttpRequestTiming status. */
    public status: number;

    /** RnHttpRequestTiming errorCode. */
    public errorCode: number;

    /** RnHttpRequestTiming clientErrorMessage. */
    public clientErrorMessage: string;

    /** RnHttpRequestTiming errorType. */
    public errorType: string;

    /** RnHttpRequestTiming code. */
    public code: string;

    /** RnHttpRequestTiming traceId. */
    public traceId: string;

    /** RnHttpRequestTiming duration. */
    public duration: number;

    /** RnHttpRequestTiming url. */
    public url: string;

    /** RnHttpRequestTiming data. */
    public data: string;

    /** RnHttpRequestTiming level. */
    public level: string;

    /** RnHttpRequestTiming errorMsg. */
    public errorMsg: string;

    /** RnHttpRequestTiming networkErrorInfo. */
    public networkErrorInfo?: (IRnNetworkErrorInfo|null);

    /**
     * Creates a new RnHttpRequestTiming instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnHttpRequestTiming instance
     */
    public static create(properties?: IRnHttpRequestTiming): RnHttpRequestTiming;

    /**
     * Encodes the specified RnHttpRequestTiming message. Does not implicitly {@link RnHttpRequestTiming.verify|verify} messages.
     * @param message RnHttpRequestTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnHttpRequestTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnHttpRequestTiming message, length delimited. Does not implicitly {@link RnHttpRequestTiming.verify|verify} messages.
     * @param message RnHttpRequestTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnHttpRequestTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnHttpRequestTiming message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnHttpRequestTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnHttpRequestTiming;

    /**
     * Decodes a RnHttpRequestTiming message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnHttpRequestTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnHttpRequestTiming;

    /**
     * Verifies a RnHttpRequestTiming message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnHttpRequestTiming message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnHttpRequestTiming
     */
    public static fromObject(object: { [k: string]: any }): RnHttpRequestTiming;

    /**
     * Creates a plain object from a RnHttpRequestTiming message. Also converts values to other types if specified.
     * @param message RnHttpRequestTiming
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnHttpRequestTiming, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnHttpRequestTiming to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnHttpRequestTiming
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnResourceTiming. */
export interface IRnResourceTiming {

    /** RnResourceTiming name */
    name?: (string|null);

    /** RnResourceTiming entryType */
    entryType?: (string|null);

    /** RnResourceTiming startTime */
    startTime?: (number|null);

    /** RnResourceTiming duration */
    duration?: (number|null);

    /** RnResourceTiming initiatorType */
    initiatorType?: (string|null);

    /** RnResourceTiming nextHopProtocol */
    nextHopProtocol?: (string|null);

    /** RnResourceTiming workerStart */
    workerStart?: (number|null);

    /** RnResourceTiming redirectStart */
    redirectStart?: (number|null);

    /** RnResourceTiming redirectEnd */
    redirectEnd?: (number|null);

    /** RnResourceTiming fetchStart */
    fetchStart?: (number|null);

    /** RnResourceTiming domainLookupStart */
    domainLookupStart?: (number|null);

    /** RnResourceTiming domainLookupEnd */
    domainLookupEnd?: (number|null);

    /** RnResourceTiming connectStart */
    connectStart?: (number|null);

    /** RnResourceTiming connectEnd */
    connectEnd?: (number|null);

    /** RnResourceTiming secureConnectionStart */
    secureConnectionStart?: (number|null);

    /** RnResourceTiming requestStart */
    requestStart?: (number|null);

    /** RnResourceTiming responseStart */
    responseStart?: (number|null);

    /** RnResourceTiming responseEnd */
    responseEnd?: (number|null);

    /** RnResourceTiming transferSize */
    transferSize?: (number|Long|null);

    /** RnResourceTiming encodedBodySize */
    encodedBodySize?: (number|Long|null);

    /** RnResourceTiming decodedBodySize */
    decodedBodySize?: (number|Long|null);

    /** RnResourceTiming location */
    location?: (IRnLocation|null);

    /** RnResourceTiming resourceMeta */
    resourceMeta?: (IRnResourceMeta[]|null);

    /** RnResourceTiming networkErrorInfo */
    networkErrorInfo?: (IRnNetworkErrorInfo|null);
}

/** Represents a RnResourceTiming. */
export class RnResourceTiming implements IRnResourceTiming {

    /**
     * Constructs a new RnResourceTiming.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnResourceTiming);

    /** RnResourceTiming name. */
    public name: string;

    /** RnResourceTiming entryType. */
    public entryType: string;

    /** RnResourceTiming startTime. */
    public startTime: number;

    /** RnResourceTiming duration. */
    public duration: number;

    /** RnResourceTiming initiatorType. */
    public initiatorType: string;

    /** RnResourceTiming nextHopProtocol. */
    public nextHopProtocol: string;

    /** RnResourceTiming workerStart. */
    public workerStart: number;

    /** RnResourceTiming redirectStart. */
    public redirectStart: number;

    /** RnResourceTiming redirectEnd. */
    public redirectEnd: number;

    /** RnResourceTiming fetchStart. */
    public fetchStart: number;

    /** RnResourceTiming domainLookupStart. */
    public domainLookupStart: number;

    /** RnResourceTiming domainLookupEnd. */
    public domainLookupEnd: number;

    /** RnResourceTiming connectStart. */
    public connectStart: number;

    /** RnResourceTiming connectEnd. */
    public connectEnd: number;

    /** RnResourceTiming secureConnectionStart. */
    public secureConnectionStart: number;

    /** RnResourceTiming requestStart. */
    public requestStart: number;

    /** RnResourceTiming responseStart. */
    public responseStart: number;

    /** RnResourceTiming responseEnd. */
    public responseEnd: number;

    /** RnResourceTiming transferSize. */
    public transferSize: (number|Long);

    /** RnResourceTiming encodedBodySize. */
    public encodedBodySize: (number|Long);

    /** RnResourceTiming decodedBodySize. */
    public decodedBodySize: (number|Long);

    /** RnResourceTiming location. */
    public location?: (IRnLocation|null);

    /** RnResourceTiming resourceMeta. */
    public resourceMeta: IRnResourceMeta[];

    /** RnResourceTiming networkErrorInfo. */
    public networkErrorInfo?: (IRnNetworkErrorInfo|null);

    /**
     * Creates a new RnResourceTiming instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnResourceTiming instance
     */
    public static create(properties?: IRnResourceTiming): RnResourceTiming;

    /**
     * Encodes the specified RnResourceTiming message. Does not implicitly {@link RnResourceTiming.verify|verify} messages.
     * @param message RnResourceTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnResourceTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnResourceTiming message, length delimited. Does not implicitly {@link RnResourceTiming.verify|verify} messages.
     * @param message RnResourceTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnResourceTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnResourceTiming message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnResourceTiming;

    /**
     * Decodes a RnResourceTiming message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnResourceTiming;

    /**
     * Verifies a RnResourceTiming message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnResourceTiming message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnResourceTiming
     */
    public static fromObject(object: { [k: string]: any }): RnResourceTiming;

    /**
     * Creates a plain object from a RnResourceTiming message. Also converts values to other types if specified.
     * @param message RnResourceTiming
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnResourceTiming, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnResourceTiming to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnResourceTiming
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnPerformanceMeasure. */
export interface IRnPerformanceMeasure {

    /** RnPerformanceMeasure name */
    name?: (string|null);

    /** RnPerformanceMeasure entryType */
    entryType?: (string|null);

    /** RnPerformanceMeasure startTime */
    startTime?: (number|null);

    /** RnPerformanceMeasure duration */
    duration?: (number|null);
}

/** Represents a RnPerformanceMeasure. */
export class RnPerformanceMeasure implements IRnPerformanceMeasure {

    /**
     * Constructs a new RnPerformanceMeasure.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnPerformanceMeasure);

    /** RnPerformanceMeasure name. */
    public name: string;

    /** RnPerformanceMeasure entryType. */
    public entryType: string;

    /** RnPerformanceMeasure startTime. */
    public startTime: number;

    /** RnPerformanceMeasure duration. */
    public duration: number;

    /**
     * Creates a new RnPerformanceMeasure instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnPerformanceMeasure instance
     */
    public static create(properties?: IRnPerformanceMeasure): RnPerformanceMeasure;

    /**
     * Encodes the specified RnPerformanceMeasure message. Does not implicitly {@link RnPerformanceMeasure.verify|verify} messages.
     * @param message RnPerformanceMeasure message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnPerformanceMeasure, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnPerformanceMeasure message, length delimited. Does not implicitly {@link RnPerformanceMeasure.verify|verify} messages.
     * @param message RnPerformanceMeasure message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnPerformanceMeasure, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnPerformanceMeasure message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnPerformanceMeasure
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnPerformanceMeasure;

    /**
     * Decodes a RnPerformanceMeasure message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnPerformanceMeasure
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnPerformanceMeasure;

    /**
     * Verifies a RnPerformanceMeasure message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnPerformanceMeasure message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnPerformanceMeasure
     */
    public static fromObject(object: { [k: string]: any }): RnPerformanceMeasure;

    /**
     * Creates a plain object from a RnPerformanceMeasure message. Also converts values to other types if specified.
     * @param message RnPerformanceMeasure
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnPerformanceMeasure, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnPerformanceMeasure to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnPerformanceMeasure
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnVideoResourceTiming. */
export interface IRnVideoResourceTiming {

    /** RnVideoResourceTiming uri */
    uri?: (string|null);

    /** RnVideoResourceTiming location */
    location?: (IRnLocation|null);

    /** RnVideoResourceTiming mime */
    mime?: (string|null);

    /** RnVideoResourceTiming size */
    size?: (number|null);

    /** RnVideoResourceTiming duration */
    duration?: (number|null);

    /** RnVideoResourceTiming resolution */
    resolution?: (IRnVideoResolution|null);

    /** RnVideoResourceTiming playComplete */
    playComplete?: (boolean|null);

    /** RnVideoResourceTiming videoLoadingTiming */
    videoLoadingTiming?: (IRnVideoLoadingTiming|null);

    /** RnVideoResourceTiming resourceMeta */
    resourceMeta?: (IRnResourceMeta[]|null);

    /** RnVideoResourceTiming networkErrorInfo */
    networkErrorInfo?: (IRnNetworkErrorInfo|null);
}

/** Represents a RnVideoResourceTiming. */
export class RnVideoResourceTiming implements IRnVideoResourceTiming {

    /**
     * Constructs a new RnVideoResourceTiming.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnVideoResourceTiming);

    /** RnVideoResourceTiming uri. */
    public uri: string;

    /** RnVideoResourceTiming location. */
    public location?: (IRnLocation|null);

    /** RnVideoResourceTiming mime. */
    public mime: string;

    /** RnVideoResourceTiming size. */
    public size: number;

    /** RnVideoResourceTiming duration. */
    public duration: number;

    /** RnVideoResourceTiming resolution. */
    public resolution?: (IRnVideoResolution|null);

    /** RnVideoResourceTiming playComplete. */
    public playComplete: boolean;

    /** RnVideoResourceTiming videoLoadingTiming. */
    public videoLoadingTiming?: (IRnVideoLoadingTiming|null);

    /** RnVideoResourceTiming resourceMeta. */
    public resourceMeta: IRnResourceMeta[];

    /** RnVideoResourceTiming networkErrorInfo. */
    public networkErrorInfo?: (IRnNetworkErrorInfo|null);

    /**
     * Creates a new RnVideoResourceTiming instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnVideoResourceTiming instance
     */
    public static create(properties?: IRnVideoResourceTiming): RnVideoResourceTiming;

    /**
     * Encodes the specified RnVideoResourceTiming message. Does not implicitly {@link RnVideoResourceTiming.verify|verify} messages.
     * @param message RnVideoResourceTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnVideoResourceTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnVideoResourceTiming message, length delimited. Does not implicitly {@link RnVideoResourceTiming.verify|verify} messages.
     * @param message RnVideoResourceTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnVideoResourceTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnVideoResourceTiming message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnVideoResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnVideoResourceTiming;

    /**
     * Decodes a RnVideoResourceTiming message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnVideoResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnVideoResourceTiming;

    /**
     * Verifies a RnVideoResourceTiming message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnVideoResourceTiming message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnVideoResourceTiming
     */
    public static fromObject(object: { [k: string]: any }): RnVideoResourceTiming;

    /**
     * Creates a plain object from a RnVideoResourceTiming message. Also converts values to other types if specified.
     * @param message RnVideoResourceTiming
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnVideoResourceTiming, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnVideoResourceTiming to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnVideoResourceTiming
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnNetworkErrorInfo. */
export interface IRnNetworkErrorInfo {

    /** RnNetworkErrorInfo status */
    status?: (number|null);

    /** RnNetworkErrorInfo info */
    info?: (string|null);
}

/** Represents a RnNetworkErrorInfo. */
export class RnNetworkErrorInfo implements IRnNetworkErrorInfo {

    /**
     * Constructs a new RnNetworkErrorInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnNetworkErrorInfo);

    /** RnNetworkErrorInfo status. */
    public status: number;

    /** RnNetworkErrorInfo info. */
    public info: string;

    /**
     * Creates a new RnNetworkErrorInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnNetworkErrorInfo instance
     */
    public static create(properties?: IRnNetworkErrorInfo): RnNetworkErrorInfo;

    /**
     * Encodes the specified RnNetworkErrorInfo message. Does not implicitly {@link RnNetworkErrorInfo.verify|verify} messages.
     * @param message RnNetworkErrorInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnNetworkErrorInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnNetworkErrorInfo message, length delimited. Does not implicitly {@link RnNetworkErrorInfo.verify|verify} messages.
     * @param message RnNetworkErrorInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnNetworkErrorInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnNetworkErrorInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnNetworkErrorInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnNetworkErrorInfo;

    /**
     * Decodes a RnNetworkErrorInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnNetworkErrorInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnNetworkErrorInfo;

    /**
     * Verifies a RnNetworkErrorInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnNetworkErrorInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnNetworkErrorInfo
     */
    public static fromObject(object: { [k: string]: any }): RnNetworkErrorInfo;

    /**
     * Creates a plain object from a RnNetworkErrorInfo message. Also converts values to other types if specified.
     * @param message RnNetworkErrorInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnNetworkErrorInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnNetworkErrorInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnNetworkErrorInfo
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnLocation. */
export interface IRnLocation {

    /** RnLocation hash */
    hash?: (string|null);

    /** RnLocation host */
    host?: (string|null);

    /** RnLocation hostname */
    hostname?: (string|null);

    /** RnLocation href */
    href?: (string|null);

    /** RnLocation origin */
    origin?: (string|null);

    /** RnLocation pathname */
    pathname?: (string|null);

    /** RnLocation port */
    port?: (string|null);

    /** RnLocation protocol */
    protocol?: (string|null);

    /** RnLocation search */
    search?: (string|null);
}

/** Represents a RnLocation. */
export class RnLocation implements IRnLocation {

    /**
     * Constructs a new RnLocation.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnLocation);

    /** RnLocation hash. */
    public hash: string;

    /** RnLocation host. */
    public host: string;

    /** RnLocation hostname. */
    public hostname: string;

    /** RnLocation href. */
    public href: string;

    /** RnLocation origin. */
    public origin: string;

    /** RnLocation pathname. */
    public pathname: string;

    /** RnLocation port. */
    public port: string;

    /** RnLocation protocol. */
    public protocol: string;

    /** RnLocation search. */
    public search: string;

    /**
     * Creates a new RnLocation instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnLocation instance
     */
    public static create(properties?: IRnLocation): RnLocation;

    /**
     * Encodes the specified RnLocation message. Does not implicitly {@link RnLocation.verify|verify} messages.
     * @param message RnLocation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnLocation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnLocation message, length delimited. Does not implicitly {@link RnLocation.verify|verify} messages.
     * @param message RnLocation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnLocation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnLocation message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnLocation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnLocation;

    /**
     * Decodes a RnLocation message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnLocation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnLocation;

    /**
     * Verifies a RnLocation message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnLocation message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnLocation
     */
    public static fromObject(object: { [k: string]: any }): RnLocation;

    /**
     * Creates a plain object from a RnLocation message. Also converts values to other types if specified.
     * @param message RnLocation
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnLocation, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnLocation to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnLocation
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnVideoResolution. */
export interface IRnVideoResolution {

    /** RnVideoResolution width */
    width?: (number|null);

    /** RnVideoResolution height */
    height?: (number|null);

    /** RnVideoResolution orientation */
    orientation?: (string|null);
}

/** Represents a RnVideoResolution. */
export class RnVideoResolution implements IRnVideoResolution {

    /**
     * Constructs a new RnVideoResolution.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnVideoResolution);

    /** RnVideoResolution width. */
    public width: number;

    /** RnVideoResolution height. */
    public height: number;

    /** RnVideoResolution orientation. */
    public orientation: string;

    /**
     * Creates a new RnVideoResolution instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnVideoResolution instance
     */
    public static create(properties?: IRnVideoResolution): RnVideoResolution;

    /**
     * Encodes the specified RnVideoResolution message. Does not implicitly {@link RnVideoResolution.verify|verify} messages.
     * @param message RnVideoResolution message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnVideoResolution, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnVideoResolution message, length delimited. Does not implicitly {@link RnVideoResolution.verify|verify} messages.
     * @param message RnVideoResolution message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnVideoResolution, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnVideoResolution message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnVideoResolution
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnVideoResolution;

    /**
     * Decodes a RnVideoResolution message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnVideoResolution
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnVideoResolution;

    /**
     * Verifies a RnVideoResolution message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnVideoResolution message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnVideoResolution
     */
    public static fromObject(object: { [k: string]: any }): RnVideoResolution;

    /**
     * Creates a plain object from a RnVideoResolution message. Also converts values to other types if specified.
     * @param message RnVideoResolution
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnVideoResolution, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnVideoResolution to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnVideoResolution
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnVideoLoadingTiming. */
export interface IRnVideoLoadingTiming {

    /** RnVideoLoadingTiming loadStart */
    loadStart?: (number|null);

    /** RnVideoLoadingTiming canPlay */
    canPlay?: (number|null);

    /** RnVideoLoadingTiming bufferTime */
    bufferTime?: (number|null);

    /** RnVideoLoadingTiming playTime */
    playTime?: (number|null);
}

/** Represents a RnVideoLoadingTiming. */
export class RnVideoLoadingTiming implements IRnVideoLoadingTiming {

    /**
     * Constructs a new RnVideoLoadingTiming.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnVideoLoadingTiming);

    /** RnVideoLoadingTiming loadStart. */
    public loadStart: number;

    /** RnVideoLoadingTiming canPlay. */
    public canPlay: number;

    /** RnVideoLoadingTiming bufferTime. */
    public bufferTime: number;

    /** RnVideoLoadingTiming playTime. */
    public playTime: number;

    /**
     * Creates a new RnVideoLoadingTiming instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnVideoLoadingTiming instance
     */
    public static create(properties?: IRnVideoLoadingTiming): RnVideoLoadingTiming;

    /**
     * Encodes the specified RnVideoLoadingTiming message. Does not implicitly {@link RnVideoLoadingTiming.verify|verify} messages.
     * @param message RnVideoLoadingTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnVideoLoadingTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnVideoLoadingTiming message, length delimited. Does not implicitly {@link RnVideoLoadingTiming.verify|verify} messages.
     * @param message RnVideoLoadingTiming message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnVideoLoadingTiming, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnVideoLoadingTiming message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnVideoLoadingTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnVideoLoadingTiming;

    /**
     * Decodes a RnVideoLoadingTiming message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnVideoLoadingTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnVideoLoadingTiming;

    /**
     * Verifies a RnVideoLoadingTiming message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnVideoLoadingTiming message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnVideoLoadingTiming
     */
    public static fromObject(object: { [k: string]: any }): RnVideoLoadingTiming;

    /**
     * Creates a plain object from a RnVideoLoadingTiming message. Also converts values to other types if specified.
     * @param message RnVideoLoadingTiming
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnVideoLoadingTiming, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnVideoLoadingTiming to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnVideoLoadingTiming
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnResourceMeta. */
export interface IRnResourceMeta {

    /** RnResourceMeta type */
    type?: (string|null);

    /** RnResourceMeta value */
    value?: (string|null);
}

/** Represents a RnResourceMeta. */
export class RnResourceMeta implements IRnResourceMeta {

    /**
     * Constructs a new RnResourceMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnResourceMeta);

    /** RnResourceMeta type. */
    public type: string;

    /** RnResourceMeta value. */
    public value: string;

    /**
     * Creates a new RnResourceMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnResourceMeta instance
     */
    public static create(properties?: IRnResourceMeta): RnResourceMeta;

    /**
     * Encodes the specified RnResourceMeta message. Does not implicitly {@link RnResourceMeta.verify|verify} messages.
     * @param message RnResourceMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnResourceMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnResourceMeta message, length delimited. Does not implicitly {@link RnResourceMeta.verify|verify} messages.
     * @param message RnResourceMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnResourceMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnResourceMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnResourceMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnResourceMeta;

    /**
     * Decodes a RnResourceMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnResourceMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnResourceMeta;

    /**
     * Verifies a RnResourceMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnResourceMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnResourceMeta
     */
    public static fromObject(object: { [k: string]: any }): RnResourceMeta;

    /**
     * Creates a plain object from a RnResourceMeta message. Also converts values to other types if specified.
     * @param message RnResourceMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnResourceMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnResourceMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnResourceMeta
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RnRouteNotFound. */
export interface IRnRouteNotFound {

    /** RnRouteNotFound prevPageUrl */
    prevPageUrl?: (string|null);

    /** RnRouteNotFound firstPageUrl */
    firstPageUrl?: (string|null);

    /** RnRouteNotFound prevRoutePath */
    prevRoutePath?: (string|null);

    /** RnRouteNotFound targetRouteName */
    targetRouteName?: (string|null);
}

/** Represents a RnRouteNotFound. */
export class RnRouteNotFound implements IRnRouteNotFound {

    /**
     * Constructs a new RnRouteNotFound.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRnRouteNotFound);

    /** RnRouteNotFound prevPageUrl. */
    public prevPageUrl: string;

    /** RnRouteNotFound firstPageUrl. */
    public firstPageUrl: string;

    /** RnRouteNotFound prevRoutePath. */
    public prevRoutePath: string;

    /** RnRouteNotFound targetRouteName. */
    public targetRouteName: string;

    /**
     * Creates a new RnRouteNotFound instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RnRouteNotFound instance
     */
    public static create(properties?: IRnRouteNotFound): RnRouteNotFound;

    /**
     * Encodes the specified RnRouteNotFound message. Does not implicitly {@link RnRouteNotFound.verify|verify} messages.
     * @param message RnRouteNotFound message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRnRouteNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RnRouteNotFound message, length delimited. Does not implicitly {@link RnRouteNotFound.verify|verify} messages.
     * @param message RnRouteNotFound message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRnRouteNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RnRouteNotFound message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RnRouteNotFound
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RnRouteNotFound;

    /**
     * Decodes a RnRouteNotFound message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RnRouteNotFound
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RnRouteNotFound;

    /**
     * Verifies a RnRouteNotFound message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RnRouteNotFound message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RnRouteNotFound
     */
    public static fromObject(object: { [k: string]: any }): RnRouteNotFound;

    /**
     * Creates a plain object from a RnRouteNotFound message. Also converts values to other types if specified.
     * @param message RnRouteNotFound
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RnRouteNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RnRouteNotFound to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RnRouteNotFound
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
