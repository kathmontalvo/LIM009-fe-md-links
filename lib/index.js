#!/usr/bin/env node
"use strict";

var fs = require('fs');

var path = require('path');

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
}; // const filePath = (route) => {
//   // let arrFiles = []
//   if (isFile(route)) {
//     // arrFiles.push(route);
//     console.log('arrFiles')
//   }
// if(isDirectory(route)) {
//   fs.readdir(route, (err, files) => {
//     if (err) throw err;
//     files.forEach((f) => {
//       console.log(f)
//       arrFiles.concat(filePath(path.join(route, f)))
//     })
//   })
// }
//   // console.log(arrFiles)
//   // return arrFiles
// }


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
}; // const isRouteFile = (route) => {
//   let arrFiles = []
//   return fs.stat(route, (err, stats) => {
//     if (err) throw err;
//     if (stats.isFile() && path.extname(route) === '.md') {
//       arrFiles.push(route);
//       console.log(arrFiles)
//     } else if (stats.isDirectory()) {
//       fs.readdir(route, (err, files) => {
//         if (err) throw err;
//         files.forEach((f) => {
//           arrFiles = arrFiles.concat(isRouteFile(path.join(route, f)))
//         })
//       })
//     }
//     return arrFiles
//   })
// }
// const route = process.argv[1];


var route = "C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files";
var file = "C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md";
filePath(route).forEach(function (file) {
  console.log([fs.readFileSync(file).toString()]);
});