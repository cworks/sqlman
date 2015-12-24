#!/usr/bin/env node
var sqlman = require('./sqlman.js');
var io = require('./src/js/io');
var out = require('./src/js/out');
var dt = require('./src/js/datetime');
var path = require('path');
var handlebars = require('handlebars');
var args = require('minimist')(process.argv.slice(2), {
    boolean: ['debug'],
    alias: { h: 'help', v: 'version' }
});

function template(file, created) {

    // get your data into a variable
    var context = {file: file, created: created};

    // set up your handlebars template
    var source =
        '-- =============================================================================\n' +
        '-- File: {{file}} \n' +
        '-- Created: {{created}} \n' +
        '-- Sunshine on MySQL makes me happy... \n' +
        '-- =============================================================================\n';
    // compile the template
    var template = handlebars.compile(source);
    return template(context);
}

function usage() {
    out.println.cyan("----------------------------------------------------------");
    out.print.white("new ");
    out.println.red("[sql/file/to/create]");
    out.println.cyan("----------------------------------------------------------");
    out.print.yellow("    --help    ");
    out.println.cyan("print this usage info and exit");
    out.print.yellow("    --version ");
    out.println.cyan("print version info and exit");
}

function newFile() {
    if(args.debug) {
        out.println.yellow(args);
    }
    if(args.h) {
        usage();
        process.exit(0);
    }
    if(args.v) {
        out.println.cyan(sqlman.version());
        process.exit(0);
    }
    if(!args._[0]) {
        out.println.cyan("----------------------------------------------------------");
        out.println.red("Uh...I'll take filename now.");
        usage();
        process.exit(1);
    }

    var file = path.basename(args._[0]);
    var dir = path.dirname(args._[0]);
    file = 'V_' + dt().nowSuffix() + "__" + file;

    io().newFile(dir + "/" + file, template(dir + "/" + file, dt().now()));

}

newFile();
