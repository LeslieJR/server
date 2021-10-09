const config = {
    imageFolder: './src/static',
    database:{
        uri:'mongodb://localhost/social'
    },
    jwt:{
        secret:'3245454tkgfgkffe4r32'
    },
    server:{
        hostname: 'http://localhost:'+this.port,
        port: 4000
    }
}
module.exports = config