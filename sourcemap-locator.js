var ajax = require('./ajax')


exports.fromUrl = function(sourceUrl, toSource) {
    if(toSource === undefined) toSource = false

    var response = ajax(sourceUrl, true)
    var sourcemapUrl = getSourceMapUrl(response.headers, response.text)
    if(toSource) {
        return ajax(sourcemapUrl).text
    } else {
        return sourcemapUrl
    }
}

exports.fromSource = function(sourceText, toSource) {
    if(toSource === undefined) toSource = false

    var sourcemapUrl = getSourceMapUrl({}, sourceText)
    if(toSource) {
        return ajax(sourcemapUrl).text
    } else {
        return sourcemapUrl
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