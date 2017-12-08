
var parsers = require('./parsers');
var javac = require('./compilers/java');

function parseText(text) {
	var parser = parsers.parser(text);
	
	return parser.parseCommand();
}

function compileText(text) {
	var pgm = parseText(text);
	var compiler = javac.compiler();
	
	return compiler.compile(pgm);
}

module.exports = {
	parse: parseText,
	compile: compileText
}