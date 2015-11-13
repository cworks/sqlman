var fs     = require('fs');
var path   = require('path');
var shell  = require('shelljs');

function _io() {

    return {
        newFile: function(file, content) {
            var dir = path.dirname(file);
            if(!dir) return;
            shell.mkdir("-p", dir);
            fs.writeFile(file, content, function (err) {
                if (err) throw err;
            });
        }
    }
}

module.exports = _io;
