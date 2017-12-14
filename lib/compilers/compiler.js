
function Compiler() {

}

Compiler.prototype.compile = function (pgm) { return pgm.visit(this); };
Compiler.prototype.visitLeftValue = function (lvalue) { return lvalue.name(); };
Compiler.prototype.visitIntegerExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitStringExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitBooleanExpression = function (expr) { return JSON.stringify(expr.value()); };
Compiler.prototype.visitNameExpression = function (expr) { return expr.name(); };
Compiler.prototype.visitDotExpression = function (expr) { return expr.expression().visit(this) + '.' + expr.name(); };
Compiler.prototype.visitBinaryExpression = function (expr) { return expr.left().visit(this) + ' ' + this.compileOperator(expr.operator()) + ' ' + expr.right().visit(this); };
		
Compiler.prototype.visitContinueCommand = function (expr) { return 'continue;'; };
Compiler.prototype.visitBreakCommand = function (expr) { return 'break;'; };
Compiler.prototype.visitExpressionCommand = function (cmd) { return cmd.expression().visit(this) + ';'; }

Compiler.prototype.visitCallExpression = function (expr) {
    var code = expr.expression().visit(this) + '(';
    
    var args = expr.arguments();

    for (var k = 0; k < args.length; k++) {
        if (k)
            code += ', ';
        
        code += args[k].visit(this);
    }
    
    code += ')';
    
    return code;
};

Compiler.prototype.visitAssignmentExpression = function (expr) {
	return expr.lvalue().visit(this) + ' = ' + expr.expression().visit(this);
}
	
Compiler.prototype.visitReturnCommand = function (cmd) {
    var expr = cmd.expression();
    
    if (expr)
        return "return " + expr.visit(this) + ";";
        
    return "return;";
};

Compiler.prototype.visitCompositeCommand = function (cmd) {
	var cmds = cmd.commands();
	
	var code = '{';
	
	for (var k = 0; k < cmds.length; k++)
		code += ' ' + cmds[k].visit(this);
	
	if (cmds.length)
		code += ' ';
	
	code += '}';
	
	return code;
}

module.exports = {
	Compiler: Compiler
}

