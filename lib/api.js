"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _main = require("./main");

var _default = function _default(route, options) {
  return new Promise(function (resolve, reject) {
    if (options && options.validate === true) {
      (0, _main.validateLinks)((0, _main.extractedLinks)(route)).then(function (arrResults) {
        resolve(arrResults);
      });
    } else {
      resolve((0, _main.extractedLinks)(route));
    } // reject(console.error);

  });
};

exports["default"] = _default;