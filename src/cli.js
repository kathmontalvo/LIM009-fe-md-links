#!/usr/bin/env node

import  { mdLinks }  from './api.js'
import { linkStats } from './main.js'

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js 
const [, , ...args] = process.argv
const route = args[0]

const options = (el, args) => {
  if (args && args[1] == '--validate') {
    return `${el.file} ${el.href} ${el.status} ${el.ok} ${el.text}`
  }
  else if (args == undefined || !args[1]) {
    return `${el.file} ${el.href} ${el.text}`
  }
}

export const cliOpts = (route, args) => {
 return mdLinks(route, { validate: true }).then(result => {
   const basicStats = linkStats(result);
   const basic = 
`Total: ${basicStats.total}
Unique: ${basicStats.unique}`
    const validated = `
Broken: ${basicStats.broken}`
  
    if (args && args[1] == '--stats' && !args[2]) {
      return basic
    } else if (args && args[1] == '--stats' && args[2] == '--validate') {
      return basic + validated
    } else {
      const links = result.map(el => options(el, args)).toString().replace(/,/g, '\n')
      return links
    }
  })
}

// https://stackoverflow.com/questions/40628927/using-jest-to-test-a-command-line-tool

if(require.main === module){
  cliOpts(route, args).then( result => console.log(result))
}