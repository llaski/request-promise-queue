import test from 'tape';
import RequestPromiseQueue from '../index';

//Copied from blue-tape
function isPromise(p) {
	return p && p.then && typeof p.then === 'function' ? true : false;
}

const url = 'http://jsonplaceholder.typicode.com/posts/1';

const dataFixture = (size) => Array.from(Array(size || 1).keys());

test('RequestPromiseQueue is an object', assert => {
	const actual = typeof RequestPromiseQueue;
	const expected = 'object';

	assert.equal(actual, expected, 'RequestPromiseQueue should be an object');
	assert.end();
});

test('RequestPromiseQueue has a send method', assert => {
	const actual = typeof RequestPromiseQueue.send;
	const expected = 'function';

	assert.equal(actual, expected, 'RequestPromiseQueue as a send method');
	assert.end();
});

test('Send method should throw an error if no url is provided', assert => {
	const actual = RequestPromiseQueue.send;
	const expected = /uri must be provided/;

	assert.throws(actual, expected, expected);
	assert.end();
});

test('Send method returns a promise if arguments are valid', assert => {
	const actual = isPromise(RequestPromiseQueue.send(url));
	const expected = true;

	assert.equal(actual, expected, 'Send method returns a promise');
	assert.end();
});

test('Send method fires 4 requests split over 2 queues', assert => {

	assert.plan(3);

	RequestPromiseQueue.send(url, {}, {
		data: dataFixture(4),
		size: 2
	}).then((results) => {
		const actual = Array.isArray(results);
		const expected = true;

		assert.equal(actual, expected, 'Results should be an array');

		const actual2 = results[0].length;
		const expected2 = 2;

		assert.equal(actual2, expected2, 'Results first item should be an array of 5 items');

		const actual3 = results[1].length;
		const expected3 = 2;

		assert.equal(actual3, expected3, 'Results second item should be an array of 5 items');
	});
});