const values = require('./values.js')

const config = {
   
    imageFolder: './src/statics',
    database:{
        //uri:'mongodb://localhost/social'
        uri:`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustersocial.a2zwn.mongodb.net/Social-App?retryWrites=true&w=majority`
    },
    jwt:{
        secret:'3245454tkgfgkffe4r32'
    },
    server:{
        port: process.env.PORT ?? 4000,
        //hostname: 'http://localhost:'+4000
        
        hostname: 'https://social-app-leslie.herokuapp.com',
       
    },
    multer:{
        [values.imageFolder](cb){
            cb(null, './src/statics/'+values.imageFolder)
        },
        [values.avatarFolder](cb){
            cb(null, './src/statics/'+values.avatarFolder)
        }
    }
}
module.exports = config
