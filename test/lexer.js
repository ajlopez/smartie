
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

exports['create lexer'] = function (test) {
    var lexer = lexers.lexer();
    
    test.ok(lexer);
    test.equal(typeof lexer, 'object');
};

exports['get name token'] = function (test) {
	var lexer = lexers.lexer('foo');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token with digits'] = function (test) {
	var lexer = lexers.lexer('foo42');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo42');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token with initial underscore'] = function (test) {
	var lexer = lexers.lexer('_foo');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '_foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token with underscore'] = function (test) {
	var lexer = lexers.lexer('foo_bar');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo_bar');
	test.equal(token.type, TokenType.Name);

	test.equal(lexer.nextToken(), null);
}

exports['get name token tabs and new lines'] = function (test) {
	var lexer = lexers.lexer('\t\tfoo\n\r\n');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token skipping line comments'] = function (test) {
	var lexer = lexers.lexer('\\\\ line comment\nfoo \\\\ another line comment');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token skipping comments'] = function (test) {
	var lexer = lexers.lexer('/* comment */ foo /* another comment */');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token without spaces'] = function (test) {
	var lexer = lexers.lexer('   foo    ');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get name token without whitespaces'] = function (test) {
	var lexer = lexers.lexer('  \r\t\nfoo \r\t\n   ');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get two name tokens'] = function (test) {
	var lexer = lexers.lexer('foo bar');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.Name);
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'bar');
	test.equal(token.type, TokenType.Name);
	
	test.equal(lexer.nextToken(), null);
}

exports['get integer token'] = function (test) {
	var lexer = lexers.lexer('42');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '42');
	test.equal(token.type, TokenType.Integer);
	
	test.equal(lexer.nextToken(), null);
}

exports['get semicolon as punctuation'] = function (test) {
	var lexer = lexers.lexer(';');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, ';');
	test.equal(token.type, TokenType.Punctuation);
	
	test.equal(lexer.nextToken(), null);
}

exports['get square brackets as punctuation'] = function (test) {
	var lexer = lexers.lexer('[]');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '[');
	test.equal(token.type, TokenType.Punctuation);
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, ']');
	test.equal(token.type, TokenType.Punctuation);
	
	test.equal(lexer.nextToken(), null);
}

exports['get comma as punctuation'] = function (test) {
	var lexer = lexers.lexer(',');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, ',');
	test.equal(token.type, TokenType.Punctuation);
	
	test.equal(lexer.nextToken(), null);
}

exports['get curly braces as punctuation'] = function (test) {
	var lexer = lexers.lexer('{}');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '{');
	test.equal(token.type, TokenType.Punctuation);
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '}');
	test.equal(token.type, TokenType.Punctuation);
	
	test.equal(lexer.nextToken(), null);
}

exports['get map operator'] = function (test) {
	var lexer = lexers.lexer('=>');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '=>');
	test.equal(token.type, TokenType.Operator);
	
	test.equal(lexer.nextToken(), null);
}

exports['get less than as operator'] = function (test) {
	var lexer = lexers.lexer('<');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '<');
	test.equal(token.type, TokenType.Operator);
	
	test.equal(lexer.nextToken(), null);
}

exports['get greater than as operator'] = function (test) {
	var lexer = lexers.lexer('>');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '>');
	test.equal(token.type, TokenType.Operator);
	
	test.equal(lexer.nextToken(), null);
}

exports['get increment as operator'] = function (test) {
	var lexer = lexers.lexer('++');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '++');
	test.equal(token.type, TokenType.Operator);
	
	test.equal(lexer.nextToken(), null);
}

exports['get decrement as operator'] = function (test) {
	var lexer = lexers.lexer('--');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '--');
	test.equal(token.type, TokenType.Operator);
	
	test.equal(lexer.nextToken(), null);
}

exports['get dot as punctuation'] = function (test) {
	var lexer = lexers.lexer('.');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, '.');
	test.equal(token.type, TokenType.Punctuation);
	
	test.equal(lexer.nextToken(), null);
}

exports['get arithmetic operators'] = function (test) {
	var lexer = lexers.lexer('+ - * / % **');
	
	[ '+', '-', '*', '/', '%', '**' ].forEach(function (op) {
		var token = lexer.nextToken();
		
		test.ok(token);
		test.equal(token.value, op);
		test.equal(token.type, TokenType.Operator);
	});
	
	test.equal(lexer.nextToken(), null);
}

exports['get comparison operators'] = function (test) {
	var lexer = lexers.lexer('< > <= >= == !=');
	
	[ '<', '>', '<=', '>=', '==', '!=' ].forEach(function (op) {
		var token = lexer.nextToken();
		
		test.ok(token);
		test.equal(token.value, op);
		test.equal(token.type, TokenType.Operator);
	});
	
	test.equal(lexer.nextToken(), null);
}

exports['get logical operators'] = function (test) {
	var lexer = lexers.lexer('! && ||');
	
	[ '!', '&&', '||' ].forEach(function (op) {
		var token = lexer.nextToken();
		
		test.ok(token);
		test.equal(token.value, op);
		test.equal(token.type, TokenType.Operator);
	});
	
	test.equal(lexer.nextToken(), null);
}

exports['get bit operators'] = function (test) {
	var lexer = lexers.lexer('~ | & ^');
	
	[ '~', '|', '&', '^' ].forEach(function (op) {
		var token = lexer.nextToken();
		
		test.ok(token);
		test.equal(token.value, op);
		test.equal(token.type, TokenType.Operator);
	});
	
	test.equal(lexer.nextToken(), null);
}

exports['get string'] = function (test) {
	var lexer = lexers.lexer('"foo"');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'foo');
	test.equal(token.type, TokenType.String);
	
	test.equal(lexer.nextToken(), null);
}

exports['get true as boolean'] = function (test) {
	var lexer = lexers.lexer('true');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'true');
	test.equal(token.type, TokenType.Boolean);
	
	test.equal(lexer.nextToken(), null);
}

exports['get false as boolean'] = function (test) {
	var lexer = lexers.lexer('false');
	
	var token = lexer.nextToken();
	
	test.ok(token);
	test.equal(token.value, 'false');
	test.equal(token.type, TokenType.Boolean);
	
	test.equal(lexer.nextToken(), null);
}

exports['get shift operators'] = function (test) {
	var lexer = lexers.lexer('<< >>');
	
	[ '<<', '>>' ].forEach(function (op) {
		var token = lexer.nextToken();
		
		test.ok(token);
		test.equal(token.value, op);
		test.equal(token.type, TokenType.Operator);
	});
	
	test.equal(lexer.nextToken(), null);
}
