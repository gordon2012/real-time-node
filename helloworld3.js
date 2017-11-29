var fs = require('fs');

var ASQ = require('asynquence');
require('asynquence-contrib');

function readFile(filename) {
    return ASQ(function(done) {
        var stream = fs.createReadStream(filename);
        var contents = '';

        stream.pipe(fs.createWriteStream(filename + '.backup'));

        stream.on('data', function(chunk) {
            console.log('DATA');
            contents += chunk;
        });
        stream.on('end', function() {
            done(contents);
        });
    });


    fs.readFile( filename, sq.errfcb() );
    return sq;
}

function delayMsg(done, contents) {
    setTimeout(function() {
        done(contents);
    }, 1000);
}

function say(filename) {
    return readFile(filename)
        .then(delayMsg);
}

module.exports.say = say;
