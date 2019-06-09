"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathIsFile = void 0;

// #!/usr/bin/env node
//para obtener varias rutas absolutas :  console.log(process.env.PATH.split(path.delimiter))
var fs = require('fs');

var fsp = require('fs').promises;

var path = require('path'); // fsp.readdir('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1').then(file => {console.log(file)})
// export const isPathAbsolute = (file) => {
//   return path.isAbsolute(file)
// };
// export const convertToAbs = (relativeFile) => {
//   return path.resolve(relativeFile);
// }
// export const checkExt = (file) => {
//   return path.extname(file)
// }


var getAbsRoute = function getAbsRoute(arr) {
  var files = arr.map(function (file) {
    return path.resolve(file);
  });
  return files;
}; // const readMyDir = (route) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(route, (err, list) => {
//       if (err) throw reject(err);
//       resolve(list) //list is an array with files 
//     });
//   })
// }
// readMyDir('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1').then(result => {
//   getAbsRoute(result)
// })


var pathIsFile = function pathIsFile(route) {
  return new Promise(function (resolve, reject) {
    fsp.stat("C:\\Users\\Kathlen\\Google Drive\\Programaci\xF3n\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1").then(function (stats) {
      var isFile = stats.isFile();
      var isDirectory = stats.isDirectory();
      var arrFiles = [];

      if (isFile) {
        arrFiles.push(route);
        resolve(arrFiles);
      }

      if (isDirectory) {
        fsp.readdir(route).then(function (arrFiles) {
          var faltan = arrFiles.length;
          arrFiles.forEach(function (f) {
            pathIsFile(f).then(function (arr) {
              faltan = faltan - 1;

              if (faltan === 0) {
                console.log(arr);
                resolve(arr);
              }
            });
          }); // const filesAbs = files.map(file => {
          //   path.resolve(file)
          // })
          // filesAbs.forEach(file => {
          //   arrFiles = arrFiles.concat(pathIsFile(file))
          // })  
        });
      }

      console.log(arrFiles);
      return arrFiles;
    });
  });
  /* return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if (err) throw reject(err);
        const isFile = stats.isFile()
      const isDirectory = stats.isDirectory()
        let arrFiles = []
      if (isFile) {
        arrFiles.push(route)
      }
        if (isDirectory) {
        fsp.readdir(route).then(files => {
          const filesAbs = files.map(file => {
            return path.resolve(file)
          })
          return filesAbs.forEach(file => {
            arrFiles = arrFiles.concat(pathIsFile(file))
          })  
        })
      }
      resolve(arrFiles)
    });
  
  }) */
}; // pathIsFile('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1')
// .then(result => console.log(result))


exports.pathIsFile = pathIsFile;