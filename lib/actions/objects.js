/**
 * Object who contains the required properties of the sftp component.
 */
 const objectFTPReq = {
    host:null,
    port:null,
    username:null,
    password:null,
    path:null,
    flag:null
};

/**
 * Object who contains the optionals properties of the sftp component.
 */

const objectFTPOpt = {
    file:null,
    jsonFile:null
};

module.exports = {
    objectFTPReq,
    objectFTPOpt
}