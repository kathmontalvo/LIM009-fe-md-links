#!/usr/bin/env node

// import { validateLinks, extractedLinks } from './api.js'

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js 
const [, , ...args] = process.argv

if (args.includes('main')) {
    console.log(`Hola mundo ${args}`)
}