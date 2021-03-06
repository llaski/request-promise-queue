'use strict';

var test = require('tape');
var RequestPromiseQueue = require('../index');

//Copied from blue-tape
function isPromise(p) {
	return p && p.then && typeof p.then === 'function' ? true : false;
}

var url = 'http://jsonplaceholder.typicode.com/posts/1';

var dataFixture = function(size) { return Array.from(Array(size || 1).keys()); };

test('RequestPromiseQueue is an object', function(assert) {
	var actual = typeof RequestPromiseQueue;
	var expected = 'object';

	assert.equal(actual, expected, 'RequestPromiseQueue should be an object');
	assert.end();
});

test('RequestPromiseQueue has a send method', function(assert) {
	var actual = typeof RequestPromiseQueue.send;
	var expected = 'function';

	assert.equal(actual, expected, 'RequestPromiseQueue as a send method');
	assert.end();
});

test('Send method should throw an error if no url is provided', function(assert) {
	var actual = RequestPromiseQueue.send;
	var expected = /uri must be provided/;

	assert.throws(actual, expected, expected);
	assert.end();
});

test('Send method returns a promise if arguments are valid', function(assert) {
	var actual = isPromise(RequestPromiseQueue.send(url));
	var expected = true;

	assert.equal(actual, expected, 'Send method returns a promise');
	assert.end();
});

test('Send method fires 4 requests split over 2 queues', function(assert) {

	assert.plan(3);

	RequestPromiseQueue.send(url, {}, {
		data: dataFixture(4),
		size: 2
	}).then(function(results) {
		var actual = Array.isArray(results);
		var expected = true;

		assert.equal(actual, expected, 'Results should be an array');

		var actual2 = results[0].length;
		var expected2 = 2;

		assert.equal(actual2, expected2, 'Results first item should be an array of 5 items');

		var actual3 = results[1].length;
		var expected3 = 2;

		assert.equal(actual3, expected3, 'Results second item should be an array of 5 items');
	});
});