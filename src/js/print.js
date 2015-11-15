var colors = require('colors/safe');
var common = require('./common');

var _print = {
    none: function(thing) {
        process.stdout.write(common.toString(thing));
    },
    red: function(thing) {
        process.stdout.write(colors.red(common.toString(thing)));
    },
    green: function(thing) {
        process.stdout.write(colors.green(common.toString(thing)));
    },
    yellow: function(thing) {
        process.stdout.write(colors.yellow(common.toString(thing)));
    },
    blue: function(thing) {
        process.stdout.write(colors.blue(common.toString(thing)));
    },
    magenta: function(thing) {
        process.stdout.write(colors.magenta(common.toString(thing)));
    },
    cyan: function(thing) {
        process.stdout.write(colors.cyan(common.toString(thing)));
    },
    white: function(thing) {
        process.stdout.write(colors.white(common.toString(thing)));
    },
    gray: function(thing) {
        process.stdout.write(colors.gray(common.toString(thing)));
    }
}

module.exports = _print.none;
module.exports.red = _print.red;
module.exports.green = _print.green;
module.exports.yellow = _print.yellow;
module.exports.blue = _print.blue;
module.exports.magenta = _print.magenta;
module.exports.cyan = _print.cyan;
module.exports.white = _print.white;
module.exports.gray = _print.gray;
