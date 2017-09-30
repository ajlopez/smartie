
var TokenType = { Name: 1, Integer: 2, String: 3, Boolean: 4, Operator: 5, Punctuation: 6 };

var punctuations = [ '{', '}', ',', ';', '[', ']', '.', '(', ')' ];
var operators = [ '<', '>', '=>', '<=', '>=', '==', '!=', '+', '-', '*', '/', '%', '**', '!', '||', '&&', '!', '|', '&', '^', '~', '<<', '>>', '++', '--', '=' ];

function Lexer(text) {
	text = text || '';
	var length = text.length;
	var position = 0;
	var tokens = [];
	
	this.nextToken = function () {
		if (tokens.length)
			return tokens.pop();

		if (!text)
			return null;
		
		skipWhiteSpaces();
		
		if (position >= length)
			return null;
		
		var ch = text[position];
		
		if (ch === '"') {
			var p = text.indexOf(ch, position + 1);
			
			if (p < 0)
				p = length;
			
			var value = text.substring(position + 1, p);
			
			position = p + 1;
			
			return { value: value, type: TokenType.String };
		}
		
		var value = '';
		
		if (punctuations.indexOf(text[position]) >= 0)
			return { value: text[position++], type: TokenType.Punctuation };
		
		if (position < length - 1 && operators.indexOf(text[position] + text[position+1]) >= 0) {
			var result = { value: text[position] + text[position+1] , type: TokenType.Operator };
			position += 2;
			return result;
		}
		
		if (operators.indexOf(text[position]) >= 0)
			return { value: text[position++], type: TokenType.Operator };

		if (isLetter(ch) || isUnderscore(ch)) {
			while (position < length && (isLetter(text[position]) || isDigit(text[position]) || isUnderscore(text[position])))
				value += text[position++];
			
			if (value == 'false' || value == 'true')
				return { value: value, type: TokenType.Boolean };
			
			return { value: value, type: TokenType.Name }; 
		}
		else if (isDigit(ch)) {
			while (position < length && isDigit(text[position]))
				value += text[position++];
			
			return { value: value, type: TokenType.Integer }; 
		}
		
		return token;
	};
	
	this.pushToken = function (token) {
		tokens.push(token);
	}
	
	function skipWhiteSpaces() {
		while (position < length) {
			while (position < length && isWhiteSpace(text[position]))
				position++;
			
			if (text[position] === '\\' && text[position + 1] === '\\') {
				position += 2;
				
				while (position < length && !isEndOfLine(text[position]))
					position++;
			}
			else if (text[position] === '/' && text[position + 1] === '*') {
				position += 2;
				
				while (position < length && !(text[position] === '*' && text[position + 1] === '/'))
					position++;
				
				if (position < length)
					position += 2;
			}
			else
				return;
		}
	}
	
	function isWhiteSpace(ch) {
		return ch <= ' ';
	}

	function isEndOfLine(ch) {
		return ch === '\r' || ch === '\n';
	}
	
	function isDigit(ch) {
		return ch >= '0' && ch <= '9';
	}
	
	function isLetter(ch) {
		return ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z';
	}
	
	function isUnderscore(ch) {
		return ch === '_';
	}
}

module.exports = {
    lexer: function (text) { return new Lexer(text); },
	TokenType: TokenType
};

