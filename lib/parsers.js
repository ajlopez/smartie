
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

var Types = {
	Void: 0,
	Integer: 1,
	String: 2,
	Numeric: 3,
	Address: 4
}

var Visibilities = {
	Private: 0,
	Public: 1,
	Internal: 2,
	External: 3
}

var Operators = {
	Add: 1,
    Subtract: 2,
	Multiply: 3,
	Divide: 4,
	
	Equals: 5,
	NotEquals: 6,
	Less: 7,
	LessEqual: 8,
	Greater: 9,
	GreaterEqual: 10
}

var TypeNames = {
	'void': Types.Void,
	'int': Types.Integer,
	'string': Types.String,
	'num': Types.Numeric,
	'address': Types.Address
}

var VisibilityNames = {
	'private': Visibilities.Private,
	'public': Visibilities.Public,
	'internal': Visibilities.Internal,
	'external': Visibilities.External
}

function Argument(name, type) {
	this.name = function () { return name; };
	this.type = function () { return type; };
}

function LeftValue(name) {
	this.name = function () { return name; };
	
	this.visit = function (visitor) {
		return visitor.visitLeftValue(this);
	}
}	

function ContractCommand(name, is, body) {
	this.name = function () { return name; };
	this.body = function () { return body; };
	this.is = function () { return is; };
	
	this.visit = function (visitor) {
		return visitor.visitContractCommand(this);
	};
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
	
	this.visit = function (visitor) {
		return visitor.visitVariableCommand(this);
	}
}

function ExpressionCommand(expr) {
	this.expression = function () { return expr; };
	
	this.visit = function (visitor) {
		return visitor.visitExpressionCommand(this);
	};
}

function CompositeCommand(commands) {
	this.commands = function () { return commands; };
	
	this.visit = function (visitor) {
		return visitor.visitCompositeCommand(this);
	};
}

function IfCommand(cond, then, elze) {
	this.condition = function () { return cond; };
	this.then = function () { return then; };
	this.else = function () { return elze; };
	
	this.visit = function (visitor) {
		return visitor.visitIfCommand(this);
	};
}

function WhileCommand(cond, body) {
	this.condition = function () { return cond; };
	this.body = function () { return body; };
	
	this.visit = function (visitor) {
		return visitor.visitWhileCommand(this);
	};
}

function BreakCommand() {    
    this.visit = function (visitor) {
        return visitor.visitBreakCommand(this);
    };
}

function ContinueCommand() {
    this.visit = function (visitor) {
        return visitor.visitContinueCommand(this);
    };
}

function FunctionCommand(name, visibility, type, body) {
	this.name = function () { return name; };
	this.type = function () { return type; };
	this.body = function () { return body; };
	this.visibility = function () { return visibility; };
}

function ReturnCommand(expr) {
	this.expression = function () { return expr; };
    this.type = function () {
		if (expr == null)
			return Types.Void;
		
		return expr.type();
	}
	
    this.visit = function (visitor) {
        return visitor.visitReturnCommand(this);
    };
}

function DotExpression(expr, name) {
    this.expression = function () { return expr; };
    this.name = function () { return name; };
	
    this.visit = function (visitor) {
        return visitor.visitDotExpression(this);
    };
}

function CallExpression(expr, args) {
    this.expression = function () { return expr; };
    this.arguments = function () { return args; };
	
    this.visit = function (visitor) {
        return visitor.visitCallExpression(this);
    };
}

function AssignmentExpression(name, expr) {
	var lvalue = new LeftValue(name);
	this.lvalue = function () { return lvalue; };
	this.expression = function () { return expr; };
	this.type = function () { return expr.type(); }
	
    this.visit = function (visitor) {
        return visitor.visitAssignmentExpression(this);
    };
}

function BinaryExpression(oper, left, right) {
	this.operator = function () { return oper; };
	this.left = function () { return left; };
	this.right = function () { return right; };
	
	this.visit = function (visitor) {
		return visitor.visitBinaryExpression(this);
	}
}

function NameExpression(name) {
	this.name = function () { return name; };
	
	this.visit = function (visitor) {
		return visitor.visitNameExpression(this);
	};
}

function IntegerExpression(value) {
	this.value = function () { return value; };
	this.type = function () { return Types.Integer; };
	
	this.visit = function (visitor) {
		return visitor.visitIntegerExpression(this);
	};
}

function StringExpression(value) {
	this.value = function () { return value; };
	this.type = function () { return Types.String; };
	
	this.visit = function (visitor) {
		return visitor.visitStringExpression(this);
	};
}

function BooleanExpression(value) {
	this.value = function () { return value; };
	this.type = function () { return Types.Boolean; };
	
	this.visit = function (visitor) {
		return visitor.visitBooleanExpression(this);
	};
}

