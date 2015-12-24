var colors = require('colors/safe');
var common = require('./common');

var _println = {
    none: function(thing) {
        process.stdout.write(common.toString(thing) + '\n');
    },
    red: function(thing) {
        process.stdout.write(colors.red(common.toString(thing)) + '\n');
    },
    green: function(thing) {
        process.stdout.write(colors.green(common.toString(thing)) + '\n');
    },
    yellow: function(thing) {
        process.stdout.write(colors.yellow(common.toString(thing)) + '\n');
    },
    blue: function(thing) {
        process.stdout.write(colors.blue(common.toString(thing)) + '\n');
    },
    magenta: function(thing) {
        process.stdout.write(colors.magenta(common.toString(thing)) + '\n');
    },
    cyan: function(thing) {
        process.stdout.write(colors.cyan(common.toString(thing)) + '\n');
    },
    white: function(thing) {
        process.stdout.write(colors.white(common.toString(thing)) + '\n');
    },
    gray: function(thing) {
        process.stdout.write(colors.gray(common.toString(thing)) + '\n');
    }
}

module.exports = _println.none;
module.exports.red = _println.red;
module.exports.green = _println.green;
module.exports.yellow = _println.yellow;
module.exports.blue = _println.blue;
module.exports.magenta = _println.magenta;
module.exports.cyan = _println.cyan;
module.exports.white = _println.white;
module.exports.gray = _println.gray;
