[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# ftp-cg-lib

https://github.com/CloudGenUser/ftp-cg-lib

## _1. Introduction_

This code has the objective to establish connection with a ftp server and depending of the flag it will make an different action.

Possible flags and their actions:

- `CREATEDIRECTORY` - Create a directory in a specific path.
- `DELETEDIRECTORY` - Delete the directory and their content.
- `DELETEFILE` - Delete a file in a specific path.
- `DOWNLOADDIR` - Download the directory inside a ftp in a local machine.
- `GETFILE` - Get the content of a file, a specific encoding can be requested.
- `GETLISTFILES` - Get the list of files and directories inside a specific path.
- `RENAMEFILE` - Rename a file inside a path.
- `SAVEFILE` - Create a file inside the ftp server, the content of the file is a string that can have an specific encoding, you have to specify the encoding.
- `UPLOADDIR` - Take a directory for a local machine and save the content inside a ftp server.

Any other flag will be consider as an invalid value and will return a message error.

As components are used in the NXGP flows regardless that the library should be added on component code, when the flow is running, an exchange and some queues are created using the ID flow (assigned from NXGP).

## _2.	Library usage

The library can be installed from npm page with the next:

**`npm install ftp-cg-lib`**, **`npm i ftp-cg-lib`** or **`yarn install ftp-cg-lib`**


### _2.1. CREATEDIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
path: The full path where you want to create the directory, included the name of the directory. This parameter also can be used to create more than one directory un one execution, for example you can create directoryNew/otherDirectoryNew and if none of these directories exist the library will create both.
secure: Contains a boolean value (true or false).
Optional:

- **Description:** This request will create a new directory inside the ftp server. Is possible to create a complete structure of directory in one request.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.
- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"CREATEDIRECTORY",
   "secure":"false",
   "path":"NewFolder/OtherFolder"
}
```

> `Resultant sample`: "Directory NewFolder/OtherFolder was created successfully."

>In case of some error like access denied you will have this message: "FTPError: 550 ........"


### _2.2 DELETEDIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can stablish connection with the ftp.
path: The full path where you want to delete the directory.
secure: Contains a boolean value (true or false).
Optionals:

- **Description:** This request will delete a directory with all the documents inside it.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"DELETEDIRECTORY",
   "secure":"false",
   "path":"files/newFolder"
}
```

>`Resultant sample`: "Directory files/newFolder was deleted successfully."

### _2.3. DELETEFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can stablish connection with the ftp.
file: The name of the file that will be deleted with the full path where the file is.
secure: Contains a boolean value (true or false).
Optionals:

- **Description:** This request will delete a specific file in the ftp server.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"DELETEFILE",
   "secure":"false",
   "file":"files/newFileFTP.txt"
}
```
>`Resultant sample`: "File files/newFileFTP.txt was deleted successfully."

>In case the file does not exist you will have this message: "FTPError: 550 ........"
    

### _2.4. DOWNLOADDIR_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
path: The path of the directory that we want to download inside the ftp.
localPath: The path of the directory with the name that we want to create in our local machine.
secure: Contains a boolean value (true or false).
Optional:

- **Description:** This request will get a directory of the ftp and will save all the content inside our local machine.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.

- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"DOWNLOADDIR",
   "secure":"false",
   "path":"dowloadFolder",
   "localPath":"C:/Users/Documents/download_here"
}
```

> `Resultant sample`:"Remote directory / was successfully downloaded to C:/Users/Documents/download_here_directory."

> If the path of ftp server that you are specifying does not exist you will have this message: "FTPError: 550 ........"


### _2.5. GETFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
path: The path where you will be working on.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
file: The name of the file that we want to get with the full path where the file is.
secure: Contains a boolean value (true or false).
Optional:
encoding: The encoding that we want to use to get the file, if this parameter is not sended base64 will be taken as default.

- **Description:** This request will get the content of a file in a string.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.

- **Sample of a request without encoding (the default content will be get in base64):**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"GETFILE",
   "secure":"false",
   "file":"files/incoming/JSONSource.json"
}
```


`Resultant sample`:

```plaintext
"ew0KICAgICJGaXJzdE5hbWUiOiJFbW1hbnVlbCIsDQogICAgIlNlY29uZE5hbWUiOiJBcnJlb2xhIiwNCiAgICAiTGFzdE5hbWUiOiJKdWFyZXoiLA0KICAgICJBZ2UiOiIyNiB5ZWFycyIsDQogICAgIk9yaWdpbiI6Ik1leGljbyINCiAgfQ=="
```

- **Sample of a request with encoding:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"GETFILE",
   "secure":"false",
   "file":"files/incoming/JSONSource.json",
   "encoding":"utf8"
}
```

