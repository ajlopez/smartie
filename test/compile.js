
var smartie = require('..');

exports['compile empty contract'] = function (test) {exports['parse contract command with cmd with two commands'] = function (test) {
	var pgm = smartie.compile('contract Empty { int a = 42; string b = "foo"; }');
	
	test.ok(pgm);
	test.equal(pgm.name(), 'Empty');
	test.ok(pgm.cmd());
	test.equal(pgm.cmd().commands().length, 2);

	var cmd = pgm.cmd().commands()[0];
	
	test.ok(cmd);
	test.equal(cmd.name(), 'a');
	test.ok(cmd.value());
	test.equal(cmd.value().value(), 42);
	
	var cmd = pgm.cmd().commands()[1];
	
	test.ok(cmd);
	test.equal(cmd.name(), 'b');
	test.ok(cmd.value());
	test.equal(cmd.value().value(), "foo");
	
	test.equal(parser.parseCommand(), null);
}


};