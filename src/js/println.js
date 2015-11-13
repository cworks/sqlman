var colors = require('colors');

function _println(text) {
    var _text = text;
    return {
        white: function() {
            process.stdout.write(_text.white + '\n');
        },
        cyan: function() {
            process.stdout.write(_text.cyan + '\n');
        },
        red: function() {
            process.stdout.write(_text.red + '\n');
        },
        yellow: function() {
            process.stdout.write(_text.yellow + '\n');
        },
        green: function() {
            process.stdout.write(_text.green + '\n');
        },
    };
};

module.exports = _println;
