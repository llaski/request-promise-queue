import test from 'tape';
import queueRequests from '../lib/queueRequests';

const url = 'http://jsonplaceholder.typicode.com/posts/1';

const dataFixture = (size) => Array.from(Array(size || 1).keys());

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

test('queueRequests should return 5 results for an array of 5 items', assert => {
	assert.plan(2);

	queueRequests({
		uri: url
	}, dataFixture(2)).then((results) => {
		const actual = Array.isArray(results);
		const expected = true;

		assert.equal(actual, expected, 'Results should be an array');

		const actual1 = results.length;
		const expected2 = 2;

		assert.equal(actual1, expected2, 'Results should contain 5 items');

	});
});