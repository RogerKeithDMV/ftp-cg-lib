const basicftp = require("basic-ftp") 
const { Readable,Transform} = require("stream");
const {constants, helpers, log} = require('utils-nxg-cg');
const {objectFTPReq,objectFTPOpt} = require('./objects');
const Client=require("ftp");

module.exports.ftp = async (msg, cfg, test = false) => {
  const client = new basicftp.Client();
  const c=new Client();
  client.ftp.verbose = true;
  let resultFTP="";
  let stream = null;

  return new Promise(async (resolve, reject) => {
  try {
    const {data} = msg;
  
    let properties = {...objectFTPReq};
    let extraProp = {...objectFTPOpt};

    if (!test && !data) {throw new Error(`${constants.ERROR_PROPERTY} data`);}
      const valid = await helpers.validProperties(properties, data, cfg);

      if (valid) {
        await helpers.validProperties(extraProp, data, cfg, true);
        properties = {...properties, ...extraProp};

        try{
         await client.access({
            host: properties.host,
            port: properties.port,
            user: properties.username,
            password: properties.password,
            secure: properties.secure
          })

          let encoding = 'base64';
          if (properties.encoding) encoding = properties.encoding;
          let flag = properties.flag.toUpperCase();

          if(flag=="GETLISTFILES"){
            if(properties.path){
              resultFTP = await client.list(properties.path);
            }
            else{
              resultFTP = await client.list();
            }
            resolve(resultFTP);
          }
          else if(flag=="GETFILE"){
            let fileTextRespose="";

            let  myTransform = await new Transform({
                transform(chunk, encoding, callback) {
                  fileTextRespose = fileTextRespose + chunk.toString();
                  callback();
                }
              });

            await client.downloadTo(myTransform, properties.file);
            const myBuffer = Buffer.from(fileTextRespose, "utf-8");
            const myFileEncoded = myBuffer.toString(encoding);
            resolve({content:myFileEncoded});
          }
          else if(flag=="SAVEFILE"){
            stream = Readable.from(Buffer.from(properties.content, encoding));
            await client.uploadFrom(stream, properties.file);
            resolve({response:"File "+properties.file+" was created successfully."})
          }
          else if(flag=="CREATEDIRECTORY"){
            await client.ensureDir(properties.path);
            resolve({response:"Directory "+properties.path+" was created successfully."});
          }
          else if(flag=="DELETEFILE"){
            await client.remove(properties.file);
            resolve({response:"File "+properties.file+" was deleted successfully."});
          }
          else if(flag=="DELETEDIRECTORY"){
            try{await client.removeDir(properties.path);}
            catch(e){}
            finally{
              c.connect({ host: properties.host,
                port: properties.port,
                user: properties.username,
                password: properties.password});

              c.on('ready', function() {
                c.rmdir(properties.path, { recursive: true }, function () {});
                c.end();
              });

            resolve({response:"Directory "+properties.path+" was deleted successfully."})
            }
          }
          else if(flag=="RENAMEFILE"){
            await client.rename(properties.file, properties.newName);
            resolve({response:"File "+properties.file+" was successfully renamed to "+properties.newName+"."});
          }
          else if(flag=="DOWNLOADDIR"){
            await client.downloadToDir(properties.localPath, properties.path);
            resolve({response:"Remote directory "+properties.path+" was successfully downloaded to "+properties.localPath+"."});
          }
          else if(flag=="UPLOADDIR"){
            try{
              await client.uploadFromDir(properties.localPath, properties.path);
              resolve({response:"Local directory "+properties.localPath+" was successfully uploaded to "+properties.path+"."});
            }
            catch(e){
              log.info("Error "+e);
              reject({error:e});
              c.end();
            }
          }
          else{
            reject({error:'Invalid value for flag parameter.'});
          }
        }

        catch(err){
          reject({error:err.toString()});
        }
      }
    }

    catch(err){
      reject({error:err.toString()});
    }

    finally{
      client.close();
    }
  });
};