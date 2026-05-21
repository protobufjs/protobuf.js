"use strict";
/* eslint-disable no-unused-vars */

// Global TypeScript helper typedefs. The unused vars anchor these typedefs so
// both TypeScript checkJs and pbts can discover them from this script file.

/**
 * Constructor type.
 * @template T
 * @typedef {Function & { new(...params: any[]): T; prototype: T }} Constructor
 */
var Constructor;

/**
 * Properties type.
 * @template T
 * @typedef {{ [P in keyof T]?: T[P] }} Properties
 */
var Properties;

/**
 * Dynamically reflected message type.
 * @typedef {Message<{}> & { [k: string]: any }} ReflectedMessage
 */
var ReflectedMessage;
