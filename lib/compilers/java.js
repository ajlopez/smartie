
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
    this.compileOperator = function (oper) {
        return opers[oper];
    }

	this.visitAssignmentExpression = function (expr) {
		return expr.lvalue().visit(this) + ' = ' + expr.expression().visit(this);
	}
	
	this.visitExpressionCommand = function (cmd) {
		return cmd.expression().visit(this) + ';';
	}
	
	this.visitWhileCommand = function (cmd) {
		return 'while (' + cmd.condition().visit(this) + ') ' + cmd.body().visit(this);
	}
		
	this.visitVariableCommand = function (cmd) {
		var code = compileType(cmd.type()) + ' ' + cmd.name();
		
		var expr = cmd.expression();
		
		if (expr)
			code += ' = ' + compileToType(cmd.type(), expr.visit(this));
		
		return code + ';';
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

