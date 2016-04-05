'use strict';

var test = require('tape');
var queueRequests = require('../src/queueRequests');

var url = 'http://jsonplaceholder.typicode.com/posts/1';

var dataFixture = function(size) { return Array.from(Array(size || 1).keys()); };


//Copied from blue-tape
function isPromise(p) {
	return p && p.then && typeof p.then === 'function' ? true : false;
}

test('queueRequests is a function', function(assert) {
	var actual = typeof queueRequests;
	var expected = 'function';

	assert.equal(actual, expected, 'queueRequests should be a function');
	assert.end();
});

test('queueRequests returns a promise', function(assert) {
	var actual = isPromise(queueRequests());
	var expected = true;

	assert.equal(actual, expected, 'queueRequests returns a promise');
	assert.end();
});

test('queueRequests should return 5 results for an array of 5 items', function(assert) {
	assert.plan(2);

	queueRequests({
		uri: url
	}, dataFixture(2)).then(function(results) {
		var actual = Array.isArray(results);
		var expected = true;

		assert.equal(actual, expected, 'Results should be an array');

		var actual1 = results.length;
		var expected2 = 2;

		assert.equal(actual1, expected2, 'Results should contain 5 items');

	});
});