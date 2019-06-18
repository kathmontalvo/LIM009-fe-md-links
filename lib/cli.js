#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cliOpts = void 0;

var _api = require("./api.js");

var _main = require("./main.js");

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js 
var _process$argv = _toArray(process.argv),
    args = _process$argv.slice(2);

var route = args[0];

var options = function options(el, args) {
  var notVal = "".concat(el.file, " ").concat(el.href, " ").concat(el.text);
  var val = "".concat(el.status, " ").concat(el.ok);

  if (args[1] == '--validate') {
    return notVal + val;
  } else if (!args.includes('--stats') && !args.includes('--validate')) {
    return notVal;
  }
};

var cliOpts = function cliOpts(route, args) {
  return (0, _api.mdLinks)(route, {
    validate: true
  }).then(function (result) {
    var basicStats = (0, _main.linkStats)(result);
    var basic = "\n    Total: ".concat(basicStats.total, "\n    Unique: ").concat(basicStats.unique);
    var validated = "\n    Broken: ".concat(basicStats.broken);
    var finalResult;

    if (args[1] == '--stats' && !args[2]) {
      finalResult = basic;
    } else if (args[1] == '--stats' && args[2] == '--validate') {
      finalResult = basic + validated;
    } else {
      result.map(function (el) {
        var notVal = "".concat(el.file, " ").concat(el.href, " ").concat(el.text);
        var val = "".concat(el.status, " ").concat(el.ok);

        if (args[1] == '--validate') {
          finalResult += "".concat(notVal, " ").concat(val, "\n");
        } else if (!args.includes('--stats') && !args.includes('--validate')) {
          finalResult += "".concat(notVal, "\n");
        }
      });
    }

    return finalResult;
  });
}; // https://stackoverflow.com/questions/40628927/using-jest-to-test-a-command-line-tool


exports.cliOpts = cliOpts;

if (require.main === module) {
  cliOpts(route, args).then(function (result) {
    return console.log(result);
  });
}