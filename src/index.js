#!/usr/bin/env node
//para obtener varias rutas absolutas :  console.log(process.env.PATH.split(path.delimiter))
const fs = require('fs')
const path = require('path');

export const isPathAbsolute = (file) => {
  return path.isAbsolute(file)
};

export const convertToAbs = (relativeFile) => {
  return path.resolve(relativeFile);
}

export const pathIsFile = (file) => {
  const stats = fs.statSync(file);
  return stats.isFile()
}

export const checkExt = (file) => {
  return path.extname(file)
}
