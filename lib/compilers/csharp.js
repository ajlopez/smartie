
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

function CSharpCompiler() {	
    this.compileOperator = function (oper) {
        return opers[oper];
    }
}

// from SimpleTensor
CSharpCompiler.prototype = Object.create(Compiler.prototype);
CSharpCompiler.prototype.constructor = CSharpCompiler;

CSharpCompiler.prototype.compileType = function (type) { return types[type]; };

CSharpCompiler.prototype.compileExtends = function () { return ':'; };

function createCompiler() {
	return new CSharpCompiler();
}

module.exports = {
	compiler: createCompiler
};
