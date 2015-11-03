'use strict';

var defaultsDeep = require('lodash.defaultsdeep');
var chunk = require('./chunk');
var queueRequests = require('./queueRequests');

;
(function() {

	var root = this;

    var RequestPromiseQueue = {
        send: function(uri, requestOptions, requestData) {
            if (!uri) {
                throw new Error('A uri must be provided');
            }

            requestOptions = defaultsDeep(requestOptions || {}, {
                uri: uri,
                method: 'GET'
            });

            requestData = defaultsDeep(requestData || {}, {
                data: [],
                size: 2
            });

            var queues = chunk(requestData.data, requestData.size).map(function(arr) {
                return queueRequests(requestOptions, arr);
            });

            return Promise.all(queues);
        }
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = RequestPromiseQueue;
        }

        exports.RequestPromiseQueue = RequestPromiseQueue;
    } else {
        root.RequestPromiseQueue = RequestPromiseQueue;
    }

}).call(this);