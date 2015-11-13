#!/usr/bin/env node
var sqlman = require('./sqlman.js');
var shell  = require('shelljs');
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
    sqlman.println("----------------------------------------------------------").cyan();
    sqlman.print("new ").white();
    sqlman.println("[sql/file/to/create]").red();
    sqlman.println("----------------------------------------------------------").cyan();
    sqlman.print("    --help    ").yellow();
    sqlman.println("print this usage info and exit").cyan();
    sqlman.print("    --version ").yellow();
    sqlman.println("print version info and exit").cyan();
}

function newFile() {
    if(args.debug) {
        shell.echo(args);
        return;
    }
    if(args.h) {
        usage();
        process.exit(0);
    }
    if(args.v) {
        sqlman.println(sqlman.version()).cyan();
        process.exit(0);
    }
    if(!args._[0]) {
        sqlman.println("Uh...we'll take that SQL file now.").red();
        usage();
        process.exit(1);
    }

    var file = path.basename(args._[0]);
    var dir = path.dirname(args._[0]);
    file = 'V_' + sqlman.datetime().nowSuffix() + "__" + file;

    sqlman.io().newFile(dir + "/" + file,
        template(dir + "/" + file,
            sqlman.datetime().now()));

}

newFile();
