
var smartie = require('../..');

var fs = require('fs');

var text = fs.readFileSync(process.argv[2]).toString();

console.log(smartie.compile(text));
