const basicftp = require('basic-ftp')
const {Readable, Transform} = require('stream');
const {constants, helpers} = require('utils-nxg-cg');
const {objectFTPReq, objectFTPOpt} = require('./objects');
const Client = require('ftp');

const process = async (msg, cfg, test = false) => {
    const client = new basicftp.Client();
    const c = new Client();
    client.ftp.verbose = true;
    let resultFTP = "";
    let stream = null;

    try {
        const {data} = msg;

        let properties = {...objectFTPReq};
        let extraProp = {...objectFTPOpt};

        if (!test && !data) {
            throw Error(`${constants.ERROR_PROPERTY} data`);
        }
        const valid = await helpers.validProperties(properties, data, cfg);

        if (valid) {
            await helpers.validProperties(extraProp, data, cfg, true);
            properties = {...properties, ...extraProp};

            await client.access({
                host: properties.host,
                port: properties.port,
                user: properties.username,
                password: properties.password

            });

            let encoding = 'base64';
            if (properties.encoding) encoding = properties.encoding;
            let flag = properties.flag.toUpperCase();

            if (flag === "GETLISTFILES") {
                if (properties.path) {
                    resultFTP = await client.list(properties.path);
                } else {
                    resultFTP = await client.list();                    
                }
                if(!helpers.isObjectValid(resultFTP)){
                    throw Error(constants.ERROR_JSON_FORMAT);
                }
                return {"response":resultFTP, flag: properties.flag};

            } else if (flag === "GETFILE") {
                let fileTextRespose = "";
                let myTransform = await new Transform({
                    transform(chunk, encoding, callback) {
                        fileTextRespose = fileTextRespose + chunk.toString();
                        callback();
                    }
                });
                await client.downloadTo(myTransform, properties.file);
                const myBuffer = Buffer.from(fileTextRespose, "utf-8");
                return {"response":myBuffer.toString(encoding), flag: properties.flag};
            } else if (flag === "SAVEFILE") {
                stream = Readable.from(Buffer.from(properties.content, encoding));
                await client.uploadFrom(stream, properties.file);
                return {"response":`File ${properties.file} was created successfully.`, flag: properties.flag};
            } else if (flag === "CREATEDIRECTORY") {
                await client.ensureDir(properties.path);
                return {"response:":`Directory ${properties.path} was created successfully.`, flag: properties.flag};
            } else if (flag === "DELETEFILE") {
                await client.remove(properties.file);
                return {"response":`File ${properties.file} was deleted successfully.`, flag: properties.flag};
            } else if (flag === "DELETEDIRECTORY") {
                try {
                    await client.removeDir(properties.path);
                } catch (e) {
                    throw Error(e);
                } finally {
                    c.connect({
                        host: properties.host,
                        port: properties.port,
                        user: properties.username,
                        password: properties.password
                    });
                    c.on('ready', function () {
                        c.rmdir(properties.path, {recursive: true}, function () {
                        });
                        c.end();
                    });
                }
                return {"response":`Directory ${properties.path} was deleted successfully.`, flag: properties.flag};
            } else if (flag === "RENAMEFILE") {
                await client.rename(properties.file, properties.newName);
                return {"response":`File ${properties.file} was successfully renamed to ${properties.newName}.`, flag: properties.flag};
            } else if (flag === "DOWNLOADDIR") {
                await client.downloadToDir(properties.localPath, properties.path);
                return {"response":`Remote directory ${properties.path} was successfully downloaded to ${properties.localPath}.`, flag: properties.flag};
            } else if (flag === "UPLOADDIR") {
                try {
                    await client.uploadFromDir(properties.localPath, properties.path);
                    return {"response":`Local directory ${properties.localPath} was successfully uploaded to ${properties.path}.`, flag: properties.flag};
                } catch (e) {
                    c.end();
                    throw Error(e);
                }
            } else {
                throw Error('Invalid value for flag parameter.');
            }
        }
    } catch (err) {
        throw Error(err.toString());
    } finally {
        client.close();
    }
};

/**
 * Method for valid properties
 * Custom validations for each process
 * @param properties
 * @returns {Promise<boolean>}
 */
 const validProperties = async (properties) => {
    switch (properties.flag) {
        case 'GETLISTFILES':
        case 'GETFILE':
            if (!properties.fileName)
                throw Error(`${constants.ERROR_PROPERTY} fileName`);
            break;
        case 'SAVEFILE':
            if (!properties.content || !properties.file)
                throw Error(`${constants.ERROR_PROPERTY} content and file`);
            break;
        case 'CREATEDIRECTORY':
            if (!properties.path)
                throw Error(`${constants.ERROR_PROPERTY} path`);
            break;
        case 'DELETEFILE':
            if (!properties.file)
                throw Error(`${constants.ERROR_PROPERTY} file`);
            break;
        case 'DELETEDIRECTORY':
            if (!properties.file)
                throw Error(`${constants.ERROR_PROPERTY} path`);
            break;
        case 'RENAMEFILE':
            if (!properties.path || !properties.newName)
                throw Error(`${constants.ERROR_PROPERTY} path and newName`);
            break;
        case 'DOWNLOADDIR':
            if (!properties.localPath || !properties.path)
                throw Error(`${constants.ERROR_PROPERTY} localPath and path`);
            break;
        case 'UPLOADDIR':
            if (!properties.localPath || !properties.path)
                throw Error(`${constants.ERROR_PROPERTY} localPath and path`);
            break;
    }
    return true;
};

module.exports = {
    ftp:process
};
