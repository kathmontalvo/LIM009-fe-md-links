#!/usr/bin/env node

import { validateLinks, extractedLinks } from './main.js'

export const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (options && options.validate == true) {
      validateLinks(route).then((arrResults) => {
        resolve(arrResults)
      })
    } else if (!options || options.validate == false) {
      resolve(extractedLinks(route))
    }
  })
}
