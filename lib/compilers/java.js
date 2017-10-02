
function JavaCompiler() {
	this.compile = function (pgm) { return pgm.compile(this); };
	
	this.compileIntegerExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileStringExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
	
	this.compileNameExpression = function (expr) {
		return expr.name();
	}
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};