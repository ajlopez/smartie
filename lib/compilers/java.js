
function JavaCompiler() {
	this.compile = function (pgm) { return pgm.compile(this); };
	
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
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};