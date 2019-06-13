#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _api = require("./api.js");

var mdLinks = function mdLinks(route, options) {
  return new Promise(function (resolve, reject) {
    if (options && options.validate == true) {
      (0, _api.validateLinks)(route).then(function (arrResults) {
        resolve(arrResults);
      });
    } else if (!options || options.validate == false) {
      resolve((0, _api.extractedLinks)(route));
    }
  });
};

exports.mdLinks = mdLinks;
var route = "C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files";
var file = "C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md";
mdLinks(file, {
  validate: true
}).then(function (result) {
  return console.log(result);
});