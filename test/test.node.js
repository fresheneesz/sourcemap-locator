var fs = require("fs")

var unit = require("deadunit")
var tests = require("./tests")

unit.test('find.fromSource', tests(getFileContents).fromSource).writeConsole()

function getFileContents(path) {
    return fs.readFileSync(__dirname+'/'+path).toString()
}