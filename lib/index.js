#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _marked = _interopRequireDefault(require("marked"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var converToAbs = function converToAbs(relRoute) {
  return _path["default"].resolve(relRoute);
};

var isPathAbs = function isPathAbs(route) {
  return _path["default"].isAbsolute(route);
};

var isFile = function isFile(route) {
  var stats = _fs["default"].statSync(route);

  return stats.isFile();
};

var getAbsRoute = function getAbsRoute(route) {
  if (isPathAbs(route)) {
    return route;
  } else if (!isPathAbs(route)) {
    return converToAbs(route);
  }
};

var arrFiles = [];

var filePath = function filePath(newRoute) {
  var route = getAbsRoute(newRoute);

  if (isFile(route) && _path["default"].extname(route) === '.md') {
    arrFiles.push(route);
  } else if (!isFile(route)) {
    _fs["default"].readdirSync(route).forEach(function (f) {
      filePath(_path["default"].join(route, f));
    });
  }

  return arrFiles;
}; // const route = process.argv[1];


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
}; // const mdOptions = (options) => {
//   options = {}
//   options.validate = true
// }


var links = [];

var extractedLinks = function extractedLinks(route) {
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
  return links;
};

var validateLinks = function validateLinks(file) {
  var promiseArr = extractedLinks(file).map(function (element) {
    var url = element.href;
    return (0, _nodeFetch["default"])(url).then(function (res) {
      element.status = res.status;

      if (res.ok) {
        element.ok = 'ok';
      } else {
        element.ok = 'fail';
      }

      return element;
    });
  });
  return Promise.all(promiseArr);
}; // validateLinks(route).then((arrResults) => {
//   console.log(arrResults)
// })


var mdLinks = function mdLinks(route, options) {
  return new Promise(function (resolve, reject) {
    if (options.validate == true) {
      validateLinks(route).then(function (arrResults) {
        resolve(arrResults);
      });
    } else if (!options || options.validate == false) {
      resolve(extractedLinks(route));
    }
  });
};

mdLinks(route, {
  validate: true
}).then(function (result) {
  return console.log(result);
});