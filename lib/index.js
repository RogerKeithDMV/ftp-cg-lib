const {ftp} = require('./ftp');
const objects = require('./objects');

module.exports = {
    ftp,
    ...objects
};