var esprima = require("esprima"),
	escodegen = require("escodegen"),
	fs = require("fs");

var Syntax = {
	AssignmentExpression: 'AssignmentExpression',
	ArrayExpression: 'ArrayExpression',
	BlockStatement: 'BlockStatement',
	BinaryExpression: 'BinaryExpression',
	BreakStatement: 'BreakStatement',
	CallExpression: 'CallExpression',
	CatchClause: 'CatchClause',
	ConditionalExpression: 'ConditionalExpression',
	ContinueStatement: 'ContinueStatement',
	DoWhileStatement: 'DoWhileStatement',
	DebuggerStatement: 'DebuggerStatement',
	EmptyStatement: 'EmptyStatement',
	ExpressionStatement: 'ExpressionStatement',
	ForStatement: 'ForStatement',
	ForInStatement: 'ForInStatement',
	FunctionDeclaration: 'FunctionDeclaration',
	FunctionExpression: 'FunctionExpression',
	Identifier: 'Identifier',
	IfStatement: 'IfStatement',
	Literal: 'Literal',
	LabeledStatement: 'LabeledStatement',
	LogicalExpression: 'LogicalExpression',
	MemberExpression: 'MemberExpression',
	NewExpression: 'NewExpression',
	ObjectExpression: 'ObjectExpression',
	Program: 'Program',
	Property: 'Property',
	ReturnStatement: 'ReturnStatement',
	SequenceExpression: 'SequenceExpression',
	SwitchStatement: 'SwitchStatement',
	SwitchCase: 'SwitchCase',
	ThisExpression: 'ThisExpression',
	ThrowStatement: 'ThrowStatement',
	TryStatement: 'TryStatement',
	UnaryExpression: 'UnaryExpression',
	UpdateExpression: 'UpdateExpression',
	VariableDeclaration: 'VariableDeclaration',
	VariableDeclarator: 'VariableDeclarator',
	WhileStatement: 'WhileStatement',
	WithStatement: 'WithStatement'
};

var code = fs.readFileSync("./test.js", {
	encoding: "utf-8"
});

console.log(code);

var tree = esprima.parse(code, {
	raw: true,
	tokens: true,
	range: true,
	comment: true
});

console.log(JSON.stringify(tree, null, 4));

function traverse(object, visitor, master) {
	var key, child, parent, path;

	parent = (typeof master === 'undefined') ? [] : master;

	if (visitor.call(null, object, parent) === false) {
		return;
	}
	for (key in object) {
		if (object.hasOwnProperty(key)) {
			child = object[key];
			path = [object];
			path.push(parent);
			if (typeof child === 'object' && child !== null) {
				traverse(child, visitor, path);
			}
		}
	}
}

// traverse(tree, function(node, path) {
// 	console.log("------------------------------------------");
// 	console.log(node);
// 	console.log("------------------------------------------");

// });
tree = escodegen.attachComments(tree, tree.comments, tree.tokens);

var newCode = escodegen.generate(tree);

console.log(newCode);