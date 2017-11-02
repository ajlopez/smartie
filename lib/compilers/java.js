
var parsers = require('../parsers');

var opers = [];
opers[parsers.Operators.Add] = '+';
opers[parsers.Operators.Subtract] = '-';
opers[parsers.Operators.Multiply] = '*';
opers[parsers.Operators.Divide] = '/';

opers[parsers.Operators.Less] = '<';
opers[parsers.Operators.Greater] = '>';

var types = [];
types[parsers.Types.Integer] = 'int';
types[parsers.Types.String] = 'string';
types[parsers.Types.Numeric] = 'Int256';
types[parsers.Types.Address] = 'Address';

function compileOperator(oper) {
	return opers[oper];
}

function compileType(type) {
	return types[type];
}

function compileToType(type, code) {
	if (type == parsers.Types.Numeric)
		return 'new Int256(' + code + ')';
	if (type == parsers.Types.Address)
		return 'new Address(' + code + ')';
	
	return code;
}

function JavaCompiler() {
	this.compile = function (pgm) { return pgm.visit(this); };
	
	this.visitLeftValue = function (lvalue) {
		return lvalue.name();
	}
	
	this.visitIntegerExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.visitStringExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.visitBooleanExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.visitNameExpression = function (expr) {
		return expr.name();
	}
	
	this.visitDotExpression = function (expr) {
		return expr.expression().visit(this) + '.' + expr.name();
	}
	
	this.visitBinaryExpression = function (expr) {
		return expr.left().visit(this) + ' ' + compileOperator(expr.operator()) + ' ' + expr.right().visit(this);
	}
		
	this.visitAssignmentExpression = function (expr) {
		return expr.lvalue().visit(this) + ' = ' + expr.expression().visit(this);
	}
	
	this.visitReturnCommand = function (cmd) {
        var expr = cmd.expression();
        
        if (expr)
            return "return " + expr.visit(this) + ";";
            
		return "return;";
	}

	this.visitBreakCommand = function (cmd) {
		return "break;";
	}

	this.visitContinueCommand = function (cmd) {
		return "continue;";
	}
	
	this.visitExpressionCommand = function (cmd) {
		return cmd.expression().visit(this) + ';';
	}
	
	this.visitWhileCommand = function (cmd) {
		return 'while (' + cmd.condition().visit(this) + ') ' + cmd.body().visit(this);
	}
		
	this.visitIfCommand = function (cmd) {
		var code = 'if (' + cmd.condition().visit(this) + ') ' + cmd.then().visit(this);
        
        if (!cmd.else())
            return code;
            
        return code + ' else ' + cmd.else().visit(this);
	}
	
	this.visitVariableCommand = function (cmd) {
		var code = compileType(cmd.type()) + ' ' + cmd.name();
		
		var expr = cmd.expression();
		
		if (expr)
			code += ' = ' + compileToType(cmd.type(), expr.visit(this));
		
		return code + ';';
	}

	this.visitCompositeCommand = function (cmd) {
		var cmds = cmd.commands();
		
		var code = '{';
		
		for (var k = 0; k < cmds.length; k++)
			code += ' ' + cmds[k].visit(this);
		
		if (cmds.length)
			code += ' ';
		
		code += '}';
		
		return code;
	}
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};

