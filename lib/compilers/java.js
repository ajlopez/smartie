
var parsers = require('../parsers');
var Compiler = require('./compiler').Compiler;

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

var visibilities = [];
visibilities[parsers.Visibilities.Private] = 'private';
visibilities[parsers.Visibilities.Public] = 'public';

function compileOperator(oper) {
	return opers[oper];
}

function compileType(type) {
	return types[type];
}

function compileVisibility(visibility) {
	return visibilities[visibility];
}

function compileToType(type, code) {
	if (type == parsers.Types.Numeric)
		return 'new Int256(' + code + ')';
	if (type == parsers.Types.Address)
		return 'new Address(' + code + ')';
	
	return code;
}

function JavaCompiler() {	
	this.visitCallExpression = function (expr) {
		var code = expr.expression().visit(this) + '(';
		
		var args = expr.arguments();

		for (var k = 0; k < args.length; k++) {
			if (k)
				code += ', ';
			
			code += args[k].visit(this);
		}
		
		code += ')';
		
		return code;
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

	
	this.visitFunctionDefinition = function (fndef) {
		var code = compileVisibility(fndef.visibility()) + ' ' + compileType(fndef.type()) + ' ' + fndef.name() + '(';
		var pars = fndef.parameters();
		
		for (var k = 0; k < pars.length; k++) {
			if (k)
				code += ', ';
			
			code += compileType(pars[k].type()) + ' ' + pars[k].name();
		}
		
		code += ') ' + fndef.body().visit(this);
		
		return code;
	}
	
	this.visitContractDefinition = function (cndef) {
		var code = 'class ' + cndef.name() + 'Contract ';
		var is = cndef.is();
		
		if (is)
			code += 'extends ' + is + 'Contract ';
		
		code += cndef.body().visit(this);
		
		return code;
	}
}

// from SimpleTensor
JavaCompiler.prototype = Object.create(Compiler.prototype);
JavaCompiler.prototype.constructor = JavaCompiler;

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};

