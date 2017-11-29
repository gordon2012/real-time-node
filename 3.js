#!/usr/bin/env node

var hello = require('./helloworld3.js');
var args = require('minimist')(process.argv.slice(2), { string: 'file' })

function printHelp() {
    console.log('3.js (c) Anonymous');
    console.log('');
    console.log('usage:');
    console.log('--help         print this help');
    console.log('--file={NAME}  read the file {NAME} and output');
    console.log('');
}

if(args.help || !args.file) {
    printHelp();
    process.exit(1);
}

hello.say(args.file)
    .val(function(contents) {
        console.log(contents.toString());
    })
    .or(function(err) {
        console.log('Error: ' + err);
    });
