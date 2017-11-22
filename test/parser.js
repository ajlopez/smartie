
var parsers = require('../lib/parsers');
var Types = parsers.Types;
var Operators = parsers.Operators;
var Visibilities = parsers.Visibilities;

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), 42);
	test.equal(expr.type(), Types.Integer);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse string expression'] = function (test) {
	var parser = parsers.parser('"foo"');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), "foo");
	test.equal(expr.type(), Types.String);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse true as boolean expression'] = function (test) {
	var parser = parsers.parser('true');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), true);
	test.equal(expr.type(), Types.Boolean);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse false as boolean expression'] = function (test) {
	var parser = parsers.parser('false');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), false);
	test.equal(expr.type(), Types.Boolean);
	
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

exports['parse dot expression'] = function (test) {
	var parser = parsers.parser('a.b');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.name);
	test.equal(expr.name(), "b");
	test.ok(expr.expression);
	test.equal(expr.expression().name(), "a");
	
	test.equal(parser.parseExpression(), null);
};

exports['parse nested dot expression'] = function (test) {
	var parser = parsers.parser('a.b.c');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.equal(expr.name(), "c");
	test.equal(expr.expression().name(), "b");
	test.equal(expr.expression().expression().name(), "a");
	
	test.equal(parser.parseExpression(), null);
};

exports['parse call expression without arguments'] = function (test) {
	var parser = parsers.parser('a()');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.equal(expr.expression().name(), "a");
	test.equal(expr.arguments().length, 0);
	
	test.equal(parser.parseExpression(), null);
};

