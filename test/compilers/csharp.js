
var parsers = require('../../lib/parsers');
var compilers = require('../../lib/compilers/csharp');

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

exports['compile dot'] = function (test) {
	var parser = parsers.parser('a.b');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, 'a.b');
}

exports['compile call'] = function (test) {
	var parser = parsers.parser('add(41, 1)');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, 'add(41, 1)');
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

exports['compile add expression'] = function (test) {
	var parser = parsers.parser('1 + 41');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '1 + 41');
}

exports['compile subtract expression'] = function (test) {
	var parser = parsers.parser('43 - 1');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '43 - 1');
}

exports['compile multiply expression'] = function (test) {
	var parser = parsers.parser('21 * 2');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '21 * 2');
}

exports['compile divide expression'] = function (test) {
	var parser = parsers.parser('84 / 2');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '84 / 2');
}

exports['compile less than expression'] = function (test) {
	var parser = parsers.parser('1 < 2');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '1 < 2');
}

exports['compile greater than expression'] = function (test) {
	var parser = parsers.parser('1 > 2');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseExpression());
	
	test.ok(result);
	test.equal(result, '1 > 2');
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

exports['compile if command'] = function (test) {
	var parser = parsers.parser('if (a < 42) a = 42;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'if (a < 42) a = 42;');
}

exports['compile if command with else'] = function (test) {
	var parser = parsers.parser('if (a < 42) a = a + 1; else done = true;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'if (a < 42) a = a + 1; else done = true;');
}

exports['compile integer variable'] = function (test) {
	var parser = parsers.parser('int a;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'int a;');
}

exports['compile integer variable with initialization expression'] = function (test) {
	var parser = parsers.parser('int a = 42;');
	var compiler = compilers.compiler();
	
	var result = compiler.compile(parser.parseCommand());
	
	test.ok(result);
	test.equal(result, 'int a = 42;');
}

