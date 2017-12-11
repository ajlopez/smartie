
var parsers = require('../parsers');
var Compiler = require('./compiler').Compiler;

var opers = [];
opers[parsers.Operators.Add] = '+';
opers[parsers.Operators.Subtract] = '-';
opers[parsers.Operators.Multiply] = '*';
opers[parsers.Operators.Divide] = '/';

function CSharpCompiler() {	
    this.compileOperator = function (oper) {
        return opers[oper];
    }
}

// from SimpleTensor
CSharpCompiler.prototype = Object.create(Compiler.prototype);
CSharpCompiler.prototype.constructor = CSharpCompiler;

function createCompiler() {
	return new CSharpCompiler();
}

module.exports = {
	compiler: createCompiler
};
