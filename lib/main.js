"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkStats = exports.validateLinks = exports.extractedLinks = exports.fileContent = exports.filePath = exports.isPathAbs = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _marked = _interopRequireDefault(require("marked"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isPathAbs = function isPathAbs(route) {
  return _path["default"].isAbsolute(route);
}; // export const getAbsRoute = (route) => {
//   isPathAbs(route) ? route : path.resolve(route);
// };


exports.isPathAbs = isPathAbs;

var filePath = function filePath(newRoute) {
  var arrFiles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var route = isPathAbs(newRoute) ? newRoute : _path["default"].resolve(newRoute);

  var isFile = _fs["default"].statSync(route).isFile();

  if (isFile && _path["default"].extname(route) === '.md') {
    // .Md .MD .mD
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
  filePath(route).forEach(function (fileRoute) {
    arrContent.push({
      content: _fs["default"].readFileSync(fileRoute).toString(),
      file: fileRoute
    });
  });
  return arrContent;
};

exports.fileContent = fileContent;

var extractedLinks = function extractedLinks(route) {
  var links = [];
  fileContent(route).forEach(function (res) {
    // https://github.com/tcort/markdown-link-extractor/blob/master/index.js
    var render = new _marked["default"].Renderer();

    render.link = function (url, title, urlText) {
      links.push({
        href: url,
        text: urlText,
        file: res.file
      });
    };

    (0, _marked["default"])(res.content, {
      renderer: render
    });
  });
  return links;
};

exports.extractedLinks = extractedLinks;

var validateLinks = function validateLinks(arrObjs) {
  var promiseArr = arrObjs.map(function (element) {
    var url = element.href;
    return (0, _nodeFetch["default"])(url).then(function (res) {
      element.status = res.status;

      if (res.ok) {
        element.ok = 'ok';
      } else {
        element.ok = 'fail';
      }

      return element;
    })["catch"](function (e) {
      element.ok = 'fail';
      element.status = e.message;
      return element;
    }); // test url no server
  });
  return Promise.all(promiseArr);
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
    total: arrObj.length,
    unique: url.size,
    broken: failUrl.length
  };
};

exports.linkStats = linkStats;