function Parser(text) {
	var self = this;
	var lexer = lexers.lexer(text);
	
	this.parseExpression = function () {
		var expr = parseTerm();
		
		if (!expr)
			return null;
		
		if (expr instanceof NameExpression && tryParseToken(TokenType.Operator, '='))
			return new AssignmentExpression(expr.name(), this.parseExpression());

		if (tryParseToken(TokenType.Operator, '+'))
			return new BinaryExpression(Operators.Add, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '-'))
			return new BinaryExpression(Operators.Subtract, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '*'))
			return new BinaryExpression(Operators.Multiply, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '/'))
			return new BinaryExpression(Operators.Divide, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '=='))
			return new BinaryExpression(Operators.Equals, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '!='))
			return new BinaryExpression(Operators.NotEquals, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '<'))
			return new BinaryExpression(Operators.Less, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '<='))
			return new BinaryExpression(Operators.LessEqual, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '>'))
			return new BinaryExpression(Operators.Greater, expr, this.parseExpression());
		if (tryParseToken(TokenType.Operator, '>='))
			return new BinaryExpression(Operators.GreaterEqual, expr, this.parseExpression());

		return expr;
	}
	
	function parseTerm() {
        var expr = parseSimpleTerm();
        
        if (expr == null)
            return null;

        while (true) {
            if (tryParseToken(TokenType.Punctuation, '.')) {
                expr = new DotExpression(expr, parseName());
                continue;
            }

            if (tryParseToken(TokenType.Punctuation, '(')) {
                var args = parseArguments();
                parseToken(TokenType.Punctuation, ')');
                expr = new CallExpression(expr, args);
                continue;
            }
            
            break;
        }
		
		return expr;
	}

	function parseSimpleTerm() {
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
    
    function isCallable(expr) {
        return expr instanceof NameExpression || expr instanceof DotExpression || expr instanceof CallExpression;
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
			var is = null;
			
			if (tryParseToken(TokenType.Name, 'is'))
				is = parseName();
			
			parseToken(TokenType.Punctuation, '{');
			var cmds = parseCommands();
			parseToken(TokenType.Punctuation, '}');
			return new ContractCommand(name, is, new CompositeCommand(cmds));
		}
		
		if (token.type === TokenType.Name && token.value === 'return') {
			var cmd = new ReturnCommand(this.parseExpression());
			parseToken(TokenType.Punctuation, ';');
			return cmd;
		}

		if (token.type === TokenType.Name && token.value === 'function') {
			var visibility = parseVisibility();
			var type = parseType();
			var name = parseName();
			parseToken(TokenType.Punctuation, '(');
			parseToken(TokenType.Punctuation, ')');
			var body = this.parseCommand();
			return new FunctionCommand(name, visibility, type, body);
		}

		if (token.type === TokenType.Name && token.value === 'break') {
			parseToken(TokenType.Punctuation, ';');
			return new BreakCommand();
		}

		if (token.type === TokenType.Name && token.value === 'continue') {
			parseToken(TokenType.Punctuation, ';');
			return new ContinueCommand();
		}

		if (token.type === TokenType.Name && token.value === 'while')
            return parseWhileCommand();

		if (token.type === TokenType.Name && token.value === 'if') {
			parseToken(TokenType.Punctuation, '(');
			var cond = this.parseExpression();
			parseToken(TokenType.Punctuation, ')');
			var then = this.parseCommand();
			var elze = null;
			
			if (tryParseToken(TokenType.Name, 'else'))
				elze = this.parseCommand();
			
			return new IfCommand(cond, then, elze);
		}

		var type = tryType(token);
		
		if (type) {
			var name = parseName();
			
			if (tryParseToken(TokenType.Punctuation, '(')) {
				var args = parseNamedArguments();
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
		
		lexer.pushToken(token);
		
		var expr = this.parseExpression();
		
		if (expr) {
			parseToken(TokenType.Punctuation, ';');
			return new ExpressionCommand(expr);
		}
		
		return null;
	}
    
    function parseWhileCommand() {
        parseToken(TokenType.Punctuation, '(');
        var cond = self.parseExpression();
        parseToken(TokenType.Punctuation, ')');
        var body = self.parseCommand();
        
        return new WhileCommand(cond, body);
    }
	
	function parseNamedArguments() {
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
	
	function parseArguments() {
		var args = [];
		
		for (var token = lexer.nextToken(); token; token = lexer.nextToken()) {
            if (token.type === TokenType.Punctuation && token.value === ')')
                break;
                
			lexer.pushToken(token);
            token = null;
            
            var expr = self.parseExpression();
            
            if (!expr)
                break;
                
            args.push(expr);

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
    
	function parseVisibility() {
		var token = lexer.nextToken();
		
		if (token == null)
			return Visibilities.Private;
		
		if (token.type === TokenType.Name && VisibilityNames[token.value] != null)
			return VisibilityNames[token.value];
		
		lexer.pushToken(token);
		
		return Visibilities.Private;
	}
    
	function parseType() {
		var name = parseName();
		var type = TypeNames[name];
		
		if (type == null)
			throw new Error("Type is expected, found '" + name + "'");
		
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
	Operators: Operators,
	Visibilities: Visibilities
};

