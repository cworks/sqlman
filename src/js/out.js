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
};

module.exports.print = _print.none;
module.exports.print.red = _print.red;
module.exports.print.green = _print.green;
module.exports.print.yellow = _print.yellow;
module.exports.print.blue = _print.blue;
module.exports.print.magenta = _print.magenta;
module.exports.print.cyan = _print.cyan;
module.exports.print.white = _print.white;
module.exports.print.gray = _print.gray;

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
};

module.exports.println = _println.none;
module.exports.println.red = _println.red;
module.exports.println.green = _println.green;
module.exports.println.yellow = _println.yellow;
module.exports.println.blue = _println.blue;
module.exports.println.magenta = _println.magenta;
module.exports.println.cyan = _println.cyan;
module.exports.println.white = _println.white;
module.exports.println.gray = _println.gray;
