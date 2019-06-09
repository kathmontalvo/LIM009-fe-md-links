#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const converToAbs = (relRoute) => {
  return path.resolve(relRoute);
}

const isPathAbs = (route) => {
  return path.isAbsolute(route)
}

const getAbsRouteFromFiles = (arr) => {
  return arr.map(file => {
    return path.resolve(file)
  })
}

const readDirectory = (route) => {
  return fs.readdir(route, (err, files) => {
    if (err) throw err;
    files.forEach((f) => {
      isRouteFile(f)
    })
  })
}

const isFile = (route) => {
  const stats = fs.statSync(route);
  return stats.isFile()
}

// const filePath = (route) => {
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

let arrFiles = []
export const filePath = (route) => {
  if (isFile(route) && path.extname(route) === '.md') {
    arrFiles.push(route)
  }
  else if (!isFile(route)) {
    fs.readdirSync(route).forEach((f) => {
     filePath(path.join(route, f))
    })
  }
  return arrFiles
}

// const isRouteFile = (route) => {
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
const route = 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files';
const file = 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'


// filePath(route).forEach( file => {
//    console.log([fs.readFileSync(file).toString()])
// })

