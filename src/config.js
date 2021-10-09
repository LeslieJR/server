const values = require('./values.js')
const port = 4000
const config = {
    imageFolder: './src/static',
    database:{
        uri:'mongodb://localhost/social'
    },
    jwt:{
        secret:'3245454tkgfgkffe4r32'
    },
    server:{
        hostname: 'http://localhost:'+port,
        port
    },
    multer:{
        [values.imageFolder](cb){
            cb(null, './src/static/'+values.imageFolder)
        },
        [values.avatarFolder](cb){
            cb(null, './src/static/'+values.avatarFolder)
        }
    }
}
module.exports = config
