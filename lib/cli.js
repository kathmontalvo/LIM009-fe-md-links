#!/usr/bin/env node
"use strict";

var _options = _interopRequireDefault(require("./options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js
var _process$argv = _toArray(process.argv),
    args = _process$argv.slice(2);

var route = args[0]; // https://stackoverflow.com/questions/40628927/using-jest-to-test-a-command-line-tool
// It calls the function only if executed through the command line

(0, _options["default"])(route, args).then(function (result) {
  return console.log(result);
});