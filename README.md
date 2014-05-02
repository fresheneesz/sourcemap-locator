`sourcemap-locator`
========

From a browser, finds the sourcemap url or the sourcemap file itself, given the URL (or source) of the original source file. Uses [async-futures](https://github.com/fresheneesz/asyncFuture).

Example
======

```javascript
findSourcemap.fromUrl('originalSourceFile.js').then(function(sourcemapUrl) {
    // do something with the sourcemapUrl
}).done()
```

Install
=======

```
npm install sourcemap-locator
```

Usage
=====

```javascript
var findSourcemap = require('sourcemap-locator') // use webpack (recommended) or browserify
```

These return a future of the sourcemap URL, or future undefined if it isn't found:
```javascript
findSourcemap.fromUrl(originalSourceUrl)
findSourcemap.fromSource(originalSourceText) // works in node.js (the other ones don't)
```

These return a future of the text of the sourcemap file, or future undefined if it isn't found:
```javascript
findSourcemap.fromUrl(originalSourceUrl, true)
findSourcemap.fromSource(originalSourceUrl, true)
```

These override cache maintainance functions if you have a separate cache of file sources
```javascript
findSourcemap.cacheGet(function(url) {
   // get the url from your own cache
})
findSourcemap.cacheSet(function(url, futureResponse) {
   // set the content downloaded from a url for your own cache using futureResponse
})
```

Browser Support
=========

Tested in the following browsers:
* Chrome 31
* Firefox 26
* IE 10

How to Contribute!
============

Anything helps:

* Creating issues (aka tickets/bugs/etc). Please feel free to use issues to report bugs, request features, and discuss changes.
* Updating the documentation: ie this readme file. Be bold! Help create amazing documentation!
* Submitting pull requests.

How to submit pull requests:

1. Please create an issue and get my input before spending too much time creating a feature. Work with me to ensure your feature or addition is optimal and fits with the purpose of the project.
2. Fork the repository
3. clone your forked repo onto your machine and run `npm install` at its root
4. If you're gonna work on multiple separate things, its best to create a separate branch for each of them
5. edit!
6. If it's a code change, please add to the unit tests (in the 'test/' folder) to verify that your change works
  * Browser tests need to have the test package built and test server running - run test/buildAndServe.js to do this
7. When you're done, run the unit tests and ensure they all pass
8. Commit and push your changes
9. Submit a pull request: https://help.github.com/articles/creating-a-pull-request

Change Log
=========

* 2.1.3 - updating ajax
* 2.1.2 - updating async-future
* 2.1.1 - supporting data urls
* 2.1.0 - properly handling files that don't have a sourcemap (duh)
* 2.0.0 - changing to asynchronous file loading
* 1.0.0 - first release

License
=======
Released under the MIT license: http://opensource.org/licenses/MIT
