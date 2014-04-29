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
    if(path === "testResources/sourceFileHashSymbol.js") {
        return require("raw!./testResources/sourceFileHashSymbol.js")

    } else if(path === "testResources/sourceFileAtSymbol.js") {
        return require("raw!./testResources/sourceFileAtSymbol.js")

    } else if(path === "testResources/sourceFile_SourceMapHeader.js") {
        return require("raw!./testResources/sourceFile_SourceMapHeader.js")

    } else if(path === "testResources/sourceFile_X-SourceMapHeader.js") {
        return require("raw!./testResources/sourceFile_X-SourceMapHeader.js")

    } else if(path === "testResources/source.map.js") {
        return require("raw!./testResources/source.map.js")

    } else {
        throw new Error("Didnt expect you'd be needing "+path)
    }
}