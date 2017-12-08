
var smartie = require('..');

exports['parse contract command with cmd with two commands'] = function (test) {
	var pgm = smartie.parse('contract Easy { int a = 42; string b = "foo"; }');
	
	test.ok(pgm);
	test.equal(pgm.name(), 'Easy');
	test.ok(pgm.body());
	test.equal(pgm.body().commands().length, 2);

	var cmd = pgm.body().commands()[0];
	
	test.ok(cmd);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.expression());
	test.ok(cmd.expression().value());
	test.equal(cmd.expression().value(), 42);
	
	var cmd = pgm.body().commands()[1];
	
	test.ok(cmd);
	test.equal(cmd.name(), 'b');
	test.ok(cmd.expression());
	test.ok(cmd.expression().value());
	test.equal(cmd.expression().value(), 'foo');
}

