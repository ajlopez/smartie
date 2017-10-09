
var parsers = require('../../lib/parsers');
var compilers = require('../../lib/compilers/java');

exports['compile integer'] = function (test) {
	var parser = parsers.parser('42');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '42');
}

exports['compile string'] = function (test) {
	var parser = parsers.parser('"foo"');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '"foo"');
}

exports['compile boolean true'] = function (test) {
	var parser = parsers.parser('true');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, 'true');
}

exports['compile boolean false'] = function (test) {
	var parser = parsers.parser('false');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, 'false');
}

exports['compile name'] = function (test) {
	var parser = parsers.parser('a');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, 'a');
}

exports['compile return'] = function (test) {
	var parser = parsers.parser('return;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'return;');
}

