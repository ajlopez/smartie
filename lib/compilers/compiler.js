
function Compiler() {

}

Compiler.prototype.compile = function (pgm) { return pgm.visit(this); };
Compiler.prototype.visitLeftValue = function (lvalue) { return lvalue.name(); };
Compiler.prototype.visitIntegerExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitStringExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitBooleanExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitNameExpression = function (expr) { return expr.name(); };

module.exports = {
	Compiler: Compiler
}

