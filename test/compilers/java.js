
var parsers = require('../../lib/parsers');
var compilers = require('../../lib/compilers/java');

exports['compile integer'] = function (test) {
	var parser = parsers.parser('42');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '42');
}

exports['compile add'] = function (test) {
	var parser = parsers.parser('41 + 1');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '41 + 1');
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

exports['compile return with expression'] = function (test) {
	var parser = parsers.parser('return 42;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'return 42;');
}

exports['compile break command'] = function (test) {
	var parser = parsers.parser('break;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'break;');
}

exports['compile continue command'] = function (test) {
	var parser = parsers.parser('continue;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'continue;');
}

exports['compile assignment expression'] = function (test) {
	var parser = parsers.parser('a = 42');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, 'a = 42');
}

exports['compile empty composite command'] = function (test) {
	var parser = parsers.parser('{}');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, '{}');
}

exports['compile composite command with one command'] = function (test) {
	var parser = parsers.parser('{ return; }');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, '{ return; }');
}

exports['compile composite command with two commands'] = function (test) {
	var parser = parsers.parser('{ a = 42; return a; }');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, '{ a = 42; return a; }');
}

exports['compile while command'] = function (test) {
	var parser = parsers.parser('while (a < 42) a = 42;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'while (a < 42) a = 42;');
}


