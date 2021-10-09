const multer = require('multer');
const config = require('../config')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
         config.multer[file.fieldname](cb)
    },
    filename:function(req, file, cb){
        const uniqueSuffix =Date.now() + '.jpeg';
        const error = null;
        cb(error, file.filename + uniqueSuffix)
    }
})
const uploads = multer({
    //dest: './src/static/'
    storage: storage,
    limits:{
        fileSize: 1000000
    }
})

module.exports = uploads;