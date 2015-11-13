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
var args   = require('minimist')(process.argv.slice(2), {
    boolean: ['append','zip','debug'],
    alias: { h: 'help', v: 'version' }
});

function usage() {
    sqlman.println("----------------------------------------------------------").cyan();
    sqlman.print("backup ").white();
    sqlman.println("[db]").red();
    sqlman.println("----------------------------------------------------------").cyan();
    sqlman.print("    --db      ").yellow();
    sqlman.println("database name").cyan();
    sqlman.print("    --dir     ").yellow();
    sqlman.println("directory to place backup file").cyan();
    sqlman.print("    --zip     ").yellow();
    sqlman.println("zip the backup file").cyan();
    sqlman.print("    --append  ").yellow();
    sqlman.println("append datetime to backup file").cyan();
    sqlman.print("    --help    ").yellow();
    sqlman.println("print this usage info and exit").cyan();
    sqlman.print("    --version ").yellow();
    sqlman.println("print version info and exit").cyan();
}
/*
 * =============================================================================
 * backup script main
 * =============================================================================
 */
function backup() {
    var db = "", target = "", iszip = false;

    if(args.debug) {
        shell.echo(args);
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
    if(args.db) {
        db = args.db;
    } else {
        db = args._[0];
    }

    var backupFile = db + "_backup";
    if(args.append) {
        backupFile += "_" + sqlman.datetime().nowSuffix();
    }
    backupFile += ".sql";

    if(args.dir) {
        target = args.dir + "/";
        shell.mkdir("-p", target);
    }
    var cmd = "mysqldump --login-path=local " + db + " > " + target + backupFile;

    shell.exec(cmd, function(code) {
        if(code !== 0) {
            shell.echo("Exit code: ".red + code
                + " was none zero, this backup may have failed.".red);
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
