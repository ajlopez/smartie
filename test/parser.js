
var parsers = require('../lib/parsers');
var Types = parsers.Types;
var Operators = parsers.Operators;

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

exports['parse true as boolean expression'] = function (test) {
	var parser = parsers.parser('true');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), true);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse false as boolean expression'] = function (test) {
	var parser = parsers.parser('false');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), false);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse name expression'] = function (test) {
	var parser = parsers.parser('a');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.name);
	test.equal(expr.name(), "a");
	
	test.equal(parser.parseExpression(), null);
};

exports['parse add expression'] = function (test) {
	var parser = parsers.parser('1 + 41');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Add);
	test.ok(expr.left);
    test.equal(expr.left().value(), 1);
	test.ok(expr.right);
    test.equal(expr.right().value(), 41);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse subtract expression'] = function (test) {
	var parser = parsers.parser('43 - 1');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Subtract);
	test.ok(expr.left);
    test.equal(expr.left().value(), 43);
	test.ok(expr.right);
    test.equal(expr.right().value(), 1);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse multiply expression'] = function (test) {
	var parser = parsers.parser('21 * 2');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Multiply);
	test.ok(expr.left);
    test.equal(expr.left().value(), 21);
	test.ok(expr.right);
    test.equal(expr.right().value(), 2);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse divide expression'] = function (test) {
	var parser = parsers.parser('84 / 2');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Divide);
	test.ok(expr.left);
    test.equal(expr.left().value(), 84);
	test.ok(expr.right);
    test.equal(expr.right().value(), 2);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse equal expression'] = function (test) {
	var parser = parsers.parser('42 == 3');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Equals);
	test.ok(expr.left);
    test.equal(expr.left().value(), 42);
	test.ok(expr.right);
    test.equal(expr.right().value(), 3);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse not equal expression'] = function (test) {
	var parser = parsers.parser('42 != 3');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.NotEquals);
	test.ok(expr.left);
    test.equal(expr.left().value(), 42);
	test.ok(expr.right);
    test.equal(expr.right().value(), 3);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse less than expression'] = function (test) {
	var parser = parsers.parser('42 < 3');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Less);
	test.ok(expr.left);
    test.equal(expr.left().value(), 42);
	test.ok(expr.right);
    test.equal(expr.right().value(), 3);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse less or equal than expression'] = function (test) {
	var parser = parsers.parser('42 <= 3');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.LessEqual);
	test.ok(expr.left);
    test.equal(expr.left().value(), 42);
	test.ok(expr.right);
    test.equal(expr.right().value(), 3);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse greater than expression'] = function (test) {
	var parser = parsers.parser('42 > 3');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.Greater);
	test.ok(expr.left);
    test.equal(expr.left().value(), 42);
	test.ok(expr.right);
    test.equal(expr.right().value(), 3);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse greater or equal than expression'] = function (test) {
	var parser = parsers.parser('42 >= 3');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
    test.ok(expr.operator);
    test.equal(expr.operator(), Operators.GreaterEqual);
	test.ok(expr.left);
    test.equal(expr.left().value(), 42);
	test.ok(expr.right);
    test.equal(expr.right().value(), 3);
	
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

exports['parse assignment expression'] = function (test) {
	var parser = parsers.parser('a = 42');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.lvalue());
	test.equal(expr.lvalue().name(), 'a');
	test.ok(expr.expression());
	test.equal(expr.expression().value(), 42);
	
	test.equal(parser.parseExpression(), null);
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

exports['parse return command without expression'] = function (test) {
	var parser = parsers.parser('return;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.expression(), null);
	
	test.equal(parser.parseCommand(), null);
};

exports['parse return command with expression'] = function (test) {
	var parser = parsers.parser('return 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.expression());
	test.equal(cmd.expression().value(), 42);
	
	test.equal(parser.parseCommand(), null);
};

exports['parse break command'] = function (test) {
	var parser = parsers.parser('break;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	
	test.equal(parser.parseCommand(), null);
};

exports['parse continue command'] = function (test) {
	var parser = parsers.parser('continue;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	
	test.equal(parser.parseCommand(), null);
};

exports['parse integer method'] = function (test) {
	var parser = parsers.parser("int add(int x, int y) { return x + y; }");
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	
	test.equal(cmd.name(), "add");
	test.equal(cmd.type(), Types.Integer);
	test.ok(cmd.arguments());
	test.equal(cmd.arguments().length, 2);
	
	var arg = cmd.arguments()[0];
	
	test.ok(arg);
	test.equal(arg.name(), "x");
	test.equal(arg.type(), Types.Integer);
		
	var arg = cmd.arguments()[1];
	
	test.ok(arg);
	test.equal(arg.name(), "y");
	test.equal(arg.type(), Types.Integer);
	
	test.ok(cmd.body());
	test.ok(cmd.body().commands());
	test.equal(cmd.body().commands().length, 1);
	
	var retcmd = cmd.body().commands()[0];
	
	test.ok(retcmd);
	test.ok(retcmd.expression());
	test.ok(retcmd.expression().left());
	test.equal(retcmd.expression().left().name(), "x");
	test.ok(retcmd.expression().right());
	test.equal(retcmd.expression().right().name(), "y");
	test.equal(retcmd.expression().operator(), Operators.Add);
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

