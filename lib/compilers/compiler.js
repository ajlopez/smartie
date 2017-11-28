
function Compiler() {

}

Compiler.prototype.compile = function (pgm) { return pgm.visit(this); };
Compiler.prototype.visitLeftValue = function (lvalue) { return lvalue.name(); };
Compiler.prototype.visitIntegerExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitStringExpression = function (expr) { return JSON.stringify(expr.value()); };

module.exports = {
	Compiler: Compiler
}

