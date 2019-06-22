"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _main = require("./main.js");

exports.mdLinks = function (route, options) {
  return new Promise(function (resolve, reject) {
    if (options && options.validate === true) {
      (0, _main.validateLinks)((0, _main.extractedLinks)(route)).then(function (arrResults) {
        resolve(arrResults);
      });
    } else if (!options || options.validate === false) {
      resolve((0, _main.extractedLinks)(route));
    }
  });
};

