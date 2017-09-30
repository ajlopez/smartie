
var lexers = require('./lexers');

function IntegerExpression(value) {
	this.value = function () { return value; };
}

function Parser(text) {
	var lexer = lexers.lexer(text);
	
	this.parseExpression = function () {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		return new IntegerExpression(parseInt(token.value));
	}
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser
};