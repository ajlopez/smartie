
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

function compileOperator(oper) {
	return opers[oper];
}

function compileType(type) {
	return types[type];
}

function compileToType(type, code) {
	if (type == parsers.Types.Numeric)
		return 'new Int256(' + code + ')';
	
	return code;
}

function JavaCompiler() {
	this.compile = function (pgm) { return pgm.compile(this); };
	
	this.compileLeftValue = function (lvalue) {
		return lvalue.name();
	}
	
	this.compileIntegerExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileStringExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileBooleanExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileNameExpression = function (expr) {
		return expr.name();
	}
	
	this.compileBinaryExpression = function (expr) {
		return expr.left().compile(this) + ' ' + compileOperator(expr.operator()) + ' ' + expr.right().compile(this);
	}
		
	this.compileAssignmentExpression = function (expr) {
		return expr.lvalue().compile(this) + ' = ' + expr.expression().compile(this);
	}
	
	this.compileReturnCommand = function (cmd) {
        var expr = cmd.expression();
        
        if (expr)
            return "return " + expr.compile(this) + ";";
            
		return "return;";
	}

	this.compileBreakCommand = function (cmd) {
		return "break;";
	}

	this.compileContinueCommand = function (cmd) {
		return "continue;";
	}
	
	this.compileExpressionCommand = function (cmd) {
		return cmd.expression().compile(this) + ';';
	}
	
	this.compileWhileCommand = function (cmd) {
		return 'while (' + cmd.condition().compile(this) + ') ' + cmd.body().compile(this);
	}
		
	this.compileIfCommand = function (cmd) {
		var code = 'if (' + cmd.condition().compile(this) + ') ' + cmd.then().compile(this);
        
        if (!cmd.else())
            return code;
            
        return code + ' else ' + cmd.else().compile(this);
	}
	
	this.compileVariableCommand = function (cmd) {
		var code = compileType(cmd.type()) + ' ' + cmd.name();
		
		var expr = cmd.expression();
		
		if (expr)
			code += ' = ' + compileToType(cmd.type(), expr.compile(this));
		
		return code + ';';
	}

	this.compileCompositeCommand = function (cmd) {
		var cmds = cmd.commands();
		
		var code = '{';
		
		for (var k = 0; k < cmds.length; k++)
			code += ' ' + cmds[k].compile(this);
		
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