
var smartie = require('..');

exports['compile empty contract'] = function (test) {
	var text = smartie.compile('contract Empty { }');
	
	test.ok(text);
	test.equal(text, 'class EmptyContract {}');
}

exports['compile empty contract in multiple lines'] = function (test) {
	var code = [
		'',
		'// Empty contract',
		'',
		'contract Empty {',
		'}'
	].join('\n');
	
	
	var text = smartie.compile('contract Empty { }');
	
	test.ok(text);
	test.equal(text, 'class EmptyContract {}');
}

