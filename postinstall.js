#!/usr/bin/env node
var sqlman = require('./sqlman.js');
var shell  = require('shelljs');
var handlebars = require('handlebars');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

function template(rootpw, user, password) {
    // get your data into a variable
    var context = {rootpw: rootpw, user: user, password: password};
    // set up your handlebars template
    var source = "USE mysql;\n" +
        "UPDATE user SET Password = PASSWORD('{{rootpw}}') WHERE User = 'root';\n" +
        "FLUSH PRIVILEGES;\n" +
        "# remove anonymous user\n" +
        "DELETE FROM user\n" +
        "WHERE User = '';\n" +
        "# drop unsecured test database\n" +
        "DROP DATABASE IF EXISTS test;\n" +
        "# create a master user\n" +
        "CREATE USER '{{user}}'@'localhost' IDENTIFIED BY '{{password}}';\n" +
        "GRANT ALL PRIVILEGES ON *.* TO '{{user}}'@'localhost' WITH GRANT OPTION;\n";
    // compile the template
    var template = handlebars.compile(source);
    return template(context);
}
/*
 * =============================================================================
 * postinstall script main
 * =============================================================================
 */
function postinstall() {

    var rootpw = null, user = null, password = null;
    rl.question('Set the root account password: ', function(answer) {
        console.log('Oh, so your root password is: ' + answer);
        rootpw = answer;
        rl.question('Create a new user: ', function(answer) {
            console.log('Oh, so your new user is: ' + answer);
            user = answer;
            rl.question("Set the new user's password: ", function(answer) {
                console.log("Oh, so your new user's password is: " + answer);
                password = answer;
                rl.close();
            });
        });
    });
    rl.on('close', function() {
        sqlman.io().newFile("postinstall.sql", template(rootpw, user, password));

        shell.exec("mysql -u root -p < " + "postinstall.sql", function(code) {
            if(code !== 0) {
                shell.echo("Exit code: ".red + code
                    + " was none zero, this backup may have failed.".red);
            }
            shell.rm('-f', 'postinstall.sql');
        });

        console.log('Have a great day!');
    });
}

postinstall();
