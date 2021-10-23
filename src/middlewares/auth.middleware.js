const jwt = require('jsonwebtoken');
const config = require('../config')
//const { unlink } = require("fs/promises");

const isTokenValid =  (req, res, next) =>{
    console.log('[is token valid] token:', req.headers.token);
    const token = req.headers.token;
    if(!token){
        //await unlink(req.file.path)
        return res.json({err: 'token does not exist'})
    }

    const data = jwt.verify(token, config.jwt.secret)
    console.log("[is token valid] data: ",data);

    if(!data){
        //await unlink(req.file.path)
        return res.json({err: 'token does not exist'})
    }
    next();
};

/* const isOwner = (req, res, next) => {
    console.log(req.headers.token);

} */

module.exports = {
    isTokenValid
}