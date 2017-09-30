
var parsers = require('../lib/parsers');
var Types = parsers.Types;

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), 42);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse string expression'] = function (test) {
	var parser = parsers.parser('"foo"');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), "foo");
	
	test.equal(parser.parseExpression(), null);
};

exports['parse integer variable command'] = function (test) {
	var parser = parsers.parser('int a;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Integer);
	test.equal(cmd.name(), 'a');
	test.equal(cmd.value(), null);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse integer variable command with initial value'] = function (test) {
	var parser = parsers.parser('int a = 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Integer);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.value());
	test.equal(cmd.value().value(), 42);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse string variable command'] = function (test) {
	var parser = parsers.parser('string a;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.String);
	test.equal(cmd.name(), 'a');
	test.equal(cmd.value(), null);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse string variable command with initial value'] = function (test) {
	var parser = parsers.parser('string a = "foo";');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.String);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.value());
	test.equal(cmd.value().value(), 'foo');
	
	test.equal(parser.parseCommand(), null);
}


exports['parse numeric variable command'] = function (test) {
	var parser = parsers.parser('num a;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Numeric);
	test.equal(cmd.name(), 'a');
	test.equal(cmd.value(), null);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse numeric variable command with initial value'] = function (test) {
	var parser = parsers.parser('num a = 10;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Numeric);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.value());
	test.equal(cmd.value().value(), 10);
	
	test.equal(parser.parseCommand(), null);
}

