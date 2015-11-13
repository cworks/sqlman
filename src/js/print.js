var colors = require('colors');

function _print(text) {
    var _text = text;
    return {
        white: function() {
            process.stdout.write(_text.white);
        },
        cyan: function() {
            process.stdout.write(_text.cyan);
        },
        red: function() {
            process.stdout.write(_text.red);
        },
        yellow: function() {
            process.stdout.write(_text.yellow);
        },
        green: function() {
            process.stdout.write(_text.green);
        },
    };
}

module.exports = _print;
