#!/usr/bin/env node

import fs from 'fs';
import path from 'path'
import marked from 'marked'
import fetch from 'node-fetch'
import "regenerator-runtime/runtime";

const converToAbs = (relRoute) => {
  return path.resolve(relRoute);
}

const isPathAbs = (route) => {
  return path.isAbsolute(route)
}

const isFile = (route) => {
  const stats = fs.statSync(route);
  return stats.isFile()
}

const getAbsRoute = (route) => {
  if (isPathAbs(route)) {
    return route
  } else if (!isPathAbs(route)) {
    return converToAbs(route)
  }
}

let arrFiles = []
const filePath = (newRoute) => {

  const route = getAbsRoute(newRoute)

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

// const mdOptions = (options) => {
//   options = {}
//   options.validate = true
// }


const links = [];

const extractedLinks = (route) => {

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
  return links;
}


const validateLinks = (file) => {
  const promiseArr = extractedLinks(file).map(element => {
    const url = element.href;
    return fetch(url).then(res => {
      element.status = res.status
      if (res.ok) {
        element.ok = 'ok'
      } else {
        element.ok = 'fail'
      }
      return element
    })
  })
  return Promise.all(promiseArr)
}


const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate == true) {
      validateLinks(route).then((arrResults) => {
        resolve(arrResults)
      })
    } else if (!options || options.validate == false) {
      resolve(extractedLinks(route))
    }
  })
}

mdLinks(route, { validate: true })
  .then(result => console.log(result))