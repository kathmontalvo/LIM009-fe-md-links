#!/usr/bin/env node
"use strict";

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

var options = function options(el) {
  var notVal = "".concat(el.file, " ").concat(el.href, " ").concat(el.text);
  var val = "".concat(el.status, " ").concat(el.ok);

  if (args[1] == '--validate') {
    console.log(notVal, val);
  } else if (!args.includes('--stats', '--validate')) {
    console.log(notVal);
  }
};

(0, _api.mdLinks)(route, {
  validate: true
}).then(function (result) {
  result.forEach(options);
  var basicStats = (0, _main.linkStats)(result);
  var basic = "\n    Total: ".concat(basicStats.total, "\n    Unique: ").concat(basicStats.unique);
  var validated = "\n    Broken: ".concat(basicStats.broken);

  if (args[1] == '--stats' && !args[2]) {
    console.log(basic);
  } else if (args[1] == '--stats' && args[2] == '--validate') {
    console.log(basic, validated);
  }
});