const models = require('../models')

const createComment = (req,res) =>{
    res.json('COMMENT CREATED')
}

const latestComments = (req, res) =>{
    res.json('GET LATEST COMMENTS')
}


module.exports={
    createComment,
    latestComments
}