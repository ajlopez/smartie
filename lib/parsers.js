
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

function IntegerExpression(value) {
	this.value = function () { return value; };
}

function StringExpression(value) {
	this.value = function () { return value; };
}

function Parser(text) {
	var lexer = lexers.lexer(text);
	
	this.parseExpression = function () {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		if (token.type === TokenType.Integer)	
			return new IntegerExpression(parseInt(token.value));
		
		if (token.type === TokenType.String)
			return new StringExpression(token.value);
	}
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser
};