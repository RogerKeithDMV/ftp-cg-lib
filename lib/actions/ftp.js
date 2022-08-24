let Client = require('ftp');
const {constants, helpers, log} = require('utils-nxg-cg');
const {objectFTPReq,objectFTPOpt} = require('./objects');

module.exports.ftp = async (msg, cfg, test = false) => {
    let c = new Client();
    let resultFTP="";

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

          let c = new Client();
          let listFiles = "";
          try{
            c.connect({ host: properties.host, port: properties.port, user: properties.username, password: properties.password});

            if(properties.file){
              //regresa archivo
              resultFTP = await c.on('ready', function() {
                c.get(properties.file, function(err, stream) {
                  let content = '';
                  stream.on('data', function(chunk) {
                    content += chunk.toString();
                  });

                  stream.on('end', function() {
                    return resolve(content);
                  });
                })
              });
            }

            else{
              //regresa lista
              resultFTP = await c.on('ready', function() {
                c.list(function(err, list) {
                  if (err){ return resolve(err)}
                  resolve(list);
                });
              });
            }
          
            log.info(resultFTP);
            resolve(resultFTP);
          }
          catch(err){
            return reject(err);
          }
      
        ///////////////////////////////////////////////

          log.info(resultFTP);
          resolve(resultFTP);
        }
      }
      catch(e){
        return reject(err);
      }
      finally{
        c.end();
      }
    });
  };