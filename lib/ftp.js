const ftp = require("basic-ftp") 
const { Readable,Transform} = require("stream");
const {constants, helpers, log} = require('utils-nxg-cg');
const {objectFTPReq,objectFTPOpt} = require('./objects');

module.exports.ftp = async (msg, cfg, test = false) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  let resultFTP="";
  let stream = null;

  return new Promise(async (resolve, reject) => {
  try {
    log.info('Inside ftp lib');
    log.debug('Msg=', JSON.stringify(msg));
    log.debug('Config=', JSON.stringify(cfg));
  
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

          let flag = properties.flag.toUpperCase();

          if(flag=="GETLISTFILES"){
            resultFTP = await client.list();
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
            resolve({content:fileTextRespose});
          }
          else if(flag=="SAVEFILE"){
            stream = Readable.from(Buffer.from(properties.content));
            await client.uploadFrom(stream, properties.file);
            resolve({response:"File "+properties.file+" was created successfully."})
          }
          else if(flag=="CREATEDIRECTORY"){
            await client.ensureDir(properties.path)
            resolve({response:"Directory "+properties.path+" was created successfully."})
          }
          else if(flag=="DELETEFILE"){
            await client.remove(properties.file)
            resolve({response:"File "+properties.file+" was deleted successfully."})
          }
          else if(flag=="DELETEDIRECTORY"){
            await client.removeDir(properties.path)
            resolve({response:"Directory "+properties.path+" was deleted successfully."})
          }
          else{
            resolve({error:'Invalid value for flag parameter.'});
          }
        }

        catch(err){
          reject({error:err});
        }
      }
    }

    catch(e){
      reject({error:err});
    }

    finally{
      client.close();
    }
  });
};