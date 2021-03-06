var ajax = require('ajax')
var Future = require("async-future")
var decodeDataUrl = require("./decodeDataUrl")

exports.fromUrl = function(sourceUrl, toSource) {
    return ajax(sourceUrl, true).then(function(response) {
        return fromSourceOrHeaders(response.headers, response.text, toSource)
    })
}

exports.fromSource = function(sourceText, toSource) {
    return fromSourceOrHeaders({}, sourceText, toSource)
}

function fromSourceOrHeaders(headers, sourceText, toSource) {
    if(toSource === undefined) toSource = false

    var sourcemapUrl = getSourceMapUrl(headers, sourceText)
    if(sourcemapUrl === undefined) {
        return Future(undefined)
    } else if(toSource) {
        if(sourcemapUrl.indexOf('data:') === 0) {
            return Future(decodeDataUrl(sourcemapUrl))
        } else {
            return ajax(sourcemapUrl).then(function(response) {
                return Future(response.text)
            })
        }
    } else {
        return Future(sourcemapUrl)
    }
}

exports.cacheGet = ajax.cacheGet
exports.cacheSet = ajax.cacheSet



var URL_PATTERN = '(((?:http|https|file)://)?[^\\s)]+|javascript:.*)'
var SOURCE_MAP_PATTERN_PART = " sourceMappingURL=("+URL_PATTERN+")"
var SOURCE_MAP_PATTERN1 = "\/\/#"+SOURCE_MAP_PATTERN_PART
var SOURCE_MAP_PATTERN2 = "\/\/@"+SOURCE_MAP_PATTERN_PART

function getSourceMapUrl(headers, content) {
    if(headers['SourceMap'] !== undefined) {
        return headers['SourceMap']
    } else if(headers['X-SourceMap']) {
        return headers['X-SourceMap']
    } else {
        var match = content.match(SOURCE_MAP_PATTERN1)
        if(match !== null) return match[1]

        match = content.match(SOURCE_MAP_PATTERN2)
        if(match !== null) return match[1]
    }
}