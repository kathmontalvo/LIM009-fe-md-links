"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api"));

var _main = require("./main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(route, args) {
  if (args && (args[1] === '--validate' || args[1] === '-v')) {
    return (0, _api["default"])(route, {
      validate: true
    }).then(function (result) {
      return result.map(function (el) {
        return "".concat(el.file, " ").concat(el.href, " ").concat(el.status, " ").concat(el.ok, " ").concat(el.text);
      }).toString().replace(/,/g, '\n');
    })["catch"](console.error);
  }

  if (args && (args[1] === '--stats' || args[1] === '-s') && !args[2]) {
    return (0, _api["default"])(route, {
      validate: true
    }).then(function (result) {
      var basicStats = (0, _main.linkStats)(result);
      return "Total: ".concat(basicStats.total, "\nUnique: ").concat(basicStats.unique);
    })["catch"](console.error);
  }

  if (args && (args[1] === '--stats' || args[1] === '-s') && (args[2] === '--validate' || args[2] === '-v')) {
    return (0, _api["default"])(route, {
      validate: true
    }).then(function (result) {
      var basicStats = (0, _main.linkStats)(result);
      return "Total: ".concat(basicStats.total, "\nUnique: ").concat(basicStats.unique, "\nBroken: ").concat(basicStats.broken);
    })["catch"](console.error);
  }

  return (0, _api["default"])(route).then(function (result) {
    return result.map(function (el) {
      return "".concat(el.file, " ").concat(el.href, " ").concat(el.text);
    }).toString().replace(/,/g, '\n');
  })["catch"](console.error);
};

exports["default"] = _default;