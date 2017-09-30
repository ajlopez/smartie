
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
	test.equal(cmd.expression(), null);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse integer variable command with initial value'] = function (test) {
	var parser = parsers.parser('int a = 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Integer);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.expression());
	test.equal(cmd.expression().value(), 42);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse string variable command'] = function (test) {
	var parser = parsers.parser('string a;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.String);
	test.equal(cmd.name(), 'a');
	test.equal(cmd.expression(), null);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse string variable command with initial value'] = function (test) {
	var parser = parsers.parser('string a = "foo";');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.String);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.expression());
	test.equal(cmd.expression().value(), 'foo');
	
	test.equal(parser.parseCommand(), null);
}


exports['parse numeric variable command'] = function (test) {
	var parser = parsers.parser('num a;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Numeric);
	test.equal(cmd.name(), 'a');
	test.equal(cmd.expression(), null);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse numeric variable command with initial value'] = function (test) {
	var parser = parsers.parser('num a = 10;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Numeric);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.expression());
	test.equal(cmd.expression().value(), 10);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse assign command'] = function (test) {
	var parser = parsers.parser('a = 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.lvalue());
	test.equal(cmd.lvalue().name());
	test.ok(cmd.expression());
	test.equal(cmd.expression().value(), 42);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse empty composite command'] = function (test) {
	var parser = parsers.parser('{}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.deepEqual(cmd.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse composite command with one command'] = function (test) {
	var parser = parsers.parser('{ int a = 42; }');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.commands().length, 1);
	
	var subcmd = cmd.commands()[0];
	
	test.ok(subcmd);
	test.equal(subcmd.name(), 'a');
	test.ok(subcmd.expression());
	test.equal(subcmd.expression().value(), 42);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse composite command with two commands'] = function (test) {
	var parser = parsers.parser('{ int a = 42; string b = "foo"; }');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.commands().length, 2);
	
	var subcmd = cmd.commands()[0];
	
	test.ok(subcmd);
	test.equal(subcmd.name(), 'a');
	test.ok(subcmd.expression());
	test.equal(subcmd.expression().value(), 42);
	
	var subcmd = cmd.commands()[1];
	
	test.ok(subcmd);
	test.equal(subcmd.name(), 'b');
	test.ok(subcmd.expression());
	test.equal(subcmd.expression().value(), "foo");
	
	test.equal(parser.parseCommand(), null);
}

exports['parse empty contract command'] = function (test) {
	var parser = parsers.parser('contract Empty {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.name(), 'Empty');
	test.ok(cmd.body());
	test.deepEqual(cmd.body().commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse contract command with body with two commands'] = function (test) {
	var parser = parsers.parser('contract Empty { int a = 42; string b = "foo"; }');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.name(), 'Empty');
	test.ok(cmd.body());
	test.equal(cmd.body().commands().length, 2);

	var subcmd = cmd.body().commands()[0];
	
	test.ok(subcmd);
	test.equal(subcmd.name(), 'a');
	test.ok(subcmd.expression());
	test.equal(subcmd.expression().value(), 42);
	
	var subcmd = cmd.body().commands()[1];
	
	test.ok(subcmd);
	test.equal(subcmd.name(), 'b');
	test.ok(subcmd.expression());
	test.equal(subcmd.expression().value(), "foo");
	
	test.equal(parser.parseCommand(), null);
}

