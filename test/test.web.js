var unit = require("deadunit/deadunit.browser")
var getTests = require("./tests")

unit.test(function() {
    this.count(4)

    var tests = getTests(getFileContents)
    for(var test in tests) {
        this.test(test, tests[test])
    }
}).writeHtml($('body'))


function getFileContents(path) {
    var knownFiles = {
        "testResources/sourceFileHashSymbol.js": require("raw!./testResources/sourceFileHashSymbol.js"),
        "testResources/sourceFileAtSymbol.js": require("raw!./testResources/sourceFileAtSymbol.js"),
        "testResources/sourceFile_SourceMapHeader.js": require("raw!./testResources/sourceFile_SourceMapHeader.js"),
        "testResources/sourceFile_X-SourceMapHeader.js": require("raw!./testResources/sourceFile_X-SourceMapHeader.js"),
        "testResources/source.map.js": require("raw!./testResources/source.map.js"),
        "testResources/sourceFileDataUrl.js": require("raw!./testResources/sourceFileDataUrl.js"),
        "testResources/noSourceMap.js": require("raw!./testResources/noSourceMap.js")
    }

    var result = knownFiles[path]
    if(result !== undefined) {
        return result
    } else {
        throw new Error("Didnt expect you'd be needing "+path)
    }
}