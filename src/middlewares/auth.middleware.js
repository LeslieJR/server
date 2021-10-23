const jwt = require('jsonwebtoken');
const config = require('../config')
const { unlink } = require("fs/promises");

const isUser = async (req, res, next) =>{
    console.log('token:', req.headers.token);
    const token = req.headers.token;
    if(!token){
        await unlink(req.file.path)
        return res.json({err: 'token does not exist'})
    }

    const data = jwt.verify(token, config.jwt.secret)
    console.log(data);

    if(!data){
        await unlink(req.file.path)
        return res.json({err: 'token does not exist'})
    }
    next();
};

module.exports = {
    isUser
}