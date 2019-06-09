// #!/usr/bin/env node
//para obtener varias rutas absolutas :  console.log(process.env.PATH.split(path.delimiter))
const fs = require('fs');
const fsp = require('fs').promises
const path = require('path');

// fsp.readdir('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1').then(file => {console.log(file)})

// export const isPathAbsolute = (file) => {
//   return path.isAbsolute(file)
// };

// export const convertToAbs = (relativeFile) => {
//   return path.resolve(relativeFile);
// }


// export const checkExt = (file) => {
//   return path.extname(file)
// }


const getAbsRoute = (arr) => {
  const files = arr.map(file => {
    return path.resolve(file)
  })
  return files
}

// const readMyDir = (route) => {
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

export const pathIsFile = (route) => {
  return new Promise((resolve, reject) => {

    fsp.stat('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1').then(stats => {
      const isFile = stats.isFile();
      const isDirectory = stats.isDirectory();

      let arrFiles = []
      if (isFile) {
        arrFiles.push(route)
        resolve(arrFiles)

      }

      if (isDirectory) {
        fsp.readdir(route).then(arrFiles => {
          let faltan = arrFiles.length;
          arrFiles.forEach(f => {
            pathIsFile(f).then((arr) => {
              faltan = faltan - 1;
              if (faltan === 0) {
                console.log(arr)
                resolve(arr)
              }
            })
          })
          // const filesAbs = files.map(file => {
          //   path.resolve(file)
          // })
          // filesAbs.forEach(file => {
          //   arrFiles = arrFiles.concat(pathIsFile(file))
          // })  
        })
      }

      console.log(arrFiles)
      return arrFiles
    })
  })
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
}

// pathIsFile('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1')
  // .then(result => console.log(result))

