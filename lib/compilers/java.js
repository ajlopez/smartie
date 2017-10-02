
function JavaCompiler() {
	this.compile = function (pgm) { return pgm.compile(this); };
	
	this.compileIntegerExpression = function (expr) {
		return JSON.stringify(expr.value());
	}
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
};