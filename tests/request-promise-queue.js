import test from 'tape';
import RequestPromiseQueue from '../index';

//Copied from blue-tape
function isPromise(p) {
	return p && p.then && typeof p.then === 'function' ? true : false;
}

const url = 'http://jsonplaceholder.typicode.com';

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
	const expected = /url must be provided/;

	assert.throws(actual, expected, expected);
	assert.end();
});

test('Send method returns a promise if arguments are valid', assert => {
	const actual = isPromise(RequestPromiseQueue.send(url));
	const expected = true;

	assert.equal(actual, expected, 'Send method returns a promise');
	assert.end();
});

test('Send method fires 10 requests split over 2 queues and doesnt throw an error', assert => {
	return RequestPromiseQueue.send(url, {}, new Array(10));
});