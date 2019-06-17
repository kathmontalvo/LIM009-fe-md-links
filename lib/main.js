#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkStats = exports.validateLinks = exports.extractedLinks = exports.fileContent = exports.filePath = exports.getAbsRoute = exports.isPathAbs = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _marked = _interopRequireDefault(require("marked"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isPathAbs = function isPathAbs(route) {
  return _path["default"].isAbsolute(route);
};

exports.isPathAbs = isPathAbs;

var getAbsRoute = function getAbsRoute(route) {
  if (isPathAbs(route)) {
    return route;
  } else if (!isPathAbs(route)) {
    return _path["default"].resolve(route);
  }
};

exports.getAbsRoute = getAbsRoute;

var filePath = function filePath(newRoute) {
  var arrFiles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var route = getAbsRoute(newRoute);

  var isFile = _fs["default"].statSync(route).isFile();

  if (isFile && _path["default"].extname(route) === '.md') {
    arrFiles.push(route);
  } else if (!isFile) {
    _fs["default"].readdirSync(route).forEach(function (f) {
      filePath(_path["default"].join(route, f), arrFiles);
    });
  }

  return arrFiles;
};

exports.filePath = filePath;

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

exports.fileContent = fileContent;

var extractedLinks =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(route) {
    var links;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            links = [];
            _context.next = 3;
            return fileContent(route).forEach(function (res) {
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

          case 3:
            return _context.abrupt("return", links);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function extractedLinks(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.extractedLinks = extractedLinks;

var validateLinks = function validateLinks(route) {
  return extractedLinks(route).then(function (file) {
    var promiseArr = file.map(function (element) {
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
  });
};

exports.validateLinks = validateLinks;

var linkStats = function linkStats(arrObj) {
  var allUrl = arrObj.map(function (el) {
    return el.href;
  });
  var url = new Set(allUrl);
  var failUrl = arrObj.filter(function (el) {
    return el.ok === 'fail';
  });
  return {
    total: allUrl.length,
    unique: url.size,
    broken: failUrl.length
  };
};

exports.linkStats = linkStats;