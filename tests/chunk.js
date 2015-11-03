var test = require('tape');
var chunk = require('../src/chunk');

var build = function(size) {

    var arr = [];
    for (var i = 0; i < size; i++) {
        arr.push(i + 1);
    }

    return arr;
};

test('chunk is a function', function(assert) {
    var actual = typeof chunk;
    var expected = 'function';

    assert.equal(actual, expected, 'chunk should be a function');
    assert.end();
});

test('returns 2 chunks of 1', function(assert) {
    var actual = chunk([1, 2], 1);
    var expected = [
        [1],
        [2]
    ];

    assert.deepEqual(actual, expected, 'chunk should split an array with 2 items with chunk size of 1 into an array of array with 1 item each');
    assert.end();
});

test('returns 1 chunk of 2', function(assert) {
    var actual = chunk([1, 2]);
    var expected = [
        [1, 2]
    ];

    assert.deepEqual(actual, expected, 'chunk should return 1 chunk with 2 items for default chunk size of 2');
    assert.end();
});

test('returns 1 chunk of 8', function(assert) {
    var actual = chunk([1, 2, 3, 4, 5, 6, 7, 8], 8);
    var expected = [
        [1, 2, 3, 4, 5, 6, 7, 8]
    ];

    assert.deepEqual(actual, expected, 'chunk should return 1 chunk of 8 with chunk size of 8');
    assert.end();
});

test('returns 2 chunks of 2', function(assert) {
    var actual = chunk([1, 2, 3, 4]);
    var expected = [
        [1, 2],
        [3, 4]
    ];

    assert.deepEqual(actual, expected, 'chunk should split an array with 4 items with default chunk size of 2 into an array of array with 2 items each');
    assert.end();
});

test('returns 4 chunks of 1', function(assert) {
    var actual = chunk([1, 2, 3, 4], 1);
    var expected = [
        [1],
        [2],
        [3],
        [4]
    ];

    assert.deepEqual(actual, expected, 'chunk should split an array with 4 items with chunk size of 1 into an array of array with 1 item each');
    assert.end();
});

test('returns 4 chunks of 2', function(assert) {
    var actual = chunk([1, 2, 3, 4, 5, 6, 7, 8]);
    var expected = [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8]
    ];

    assert.deepEqual(actual, expected, 'chunk should split an array with 8 items with default chunk size of 2 into an array of array with 2 items each');
    assert.end();
});

test('returns 2 chunks of 7 and 1', function(assert) {
    var actual = chunk([1, 2, 3, 4, 5, 6, 7, 8], 7);
    var expected = [
        [1, 2, 3, 4, 5, 6, 7],
        [8]
    ];

    assert.deepEqual(actual, expected, 'chunk should return 2 chunks for 8 items with chunk size of 7, one chunk having 7 items and the 2nd have 2 item');
    assert.end();
});

test('returns 5 chunks of 10', function(assert) {
    var actual = chunk(build(50), 10);
    var expected = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
    ];

    assert.deepEqual(actual, expected, 'chunk should return 5 chunks for 50 items with chunk size of 10, each chunk having 10 items');
    assert.end();
});