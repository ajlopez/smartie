
var parsers = require('./parsers');

function compileText(text) {
	var parser = parsers.parser(text);
	
	return parser.parseCommand();
}

module.exports = {
	compile: compileText
}