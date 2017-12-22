
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
types[parsers.Types.String] = 'String';
types[parsers.Types.Numeric] = 'Int256';
types[parsers.Types.Address] = 'Address';

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
}

// from SimpleTensor
JavaCompiler.prototype = Object.create(Compiler.prototype);
JavaCompiler.prototype.constructor = JavaCompiler;

JavaCompiler.prototype.compileType = function (type) { return types[type]; };

JavaCompiler.prototype.compileExtends = function () { return 'extends'; };

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};

