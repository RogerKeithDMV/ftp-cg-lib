/**
 * Object who contains the required properties of the sftp component.
 */
 const objectFTPReq = {
    host:null,
    port:null,
    username:null,
    password:null,
    secure:null,
    flag:null
};

/**
 * Object who contains the optionals properties of the sftp component.
 */

const objectFTPOpt = {
    path:null,
    file:null,
    content:null,
    encoding:null,
    newName:null,
    localPath:null
};

module.exports = {
    objectFTPReq,
    objectFTPOpt
}