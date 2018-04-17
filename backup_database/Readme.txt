Usage:

1) Include library in your project.
Example:
include "Backup_database.php";

2) Make object of library class.
Example:
$obj = new Backup_database();

3) You can set database credentials directly while making object.
Example:
$obj = new Backup_database($hostname = 'localhost', $username = 'root', $password = '', $database = 'dummy_db');

4) Alternatively you can use functions to set database credentials.
Example:
$obj->setHostname("localhost");
$obj->setUsername("root");
$obj->setPassword("");
$obj->setDatabase("dummy_db");

5) Set table/tables you want to backup.
Example:
$obj->setTables("*");

## Use * for all tables, or you can enter table name as well. ##

6) Set output directory.
Example:
$obj->setOutputDir(__DIR__);

## __DIR__ will save file in current directory. You can provide your own directory path. ##

7) Finaly call the backup function.
Example:
$obj->backup();

Your code will look like this.

include "Backup_database.php";
$obj = new Backup_database();
$obj->setHostname("localhost");
$obj->setUsername("root");
$obj->setPassword("");
$obj->setDatabase("dummy_db");
$obj->setTables("*");
$obj->setOutputDir(__DIR__);
$obj->backup();

If you've done everthing correctly. Now you should have your database sql file in the provided directory.

