
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

var Types = {
	Integer: 1,
	String: 2,
	Numeric: 3
}

var TypeNames = {
	'int': Types.Integer,
	'string': Types.String,
	'num': Types.Numeric
}

function VariableCommand(name, type, value) {
	this.name = function () { return name; };
	this.type = function () { return type; };
	this.value = function () { return value; };
}

function CompositeCommand(commands) {
	this.commands = function () { return commands; };
}

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
	
	this.parseCommand = function () {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		if (token.type === TokenType.Punctuation && token.value === '{') {
			parseToken(TokenType.Punctuation, '}');
			return new CompositeCommand([]);
		}
		
		lexer.pushToken(token);
		
		var type = parseType();
		var name = parseName();
		var value = null;
		
		if (tryParseToken(TokenType.Operator, '='))
			value = this.parseExpression();
		
		parseToken(TokenType.Punctuation, ';');
		
		return new VariableCommand(name, type, value);
	}
	
	function parseName() {
		var token = lexer.nextToken();

		if (!token)
			throw new Error("Name is expected");
		
		if (token.type !== TokenType.Name)
			throw new Error("Name is expected, found '" + token.value + "'");
		
		return token.value;
	}
	
	function parseToken(type, value) {
		var token = lexer.nextToken();
		
		if (!token)
			throw new Error("Token '" + value + "' is expected");
		
		if (token.type !== type || token.value !== value)
			throw new Error("Token '" + value + "' is expected, found '" + token.value + "'");
	}
	
	function tryParseToken(type, value) {
		var token = lexer.nextToken();
		
		if (token && token.type === type && token.value === value)
			return true;
		
		lexer.pushToken(token);
		
		return false;
	}
	
	function parseType() {
		var name = parseName();
		var type = TypeNames[name];
		
		if (type)
			return type;
		
		throw new Error("Type is expected, found '" + name + "'");
	}
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser,
	Types: Types
};

