#!/usr/bin/env node
/*
 * =============================================================================
 * This script requires that you've already executed this command (on 1 line)
 * This allows us to run mysql command line tools without passing a password
 * mysql_config_editor set
 *     --login-path=local
 *     --host=localhost
 *     --user=you
 *     --password
 * =============================================================================
 */
var sqlman = require('./sqlman');
var out = require('./src/js/out');
var dt = require('./src/js/datetime');
var shell  = require('shelljs');
var args   = require('minimist')(process.argv.slice(2), {
    boolean: ['append','zip','debug'],
    alias: { h: 'help', v: 'version' }
});

function usage() {
    out.println.cyan("----------------------------------------------------------");
    out.print.white("backup ");
    out.println.red("[db]");
    out.println.cyan("----------------------------------------------------------");
    out.print.yellow("    --db      ");
    out.println.cyan("database name");
    out.print.yellow("    --dir     ");
    out.println.cyan("directory to place backup file");
    out.print.yellow("    --zip     ");
    out.println.cyan("zip the backup file");
    out.print.yellow("    --append  ");
    out.println.cyan("append datetime to backup file");
    out.print.yellow("    --help    ");
    out.println.cyan("print this usage info and exit");
    out.print.yellow("    --version ");
    out.println.cyan("print version info and exit");
}
/*
 * =============================================================================
 * backup script main
 * =============================================================================
 */
function backup() {
    var db = "", target = "", iszip = false;
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
    if(!args.db && !args._[0]) {
        out.println.cyan("----------------------------------------------------------");        
        out.println.red("Pretty please with sugar on top...provide a db.");
        usage();
        process.exit(1);
    }
    if(args.db) {
        db = args.db;
    } else {
        db = args._[0];
    }

    var backupFile = db + "_backup";
    if(args.append) {
        backupFile += "_" + dt().nowSuffix();
    }
    backupFile += ".sql";

    if(args.dir) {
        target = args.dir + "/";
        shell.mkdir("-p", target);
    }
    var cmd = "mysqldump --login-path=local " + db + " > " + target + backupFile;

    shell.exec(cmd, function(code) {
        if(code !== 0) {
            out.println.red("Exit code: " + code
                + " was none zero, this backup may have failed.");
        }
    });

    if(args.zip) {
        var zipfile = backupFile.substring(0, backupFile.length-3) + "zip";
        if(target !== "") {
            shell.cd(target);
        }
        shell.exec("zip " + zipfile + " " + backupFile);
        shell.rm(backupFile);
    }
}

backup();
