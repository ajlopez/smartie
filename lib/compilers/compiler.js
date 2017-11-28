
function Compiler() {

}

Compiler.prototype.compile = function (pgm) { return pgm.visit(this); };

module.exports = {
	Compiler: Compiler
}

