#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filePath = void 0;

var fs = require('fs');

var path = require('path');

var marked = require('marked');

var converToAbs = function converToAbs(relRoute) {
  return path.resolve(relRoute);
};

var isPathAbs = function isPathAbs(route) {
  return path.isAbsolute(route);
};

var getAbsRouteFromFiles = function getAbsRouteFromFiles(arr) {
  return arr.map(function (file) {
    return path.resolve(file);
  });
};

var readDirectory = function readDirectory(route) {
  return fs.readdir(route, function (err, files) {
    if (err) throw err;
    files.forEach(function (f) {
      isRouteFile(f);
    });
  });
};

var isFile = function isFile(route) {
  var stats = fs.statSync(route);
  return stats.isFile();
};

var arrFiles = [];

var filePath = function filePath(route) {
  if (isFile(route) && path.extname(route) === '.md') {
    arrFiles.push(route);
  } else if (!isFile(route)) {
    fs.readdirSync(route).forEach(function (f) {
      filePath(path.join(route, f));
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
      content: fs.readFileSync(file).toString(),
      file: file
    });
  });
  return arrContent;
};

fileContent(route).forEach(function (res) {
  // const tokens = marked.lexer(cont);
  // const html = marked.parser(tokens);
  // // console.log(html);
  // console.log(tokens.links);
  // https://github.com/tcort/markdown-link-extractor/blob/master/index.js
  var links = [];
  var renderer = new marked.Renderer();

  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      text: text,
      file: res.file
    });
  };

  marked(res.content, {
    renderer: renderer
  });
  console.log(links);
  return links;
});