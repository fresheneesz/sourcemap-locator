/**
 * Try XHR methods in order and store XHR factory.
 *
 * @return <Function> XHR function or equivalent
 */
var createXMLHTTPObject = function() {
    var xmlhttp, XMLHttpFactories = [
        function() {
            return new XMLHttpRequest()
        }, function() {
            return new ActiveXObject('Msxml2.XMLHTTP')
        }, function() {
            return new ActiveXObject('Msxml3.XMLHTTP')
        }, function() {
            return new ActiveXObject('Microsoft.XMLHTTP')
        }
    ];
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            xmlhttp = XMLHttpFactories[i]()
            // Use memoization to cache the factory
            createXMLHTTPObject = XMLHttpFactories[i]
            return xmlhttp;
        } catch (e) {
        }
    }
}


var HEADER = "([^\\s]+): (.*)"

/**
 * @return the text from a given URL
 */
exports = module.exports = function(url) {
    if(getFromCache(url))
        return getFromCache(url)

    var req = createXMLHTTPObject();
    if (req) {
        try {
            req.open('GET', url, false)
            req.send(null)

            var headers = {}
            req.getAllResponseHeaders().split('\n').forEach(function(line) {
                var match = line.match(HEADER)
                if(match !== null) {
                    var name = match[1]
                    var value = match[2]

                    headers[name] = value
                }
            })

            var result = {text: req.responseText, headers: headers}
            setOnCache(url, result)
            return result

        } catch (e) {
            throw new Error(e)
        }
    } else {
        throw new Error('Cant get XmlHttpRequest object')
    }
}

var cache = {}
var getFromCache = function(url) {
    return cache[url]
}
var setOnCache = function(url, result) {
    cache[url] = result
}

exports.cacheGet = function(fn) {
    getFromCache = fn
}
exports.cacheSet = function(fn) {
    setOnCache = fn
}

