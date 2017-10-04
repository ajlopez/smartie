
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

var Types = {
	Integer: 1,
	String: 2,
	Numeric: 3
}

var Operators = {
	Add: 1,
    Subtract: 2,
	Multiply: 3,
	Divide: 4
}

var TypeNames = {
	'int': Types.Integer,
	'string': Types.String,
	'num': Types.Numeric
}

function Argument(name, type) {
	this.name = function () { return name; };
	this.type = function () { return type; };
}

function LeftValue(name) {
	this.name = function () { return name; };
}

function ContractCommand(name, body) {
	this.name = function () { return name; };
	this.body = function () { return body; };
}

function MethodCommand(name, type, args, body) {
	this.name = function () { return name; };
	this.type = function () { return type; };
	this.arguments = function () { return args; };
	this.body = function () { return body; };
}

function VariableCommand(name, type, expr) {
	this.name = function () { return name; };
	this.type = function () { return type; };
	this.expression = function () { return expr; };
}

function AssignCommand(name, expr) {
	var lvalue = new LeftValue(name);
	this.lvalue = function () { return lvalue; };
	this.expression = function () { return expr; };
}

function CompositeCommand(commands) {
	this.commands = function () { return commands; };
}

function ReturnCommand(expr) {
	this.expression = function () { return expr; };
}

function BinaryExpression(oper, left, right) {
	this.operator = function () { return oper; };
	this.left = function () { return left; };
	this.right = function () { return right; };
}

function NameExpression(name) {
	this.name = function () { return name; };
	
	this.compile = function (compiler) {
		return compiler.compileNameExpression(this);
	};
}

function IntegerExpression(value) {
	this.value = function () { return value; };
	
	this.compile = function (compiler) {
		return compiler.compileIntegerExpression(this);
	};
}

function StringExpression(value) {
	this.value = function () { return value; };
	
	this.compile = function (compiler) {
		return compiler.compileStringExpression(this);
	};
}

function BooleanExpression(value) {
	this.value = function () { return value; };
	
	this.compile = function (compiler) {
		return compiler.compileBooleanExpression(this);
	};
}

function Parser(text) {
	var self = this;
	var lexer = lexers.lexer(text);
	
	this.parseExpression = function () {
		var expr = parseTerm();
		
		if (!expr)
			return null;

		if (tryParseToken(TokenType.Operator, '+'))
			return new BinaryExpression(Operators.Add, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '-'))
			return new BinaryExpression(Operators.Subtract, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '*'))
			return new BinaryExpression(Operators.Multiply, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '/'))
			return new BinaryExpression(Operators.Divide, expr, this.parseExpression());

		return expr;
	}
	
	function parseTerm() {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		if (token.type === TokenType.Integer)	
			return new IntegerExpression(parseInt(token.value));
		
		if (token.type === TokenType.String)
			return new StringExpression(token.value);
		
		if (token.type === TokenType.Boolean)
			if (token.value === 'true')
				return new BooleanExpression(true);
			else if (token.value === 'false')
				return new BooleanExpression(false);

		if (token.type === TokenType.Name)
			return new NameExpression(token.value);
		
		lexer.pushToken(token);
	}

	this.parseCommand = function () {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		if (token.type === TokenType.Punctuation && token.value === '{') {
			var cmds = parseCommands();
			parseToken(TokenType.Punctuation, '}');
			return new CompositeCommand(cmds);
		}

		if (token.type === TokenType.Name && token.value === 'contract') {
			var name = parseName();
			parseToken(TokenType.Punctuation, '{');
			var cmds = parseCommands();
			parseToken(TokenType.Punctuation, '}');
			return new ContractCommand(name, new CompositeCommand(cmds));
		}
		
		if (token.type === TokenType.Name && token.value === 'return') {
			var cmd = new ReturnCommand(this.parseExpression());
			parseToken(TokenType.Punctuation, ';');
			return cmd;
		}

		var type = tryType(token);
		
		if (type) {
			var name = parseName();
			
			if (tryParseToken(TokenType.Punctuation, '(')) {
				var args = parseArguments();
				parseToken(TokenType.Punctuation, ')');
				parseToken(TokenType.Punctuation, '{');
				var body = new CompositeCommand(parseCommands());
				parseToken(TokenType.Punctuation, '}');
				
				return new MethodCommand(name, type, args, body);
			}
			
			var value = null;
			
			if (tryParseToken(TokenType.Operator, '='))
				value = this.parseExpression();
			
			parseToken(TokenType.Punctuation, ';');
			
			return new VariableCommand(name, type, value);
		}
		
		if (token.type === TokenType.Name && tryParseToken(TokenType.Operator, '=')) {
			var expr = this.parseExpression();
			parseToken(TokenType.Punctuation, ';');
			
			return new AssignCommand(token.name, expr);
		}
		
		lexer.pushToken(token);
		
		return null;
	}
	
	function parseArguments() {
		var args = [];
		
		for (var token = lexer.nextToken(); token && token.type === TokenType.Name; token = lexer.nextToken()) {
			lexer.pushToken(token);
			token = null;
			
			var type = parseType();
			var name = parseName();
			
			args.push(new Argument(name, type));

			if (!tryParseToken(TokenType.Punctuation, ','))
				break;
		}
		
		if (token)
			lexer.pushToken(token);
		
		return args;
	}
	
	function parseCommands() {
		var cmds = [];
		
		for (var cmd = self.parseCommand(); cmd; cmd = self.parseCommand())
			cmds.push(cmd);
		
		return cmds;
	}
	
	function parseName() {
		var token = lexer.nextToken();

		if (!token)
			throw new Error("Name is expected");
		
		if (token.type !== TokenType.Name)
			throw new Error("Name is expected, found '" + token.value + "'");
		
		return token.value;
	}
	
	function parseType() {
		var name = parseName();
		var type = TypeNames[name];
		
		if (!type)
			throw new Error("Type is expected, found '" + name + "0");
		
		return type;
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
	
	function tryType(token) {
		if (!token || token.type !== TokenType.Name)
			return null;
		
		return TypeNames[token.value];
	}	
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser,
	Types: Types,
	Operators: Operators
};

