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
var sqlman = require('./sqlman.js');
var out = require('./src/js/out');
var dt = require('./src/js/datetime');
var shell = require('shelljs');
var path = require('path');
var args = require('minimist')(process.argv.slice(2), {
    boolean: ['debug'],
    alias: { h: 'help', v: 'version' }
});

function usage() {
    out.println.cyan("----------------------------------------------------------");
    out.print.white("restore ");
    out.println.red("[db] [backup file]");
    out.println.cyan("----------------------------------------------------------");
    out.print.yellow("    --db      ");
    out.println.cyan("database name");
    out.print.yellow("    --backup  ");
    out.println.cyan("backup file to restore");
    out.print.yellow("    --help    ");
    out.println.cyan("print this usage info and exit");
    out.print.yellow("    --version ");
    out.println.cyan("print version info and exit");
}
/*
 * =============================================================================
 * restore script
 * =============================================================================
 */
function restore() {
    var db = "", backup = "", iszipped = false;

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
    if(!args.backup && !args._[1]) {
        out.println.cyan("----------------------------------------------------------");        
        out.println.red("Pretty please with sugar on top...provide a backup file.");
    }
    if(args.db) {
        db = args.db;
    } else {
        db = args._[0];
    }
    if(args.backup) {
        backup = args.backup;
    } else {
        backup = args._[1];
    }
    if(sqlman.endsWith(backup, ".zip")) {
        iszipped = true;
    }

    var dropStmt = "'DROP DATABASE IF EXISTS " + db + "';";
    var cmd = "mysql --login-path=local -e " + dropStmt;
    out.println.green("Dropping database " + db);
    shell.exec(cmd, function(code) {
        if(code !== 0) {
            out.println.red("Exit code: " + code
                + " was none zero, DROP DATABASE may have failed.");
        }
    });
    var createStmt = "'CREATE DATABASE " + db + "';";
    cmd = "mysql --login-path=local -e " + createStmt;
    out.println.green("Creating database " + db);
    shell.exec(cmd, function(code) {
        if(code !== 0) {
            out.println.red("Exit code: " + code
                + " was none zero, CREATE DATABASE may have failed.");
        }
    });
    var tempdir = "";
    if(iszipped) {
        // unzip to tmp and restore
        tempdir = "." + dt().nowSuffix();
        shell.mkdir(tempdir);
        shell.exec("unzip " + backup + " -d " + tempdir + " > /dev/null 2>&1");
        backup = tempdir + "/" + sqlman.replaceText(path.basename(backup), ".zip", ".sql");
        if(args.debug) {
            out.println.red(backup);
        }
    }
    var restoreStmt = db + " < " + backup;
    cmd = "mysql --login-path=local " + restoreStmt;
    out.println.green("Restoring database " + db);
    shell.exec(cmd, function(code) {
        if(code !== 0) {
            out.println.red("Exit code: " + code
                + " was none zero, RESTORE DATABASE may have failed.");
        }
        if(iszipped) {
            shell.rm("-rf", tempdir);
        }
    });
}

restore();
