
var smartie = require('..');

exports['compile empty contract'] = function (test) {
	var text = smartie.compile('contract Empty { }');
	
	test.ok(text);
	test.equal(text, 'class EmptyContract {}');
}

