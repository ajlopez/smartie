
var parsers = require('../lib/parsers');

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parseExpression();
	
	test.ok(expr);
	test.ok(expr.value);
	test.equal(expr.value(), 42);
	
	test.equal(parser.parseExpression(), null);
};



