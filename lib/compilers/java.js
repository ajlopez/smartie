
function JavaCompiler() {
	this.compile = function (pgm) { return pgm.compile(this); };
	
	this.compileLeftValue = function (lvalue) {
		return lvalue.name();
	}
	
	this.compileIntegerExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileStringExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileBooleanExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileNameExpression = function (expr) {
		return expr.name();
	}
		
	this.compileAssignmentExpression = function (expr) {
		return expr.lvalue().compile(this) + ' = ' + expr.expression().compile(this);
	}
	
	this.compileReturnCommand = function (cmd) {
        var expr = cmd.expression();
        
        if (expr)
            return "return " + expr.compile(this) + ";";
            
		return "return;";
	}

	this.compileBreakCommand = function (cmd) {
		return "break;";
	}

	this.compileContinueCommand = function (cmd) {
		return "continue;";
	}
	
	this.compileExpressionCommand = function (cmd) {
		return cmd.expression().compile(this) + ';';
	}
	
	this.compileCompositeCommand = function (cmd) {
		var cmds = cmd.commands();
		
		var code = '{';
		
		for (var k = 0; k < cmds.length; k++)
			code += ' ' + cmds[k].compile(this);
		
		if (cmds.length)
			code += ' ';
		
		code += '}';
		
		return code;
	}
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};