exports['parse call expression with two arguments'] = function (test) {
	var parser = parsers.parser('add(41, 1)');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.equal(expr.expression().name(), "add");
	test.equal(expr.arguments().length, 2);
	test.equal(expr.arguments()[0].value(), 41);
	test.equal(expr.arguments()[1].value(), 1);
	
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

exports['parse address variable command'] = function (test) {
	var parser = parsers.parser('address a;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.type(), Types.Address);
	test.equal(cmd.name(), 'a');
	test.equal(cmd.expression(), null);
	
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
	test.equal(expr.type(), Types.Integer);
	
	test.equal(parser.parseExpression(), null);
}

exports['parse assignment expression as command'] = function (test) {
	var parser = parsers.parser('a = 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.expression());
	test.ok(cmd.expression().lvalue());
	test.equal(cmd.expression().lvalue().name(), 'a');
	test.ok(cmd.expression().expression());
	test.equal(cmd.expression().expression().value(), 42);
	
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
	test.equal(cmd.type(), Types.Void);
	
	test.equal(parser.parseCommand(), null);
};

exports['parse return command with expression'] = function (test) {
	var parser = parsers.parser('return 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.expression());
	test.equal(cmd.expression().value(), 42);
	test.equal(cmd.type(), Types.Integer);
	
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

exports['parse integer function'] = function (test) {
	var parser = parsers.parser("function int add(int x, int y) { return x + y; }");
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	
	test.equal(cmd.name(), "add");
	test.equal(cmd.type(), Types.Integer);
	test.ok(cmd.parameters());
	test.equal(cmd.parameters().length, 2);
	
	var arg = cmd.parameters()[0];
	
	test.ok(arg);
	test.equal(arg.name(), "x");
	test.equal(arg.type(), Types.Integer);
		
	var arg = cmd.parameters()[1];
	
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

exports['parse empty contract command with is'] = function (test) {
	var parser = parsers.parser('contract Empty is Mortal {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.equal(cmd.name(), 'Empty');
	test.ok(cmd.body());
	test.deepEqual(cmd.body().commands(), []);
	test.deepEqual(cmd.is(), "Mortal");
	
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

exports['parse while command'] = function (test) {
	var parser = parsers.parser('while (a < 42) a = 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.condition());
    test.equal(cmd.condition().operator(), Operators.Less);
    test.equal(cmd.condition().left().name(), 'a');
    test.equal(cmd.condition().right().value(), 42);
	
	test.ok(cmd.body());
	test.ok(cmd.body().expression());
	test.ok(cmd.body().expression().lvalue());
	test.equal(cmd.body().expression().lvalue().name(), 'a');
	test.ok(cmd.body().expression().expression());
	test.equal(cmd.body().expression().expression().value(), 42);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse if command'] = function (test) {
	var parser = parsers.parser('if (a < 42) a = 42;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.condition());
    test.equal(cmd.condition().operator(), Operators.Less);
    test.equal(cmd.condition().left().name(), 'a');
    test.equal(cmd.condition().right().value(), 42);
	
	test.ok(cmd.then());
	test.ok(cmd.then().expression());
	test.ok(cmd.then().expression().lvalue());
	test.equal(cmd.then().expression().lvalue().name(), 'a');
	test.ok(cmd.then().expression().expression());
	test.equal(cmd.then().expression().expression().value(), 42);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse if command with else'] = function (test) {
	var parser = parsers.parser('if (a < 42) a = 42; else b = 1;');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
	test.ok(cmd.condition());
    test.equal(cmd.condition().operator(), Operators.Less);
    test.equal(cmd.condition().left().name(), 'a');
    test.equal(cmd.condition().right().value(), 42);
	
	test.ok(cmd.then());
	test.ok(cmd.then().expression());
	test.ok(cmd.then().expression().lvalue());
	test.equal(cmd.then().expression().lvalue().name(), 'a');
	test.ok(cmd.then().expression().expression());
	test.equal(cmd.then().expression().expression().value(), 42);
	
	test.ok(cmd.else());
	test.ok(cmd.else().expression());
	test.ok(cmd.else().expression().lvalue());
	test.equal(cmd.else().expression().lvalue().name(), 'b');
	test.ok(cmd.else().expression().expression());
	test.equal(cmd.else().expression().expression().value(), 1);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse empty void function'] = function (test) {
	var parser = parsers.parser('function void foo() {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
    test.equal(cmd. name(), 'foo');
	test.equal(cmd.type(), Types.Void);

	var body = cmd.body();
	
	test.ok(body);
	test.deepEqual(body.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse empty void function'] = function (test) {
	var parser = parsers.parser('function void foo() {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
    test.equal(cmd. name(), 'foo');
	test.equal(cmd.type(), Types.Void);
	test.equal(cmd.visibility(), Visibilities.Private);

	var body = cmd.body();
	
	test.ok(body);
	test.deepEqual(body.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse public empty void function'] = function (test) {
	var parser = parsers.parser('function public void foo() {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
    test.equal(cmd. name(), 'foo');
	test.equal(cmd.type(), Types.Void);
	test.equal(cmd.visibility(), Visibilities.Public);

	var body = cmd.body();
	
	test.ok(body);
	test.deepEqual(body.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse explicit private empty void function'] = function (test) {
	var parser = parsers.parser('function private void foo() {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
    test.equal(cmd. name(), 'foo');
	test.equal(cmd.type(), Types.Void);
	test.equal(cmd.visibility(), Visibilities.Private);

	var body = cmd.body();
	
	test.ok(body);
	test.deepEqual(body.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse explicit internal empty void function'] = function (test) {
	var parser = parsers.parser('function internal void foo() {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
    test.equal(cmd. name(), 'foo');
	test.equal(cmd.type(), Types.Void);
	test.equal(cmd.visibility(), Visibilities.Internal);

	var body = cmd.body();
	
	test.ok(body);
	test.deepEqual(body.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}

exports['parse explicit external empty void function'] = function (test) {
	var parser = parsers.parser('function external void foo() {}');
	
	var cmd = parser.parseCommand();
	
	test.ok(cmd);
    test.equal(cmd. name(), 'foo');
	test.equal(cmd.type(), Types.Void);
	test.equal(cmd.visibility(), Visibilities.External);

	var body = cmd.body();
	
	test.ok(body);
	test.deepEqual(body.commands(), []);
	
	test.equal(parser.parseCommand(), null);
}
