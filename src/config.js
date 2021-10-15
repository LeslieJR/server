const values = require('./values.js')
const port = process.env.PORT ?? 4000
const config = {
   
    imageFolder: './src/static',
    database:{
        uri:`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustersocial.a2zwn.mongodb.net/Social-App?retryWrites=true&w=majority`
    },
    jwt:{
        secret:'3245454tkgfgkffe4r32'
    },
    server:{
        hostname: 'https://social-app-leslie.herokuapp.com',
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
