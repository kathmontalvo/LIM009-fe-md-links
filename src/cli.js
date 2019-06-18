#!/usr/bin/env node

import { mdLinks } from './api.js'
import { linkStats } from './main.js'

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js 
const [, , ...args] = process.argv
const route = args[0]

const options = (el, args) => {
  const notVal = `${el.file} ${el.href} ${el.text}`
  const val = `${el.status} ${el.ok}`
  if (args[1] == '--validate') {
    return notVal + val
  }
  else if (!args.includes('--stats') && !args.includes('--validate')) {
    return notVal
  }
}

export const cliOpts = (route, args) => {
  return mdLinks(route, { validate: true }).then(result => {
    const basicStats = linkStats(result);
    const basic = `
    Total: ${basicStats.total}
    Unique: ${basicStats.unique}`
    const validated = `
    Broken: ${basicStats.broken}`
    
    let finalResult;
    if (args[1] == '--stats' && !args[2]) {
      finalResult = basic
    } else if (args[1] == '--stats' && args[2] == '--validate') {
      finalResult = basic + validated
    } else {
      result.map(el => {
        const notVal = `${el.file} ${el.href} ${el.text}`
        const val = `${el.status} ${el.ok}`
        if (args[1] == '--validate') {
          finalResult += 
`${notVal} ${val}
`
        }
        else if (!args.includes('--stats') && !args.includes('--validate')) {
          finalResult += 
`${notVal}
`
        }
      })
    }
    return finalResult;
  })
}

// https://stackoverflow.com/questions/40628927/using-jest-to-test-a-command-line-tool

if(require.main === module){
  cliOpts(route, args).then( result => console.log(result))
}