#!/usr/bin/env node

function printHelp() {
    console.log('1.js (c) Anonymous');
    console.log('');
    console.log('usage:');
    console.log('--help         print this help');
    console.log('--file={NAME}  read the file {NAME} and output');
    console.log('');
}

var args = require('minimist')(process.argv.slice(2), { string: 'file' })

if(args.help || !args.file) {
    printHelp();
    process.exit(1);
}

var hello = require('./helloworld.js');

hello.say(args.file, function(err, contents) {
    if(err) {
        console.error(`No such file ${args.file}`);
        printHelp();
        process.exit(err.errno);
    }
    console.log(contents.toString());
});
