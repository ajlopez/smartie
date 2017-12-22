
var parsers = require('../parsers');

var visibilities = [];
visibilities[parsers.Visibilities.Private] = 'private';
visibilities[parsers.Visibilities.Public] = 'public';

function compileVisibility(visibility) {
	return visibilities[visibility];
}

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
Compiler.prototype.visitWhileCommand = function (cmd) { return 'while (' + cmd.condition().visit(this) + ') ' + cmd.body().visit(this); }

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

Compiler.prototype.visitIfCommand = function (cmd) {
	var code = 'if (' + cmd.condition().visit(this) + ') ' + cmd.then().visit(this);
	
	if (!cmd.else())
		return code;
		
	return code + ' else ' + cmd.else().visit(this);
}

Compiler.prototype.visitVariableCommand = function (cmd) {
	var code = this.compileType(cmd.type()) + ' ' + cmd.name();
	
	var expr = cmd.expression();
	
	if (expr)
		code += ' = ' + this.compileToType(cmd.type(), expr.visit(this));
	
	return code + ';';
}
	
Compiler.prototype.visitContractDefinition = function (cndef) {
	var code = 'class ' + cndef.name() + 'Contract ';
	var is = cndef.is();
	
	if (is)
		code += this.compileExtends() + ' ' + is + 'Contract ';
	
	code += cndef.body().visit(this);
	
	return code;
}

Compiler.prototype.visitFunctionDefinition = function (fndef) {
	var code = compileVisibility(fndef.visibility()) + ' ' + this.compileType(fndef.type()) + ' ' + fndef.name() + '(';
	var pars = fndef.parameters();
	
	for (var k = 0; k < pars.length; k++) {
		if (k)
			code += ', ';
		
		code += this.compileType(pars[k].type()) + ' ' + pars[k].name();
	}
	
	code += ') ' + fndef.body().visit(this);
	
	return code;
}
	
Compiler.prototype.compileToType = function (type, code) {
	if (type == parsers.Types.Numeric)
		return 'new Int256(' + code + ')';
	
	if (type == parsers.Types.Address)
		return 'new Address(' + code + ')';
	
	return code;
}
	
module.exports = {
	Compiler: Compiler
}

