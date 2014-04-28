
var find = require('../sourcemap-locator')

var sourceMapFilePath = "testResources/source.map.js"

module.exports = function(getFileContents) {
    return {
        fromUrl: function() {
            this.ok(find.fromUrl("testResources/sourceFileHashSymbol.js") === sourceMapFilePath)
            this.ok(find.fromUrl("testResources/sourceFileAtSymbol.js") === sourceMapFilePath)
            this.ok(find.fromUrl("testResources/sourceFile_SourceMapHeader.js") === sourceMapFilePath, find.fromUrl("testResources/sourceFile_SourceMapHeader.js"))
            this.ok(find.fromUrl("testResources/sourceFile_X-SourceMapHeader.js") === sourceMapFilePath)
        },
        fromUrlToSource: function() {
            var sourceMapFileContents = getFileContents(sourceMapFilePath)
            this.ok(find.fromUrl("testResources/sourceFileHashSymbol.js", true) === sourceMapFileContents, find.fromUrl("testResources/sourceFileHashSymbol.js", true))
            this.ok(find.fromUrl("testResources/sourceFileAtSymbol.js", true) === sourceMapFileContents)
            this.ok(find.fromUrl("testResources/sourceFile_SourceMapHeader.js", true) === sourceMapFileContents)
            this.ok(find.fromUrl("testResources/sourceFile_X-SourceMapHeader.js", true) === sourceMapFileContents)
        },
        fromSource: function() {
            this.ok(find.fromSource(getFileContents("testResources/sourceFileHashSymbol.js")) === sourceMapFilePath, find.fromSource(getFileContents("testResources/sourceFileHashSymbol.js")))
            this.ok(find.fromSource(getFileContents("testResources/sourceFileAtSymbol.js")) === sourceMapFilePath)
        },
        fromSourceToSource: function() {
            var sourceMapFileContents = getFileContents(sourceMapFilePath)
            this.ok(find.fromSource(getFileContents("testResources/sourceFileHashSymbol.js"), true) === sourceMapFileContents)
            this.ok(find.fromSource(getFileContents("testResources/sourceFileAtSymbol.js"), true) === sourceMapFileContents)
        }
    }
}