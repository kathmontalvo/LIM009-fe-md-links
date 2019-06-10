#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filePath = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _marked = _interopRequireDefault(require("marked"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const path = require('path');
// const marked = require('marked')
var converToAbs = function converToAbs(relRoute) {
  return _path["default"].resolve(relRoute);
};

var isPathAbs = function isPathAbs(route) {
  return _path["default"].isAbsolute(route);
};

var getAbsRouteFromFiles = function getAbsRouteFromFiles(arr) {
  return arr.map(function (file) {
    return _path["default"].resolve(file);
  });
};

var readDirectory = function readDirectory(route) {
  return _fs["default"].readdir(route, function (err, files) {
    if (err) throw err;
    files.forEach(function (f) {
      isRouteFile(f);
    });
  });
};

var isFile = function isFile(route) {
  var stats = _fs["default"].statSync(route);

  return stats.isFile();
};

var arrFiles = [];

var filePath = function filePath(route) {
  if (isFile(route) && _path["default"].extname(route) === '.md') {
    arrFiles.push(route);
  } else if (!isFile(route)) {
    _fs["default"].readdirSync(route).forEach(function (f) {
      filePath(_path["default"].join(route, f));
    });
  }

  return arrFiles;
}; // const route = process.argv[1];


exports.filePath = filePath;
var route = "C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files";
var file = "C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md";

var fileContent = function fileContent(route) {
  var arrContent = [];
  filePath(route).forEach(function (file) {
    arrContent.push({
      content: _fs["default"].readFileSync(file).toString(),
      file: file
    });
  });
  return arrContent;
};

var mdLinks = function mdLinks(route) {
  return new Promise(function (resolve, reject) {
    var links = [];
    fileContent(route).forEach(function (res) {
      // https://github.com/tcort/markdown-link-extractor/blob/master/index.js
      var renderer = new _marked["default"].Renderer();

      renderer.link = function (href, title, text) {
        links.push({
          href: href,
          text: text,
          file: res.file
        });
      };

      (0, _marked["default"])(res.content, {
        renderer: renderer
      });
    });
    resolve(links);
  });
};

mdLinks(file).then(function (res) {
  return console.log(res);
});