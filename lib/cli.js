#!/usr/bin/env node
// import { validateLinks, extractedLinks } from './api.js'
// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js 
"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _process$argv = _toArray(process.argv),
    args = _process$argv.slice(2);

if (args.includes('main')) {
  console.log("Hola mundo ".concat(args));
}