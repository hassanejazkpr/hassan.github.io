<?php
class Backup_database
{
    public $hostname;
    public $username;
    public $password;
    public $database;
    public $charset;

    public $tables;
    public $outputDir;
    public $fileName = null;
    public $zipName = null;
    public $createZip = false;

    public $saveFile = false;

    public $downloadFile = true;

    private $connection;

    /**
     * Backup_database::__construct()
     * 
     * @param mixed $hostname
     * @param mixed $username
     * @param mixed $password
     * @param mixed $database
     * @param mixed $charset
     * @return void
     */
    function __construct($hostname = null, $username = null, $password = null, $database = null,
        $charset = null)
    {
        if ($hostname && $username && $database) {
            $this->hostname = $hostname;
            $this->username = $username;
            $this->password = $password;
            $this->database = $database;
            $this->charset = $charset;

            $this->initialize();
        }
    }

    /**
     * Backup_Database::initialize()
     * 
     * @return void
     */
    private function initialize()
    {
        $this->connection = mysqli_connect($this->hostname, $this->username, $this->
            password, $this->database);

        if (!mysqli_set_charset($this->connection, "utf-8")) {
            mysqli_query($this->connection, 'SET NAMES ' . $this->charset);
        }
    }

    /**
     * Backup_Database::setTables()
     * 
     * @param string $tables
     * @return
     */
    public function setTables($tables = "*")
    {
        $this->tables = $tables;
        return $this;
    }

    /**
     * Backup_Database::setName()
     * 
     * @param mixed $name
     * @return
     */
    public function setName($name)
    {
        $this->fileName = $name;
        return $this;
    }
    /**
     * Backup_Database::createZip()
     * 
     * @param mixed $boolean
     * @return
     */
    public function createZip($boolean)
    {
        if (is_bool($boolean)) {
            $this->createZip = $boolean;
        }
        return $this;
    }
    /**
     * Backup_Database::downloadFile()
     * 
     * @param mixed $boolean
     * @return
     */
    public function downloadFile($boolean)
    {
        if (is_bool($boolean)) {
            $this->downloadFile = $boolean;
        }
        return $this;
    }
    /**
     * Backup_Database::setZipName()
     * 
     * @param mixed $name
     * @return
     */
    public function setZipName($name)
    {
        $this->zipName = $name;
        return $this;
    }

    /**
     * Backup_Database::setOutputDir()
     * 
     * @param mixed $path
     * @return
     */
    public function setOutputDir($path = null)
    {
        $this->outputDir = $path;
        return $this;
    }

    /**
     * Backup_Database::setHostname()
     * 
     * @param mixed $hostname
     * @return
     */
    public function setHostname($hostname)
    {
        $this->hostname = $hostname;
        return $this;
    }
    /**
     * Backup_Database::setUsername()
     * 
     * @param mixed $username
     * @return
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }
    /**
     * Backup_Database::setPassword()
     * 
     * @param mixed $password
     * @return
     */
    public function setPassword($password)
    {
        $this->password = $password;
        return $this;
    }
    /**
     * Backup_Database::setDatabase()
     * 
     * @param mixed $database
     * @return
     */
    public function setDatabase($database)
    {
        $this->database = $database;
        return $this;
    }
    /**
     * Backup_Database::setCharset()
     * 
     * @param mixed $charset
     * @return
     */
    public function setCharset($charset)
    {
        $this->charset = $charset;
        return $this;
    }

    /**
     * Backup_Database::create_zip()
     * 
     * @param mixed $files
     * @param string $destination
     * @param bool $overwrite
     * @return
     */
    private function create_zip($files = array(), $destination = '', $overwrite = false)
    {
        //if the zip file already exists and overwrite is false, return false
        if (file_exists($destination) && !$overwrite) {
            return false;
        }
        //vars
        $valid_files = array();
        //if files were passed in...
        if (is_array($files)) {
            //cycle through each file
            foreach ($files as $file) {
                //make sure the file exists
                if (file_exists($file)) {
                    $valid_files[] = $file;
                }
            }
        }
        //if we have good files...
        if (count($valid_files)) {
            //create the archive
            $zip = new ZipArchive();
            if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::
                CREATE) !== true) {
                return false;
            }
            //add the files
            foreach ($valid_files as $file) {
                $zip->addFile($file, $file);
            }
            //close the zip -- done!
            $zip->close();

            //check to make sure the file exists
            return file_exists($destination);
        } else {
            return false;
        }
    }
    /**
     * Backup_Database::backup()
     * 
     * @return
     */
    public function backup()
    {
        try {
            $this->initialize();
            /**
             * Tables to export
             */
            $tables = $this->tables;
            if ($tables == '*') {
                $tables = array();
                $result = mysqli_query($this->connection, 'SHOW TABLES');
                while ($row = mysqli_fetch_row($result)) {
                    $tables[] = $row[0];
                }
            } else {
                $tables = is_array($tables) ? $tables : explode(',', $tables);
            }
            $sql = '';
            /**
             * Iterate tables
             */
            foreach ($tables as $table) {
                $result = mysqli_query($this->connection, "SELECT * FROM $table");
                $numFields = mysqli_num_fields($result);

                $result2 = mysqli_query($this->connection, 'SHOW CREATE TABLE `' . $table . "`");
                $row2 = mysqli_fetch_array($result2);
                $sql .= 'DROP TABLE IF EXISTS `' . $table . '`;';
                $sql .= "\n\n" . $row2[1] . ";\n\n";

                for ($i = 0; $i < $numFields; $i++) {
                    while ($row = mysqli_fetch_row($result)) {
                        $sql .= 'INSERT INTO `' . $table . '` VALUES(';
                        for ($j = 0; $j < $numFields; $j++) {
                            $row[$j] = addslashes($row[$j]);
                            $row[$j] = preg_replace('#\n#', '#\\n#', $row[$j]);
                            if (isset($row[$j])) {
                                $sql .= '"' . $row[$j] . '"';
                            } else {
                                $sql .= '""';
                            }

                            if ($j < ($numFields - 1)) {
                                $sql .= ',';
                            }
                        }
                        $sql .= ");\n";
                    }
                }
                $sql .= "\n\n\n";
            }

            $outputDir = $this->outputDir;

            $fileName = $this->fileName ? $this->fileName . ".sql" : $this->database .
                '-db-backup-' . date("Y-m-d") . '.sql';
            $handle = fopen($outputDir . '/' . $fileName, 'w+');
            fwrite($handle, $sql);

            $fp = fopen($outputDir . '/' . $fileName, "r");

            fclose($handle);
            $files_to_zip = array($outputDir . '/' . $fileName);
            if ($this->createZip === true) {
                // Calling save zip function
                $zipName = $this->zipName ? $this->zipName : $this->database . '-db-backup-' .
                    time();
                $this->create_zip($files_to_zip, $outputDir . '/' . $zipName . '.zip');
            }
            if ($this->downloadFile) {
                header('Content-Disposition: attachment; filename="' . basename($outputDir . '/' .
                    $fileName) . '"');
                readfile($outputDir . '/' . $fileName);
            }
            return true;
        }
        catch (exception $e) {
            var_dump($e->getMessage());
            return false;
        }
    }
}
