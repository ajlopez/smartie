
var parsers = require('./parsers');

function parseText(text) {
	var parser = parsers.parser(text);
	
	return parser.parseCommand();
}

module.exports = {
	parse: parseText
}