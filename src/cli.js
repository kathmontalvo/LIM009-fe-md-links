#!/usr/bin/env node

import cliOpts from './options';

// https://stackoverflow.com/questions/30782693/run-function-in-script-from-command-line-node-js
const [, , ...args] = process.argv;
const route = args[0];

// https://stackoverflow.com/questions/40628927/using-jest-to-test-a-command-line-tool
// It calls the function only if executed through the command line

cliOpts(route, args).then(result => console.log(result));
