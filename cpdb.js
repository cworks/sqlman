#!/usr/bin/env node

# ---------------------------------------------------------
backup_before

database=payroll_compare
drop="DROP DATABASE IF EXISTS ${database};"
create="CREATE DATABASE ${database};"
backupFile=payroll.before.backup.sql

echo "Dropping database ${database}"
mysql -u corbett --password=rockon123 -e "${drop}"

echo "Creating database ${database}"
mysql -u corbett --password=rockon123 -e "${create}"

echo "Restoring database ${database}"
mysql -u corbett --password=rockon123 ${database} < "backups/${backupFile}"
