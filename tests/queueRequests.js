import test from 'tape';
import queueRequests from '../lib/queueRequests';

//Copied from blue-tape
function isPromise(p) {
	return p && p.then && typeof p.then === 'function' ? true : false;
}

test('queueRequests is a function', assert => {
	const actual = typeof queueRequests;
	const expected = 'function';

	assert.equal(actual, expected, 'queueRequests should be a function');
	assert.end();
});

test('queueRequests returns a promise', assert => {
	const actual = isPromise(queueRequests());
	const expected = true;

	assert.equal(actual, expected, 'queueRequests returns a promise');
	assert.end();
});