request-promise-queue
=====================

[![Build Status](https://travis-ci.org/llaski/request-promise-queue.svg?branch=master)](https://travis-ci.org/llaski/request-promise-queue)

Request Promise Queue.

### What does this do?

This is a small package designed to help use cases where you as a developer need to process a large amount of data at a given time and don't want to flood your server with thousands of requests at once. Using this package, you can decide how many groups of data you want your large set to be broken down into and the library will handle chunking it and perform all necessary requets and then returning your the result.

For example if a user uploaded a file with 5k rows worth of data and you need to process one invidually (lets say you had to use a third party API so you can't batch them). With this library you could break your 5k rows into 25 groups, and then send the url to hit, the data, and the size to the library and it would handle performing only 25 requests at at time, thereby not flooding your server and giving you a nice promise based interface to worth with upon all of their completion.

### Demo

`npm install`
`./node_modules/.bin/gulp`

Open http://localhost:9000 and follow the instructions

### License

Licensed under the MIT License.