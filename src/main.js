#!/usr/bin/env node

import fs from 'fs';
import path from 'path'
import marked from 'marked'
import fetch from 'node-fetch'
import "regenerator-runtime/runtime";

export const isPathAbs = (route) => {
  return path.isAbsolute(route)
}

export const getAbsRoute = (route) => {
  if (isPathAbs(route)) {
    return route
  } else if (!isPathAbs(route)) {
    return path.resolve(route)
  }
}

export const filePath = (newRoute, arrFiles = []) => {
  const route = getAbsRoute(newRoute)
  const isFile = fs.statSync(route).isFile();
  if (isFile && path.extname(route) === '.md') {
    arrFiles.push(route)
  }
  else if (!isFile) {
    fs.readdirSync(route).forEach((f) => {
      filePath(path.join(route, f), arrFiles)
    })
  }
  return arrFiles
}


export const fileContent = (route) => {
  const arrContent = []
  filePath(route).forEach(file => {
    arrContent.push({
      content: fs.readFileSync(file).toString(),
      file: file
    })
  })
  return arrContent
}


export const extractedLinks = (route) => {
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
  return links;
}


export const validateLinks = (arrObjs) => {
  const promiseArr = arrObjs.map(element => {
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

export const linkStats = (arrObj) => {
  const allUrl = arrObj.map(el => {
    return el.href
  })
  const url = new Set(allUrl);

  const failUrl = arrObj.filter(el => {
    return el.ok === 'fail'
  })

  return {
    total: allUrl.length,
    unique: url.size,
    broken: failUrl.length
  }
}