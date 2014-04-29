
var find = require('../sourcemap-locator')

var sourceMapFilePath = "testResources/source.map.js"

module.exports = function(getFileContents) {
    var sourceMapFileContents = getFileContents(sourceMapFilePath)

    return {
        fromUrl: function(t) {
            this.count(4)

            find.fromUrl("testResources/sourceFileHashSymbol.js").then(function(sourcemapUrl) {
                t.ok(sourcemapUrl === sourceMapFilePath)
            }).done()
            find.fromUrl("testResources/sourceFileAtSymbol.js").then(function(sourcemapUrl) {
                t.ok(sourcemapUrl === sourceMapFilePath)
            }).done()
            find.fromUrl("testResources/sourceFile_SourceMapHeader.js").then(function(sourcemapUrl) {
                t.ok(sourcemapUrl === sourceMapFilePath)
            }).done()
            find.fromUrl("testResources/sourceFile_X-SourceMapHeader.js").then(function(sourcemapUrl) {
                t.ok(sourcemapUrl === sourceMapFilePath)
            }).done()
        },
        fromUrlToSource: function(t) {
            this.count(4)

            find.fromUrl("testResources/sourceFileHashSymbol.js", true).then(function(sourcemapContents) {
                t.ok(sourcemapContents === sourceMapFileContents)
            }).done()
            find.fromUrl("testResources/sourceFileAtSymbol.js", true).then(function(sourcemapContents) {
                t.ok(sourcemapContents === sourceMapFileContents)
            }).done()
            find.fromUrl("testResources/sourceFile_SourceMapHeader.js", true).then(function(sourcemapContents) {
                t.ok(sourcemapContents === sourceMapFileContents)
            }).done()
            find.fromUrl("testResources/sourceFile_X-SourceMapHeader.js", true).then(function(sourcemapContents) {
                t.ok(sourcemapContents === sourceMapFileContents)
            }).done()
        },
        fromSource: function(t) {
            this.count(2)

            find.fromSource(getFileContents("testResources/sourceFileHashSymbol.js")).then(function(sourcemapUrl) {
                t.ok(sourcemapUrl === sourceMapFilePath, sourcemapUrl)
            }).done()
            find.fromSource(getFileContents("testResources/sourceFileAtSymbol.js")).then(function(sourcemapUrl) {
                t.ok(sourcemapUrl === sourceMapFilePath, sourcemapUrl)
            }).done()
        },
        fromSourceToSource: function(t) {
            this.count(2)

            find.fromSource(getFileContents("testResources/sourceFileHashSymbol.js"), true).then(function(sourcemapContents) {
                t.ok(sourcemapContents === sourceMapFileContents, sourcemapContents, sourceMapFileContents)
            }).done()
            find.fromSource(getFileContents("testResources/sourceFileAtSymbol.js"), true).then(function(sourcemapContents) {
                t.ok(sourcemapContents === sourceMapFileContents, sourcemapContents, sourceMapFileContents)
            }).done()
        }
    }
}