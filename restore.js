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
var shell  = require('shelljs');
var path   = require('path');
var args   = require('minimist')(process.argv.slice(2), {
    boolean: ['debug'],
    alias: { h: 'help', v: 'version' }
});

function usage() {
    sqlman.println("----------------------------------------------------------").cyan();
    sqlman.print("restore ").white();
    sqlman.println("[db] [backup file]").red();
    sqlman.println("----------------------------------------------------------").cyan();
    sqlman.print("    --db      ").yellow();
    sqlman.println("database name").cyan();
    sqlman.print("    --backup  ").yellow();
    sqlman.println("backup file to restore").cyan();
    sqlman.print("    --help    ").yellow();
    sqlman.println("print this usage info and exit").cyan();
    sqlman.print("    --version ").yellow();
    sqlman.println("print version info and exit").cyan();
}
/*
 * =============================================================================
 * restore script
 * =============================================================================
 */
function restore() {
    var db = "", backup = "", iszipped = false;

    if(args.debug) {
        sqlman.println(args).green();
    }
    if(args.h) {
        usage();
        process.exit(0);
    }
    if(args.v) {
        sqlman.println(sqlman.version()).cyan();
        process.exit(0);
    }
    if(!args.db && !args._[0]) {
        sqlman.println("Pretty please with sugar on top...provide a db.").red();
        usage();
        process.exit(1);
    }
    if(!args.backup && !args._[1]) {
        sqlman.println("Pretty please with sugar on top...provide a backup file.").red();
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
    sqlman.println("Dropping database " + db).green();
    shell.exec(cmd, function(code) {
        if(code !== 0) {
            sqlman.println("Exit code: " + code
                + " was none zero, DROP DATABASE may have failed.").red();
        }
    });
    var createStmt = "'CREATE DATABASE " + db + "';";
    cmd = "mysql --login-path=local -e " + createStmt;
    sqlman.println("Creating database " + db).green();
    shell.exec(cmd, function(code) {
        if(code !== 0) {
            sqlman.println("Exit code: " + code
            + " was none zero, CREATE DATABASE may have failed.").red();
        }
    });
    var tempdir = "";
    if(iszipped) {
        // unzip to tmp and restore
        tempdir = "." + sqlman.datetime().nowSuffix();
        shell.mkdir(tempdir);
        shell.exec("unzip " + backup + " -d " + tempdir + " > /dev/null 2>&1");
        backup = tempdir + "/" + sqlman.replaceText(path.basename(backup), ".zip", ".sql");
        if(args.debug) {
            sqlman.println(backup).red();
        }
    }
    var restoreStmt = db + " < " + backup;
    cmd = "mysql --login-path=local " + restoreStmt;
    sqlman.println("Restoring database " + db).green();
    shell.exec(cmd, function(code) {
        if(code !== 0) {
            sqlman.println("Exit code: " + code
                + " was none zero, RESTORE DATABASE may have failed.").red();
        }
        if(iszipped) {
            shell.rm("-rf", tempdir);
        }
    });
}

restore();