`Resultant sample:`

```plantext
"{\r\n    \"FirstName\":\"John\",\r\n    \"SecondName\":\"Anderson\",\r\n    \"LastName\":\"Smith\",\r\n    \"Age\":\"30 years\",\r\n    \"Origin\":\"USA\"\r\n  }"
```

> If you try to get a file that does no exist you will have this message: "FTPError: 550 ........"


### _2.6. GETLISTFILES_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
path: The path where we want to to get the list of files and directories.
secure: Contains a boolean value (true or false).
Optionals:

- **Description:** This request will get a string in json format with all the files and directories inside the path specified.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.

- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"GETLISTFILES",
   "secure":"false",
   "path":""
}
```

`Resultant sample:`

```json
[
   {
      "name":"incoming",
      "type":2,
      "size":4096,
      "rawModifiedAt":"Sep 28 15:29",
      "permissions":{
         "user":7,
         "group":5,
         "world":5
      },
      "hardLinkCount":2,
      "group":"1004",
      "user":"1004"
   },
   {
      "name":"outgoing",
      "type":2,
      "size":4096,
      "rawModifiedAt":"Sep 27 23:05",
      "permissions":{
         "user":7,
         "group":5,
         "world":5
      },
      "hardLinkCount":2,
      "group":"1004",
      "user":"1004"
   }
]
```

> If you specify a path that does not exist you will have this message: []


### _2.7. RENAMEFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
file: The old name of the file we want to rename.
newName: The new name of the file we want.
secure: Contains a boolean value (true or false).
Optionals:


- **Description:** This request will rename a file inside the ftp.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.

- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"RENAMEFILE",
   "secure":"false",
   "file":"files/newFileFTP.txt",
   "newName":"files/otherName.txt"
}
```

`Resultant sample:`:"File files/testOIH/newFileFTP.txt was successfully renamed to files/testOIH/otherName.txt."

> If the file you wanto to rename does not exist you will have this message: "FTPError: 550 ........"


### _2.8. SAVEFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
content: The content of the file, we want to save.
file: The name and extension we want to use for the new file and the full path where we want to create the file.
secure: Contains a boolean value (true or false).
Optionals:
encoding: The encoding that we want to use to get the file, if this parameter is not sended base64 will be taken as default.

- **Description:** This request will save a file inside the ftp, the string with the content could be in severals formats, the parameter encoding sloud be specified in case of a content different to base64.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.

- **Sample of a request no encoding specified so the content should be base64:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"SAVEFILE",
   "secure":"false",
   "file":"files/newFileFTP.txt",
   "content":"VGhpcyBpcyB0aGUgY29udGVudCBvZiBteSBmaWxlLg=="
}
```

`Resultant sample:` "File files/newFileFTP.txt was created successfully."

- **Sample of a request with encoding:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"SAVEFILE",
   "secure":"false",
   "file":"files/testOIH/newFileFTP.txt",
   "content":"Hello World.",
   "encoding":"uft8"
}
```

`Resultant sample:`"File files/newFileFTP.txt was created successfully."


- If the file you want to create already existe, the current file will be rename adding the date in the name and the new file will be create with the name in the request.

     * "FTPError: 530 ........"

- If we have an error we will have this message:
    * "FTPError: 553 ........"


### _2.9. UPLOADIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADDIR, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADDIR. The string is not case sensitive.
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftp server.,
username: The username that have grants to connect with the ftp server.
password: This parameter contains the password that can establish connection with the ftp.
localPath: The path of the directory source we want to upload.
path: The path were the directory will be uploaded and the name of the new directory.
secure: Contains a boolean value (true or false).
Optional:


- **Description:** This request will send the content of a local directory to the ftp server.
Once the request is sended, the answer will be a string in a JSon format with the result of the execution.

- **Sample of a request:**
```json
{
   "host":"localhost",
   "port":21,
   "username":"user",
   "password":"password",
   "flag":"UPLOADDIR",
   "secure":"false",
   "path":"uploadFolder",
   "localPath":"C:\\Users\\Documents\\upload_this"
}
```

`Resultant sample:` "Local directory C:/Users/DMV/Documents/ftpfiles/upload_this_directory was successfully uploaded to files/testOIH/newFolder/."

>- If the local path does not exist you will have this message: "Error: ENOENT: no such file or directory, scandir "C:\\Users\\DMV\\Documents\\ftpfiles\\upload_this_directoryx"
