#!/usr/bin/env node

import { mdLinks } from './api.js'
import { linkStats, extractedLinks } from './main.js'

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js 
const [, , ...args] = process.argv
const route = args[0]

const options = el => {
  const notVal = `${el.file} ${el.href} ${el.text}`
  const val = `${el.status} ${el.ok}`
  if (args[1] == '--validate') {
    console.log(notVal, val)
  }
  else if (!args.includes('--stats', '--validate')) {
    console.log(notVal)
  }
}

mdLinks(route, { validate: true }).then(result => {
  result.forEach(options)
  const basicStats = linkStats(result);
  const basic = `
    Total: ${basicStats.total}
    Unique: ${basicStats.unique}`
  const validated = `
    Broken: ${basicStats.broken}`

  if (args[1] == '--stats' && !args[2]) {
    console.log(basic)
  } else if (args[1] == '--stats' && args[2] == '--validate') {
    console.log(basic, validated)
  }
})
