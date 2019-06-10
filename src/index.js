#!/usr/bin/env node

import fs from 'fs';
import path from 'path'
import marked from 'marked'

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


// const route = process.argv[1];
const route = 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files'
const file = 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'

const fileContent = (route) => {
  const arrContent = []
  filePath(route).forEach(file => {
    arrContent.push({
      content: fs.readFileSync(file).toString(),
      file: file
    })
  })
  return arrContent
}



const mdLinks = (route) => {
  return new Promise((resolve, reject) => {
    const links = [];

    fileContent(route).forEach(res => {
      // https://github.com/tcort/markdown-link-extractor/blob/master/index.js

      const renderer = new marked.Renderer();

      renderer.link = (href, title, text) => {
        links.push({
          href: href,
          text: text,
          file: res.file
        });
      };
      marked(res.content, { renderer: renderer });
    })
    resolve(links);
  })
}

mdLinks(file).then(res => console.log(res)) 


