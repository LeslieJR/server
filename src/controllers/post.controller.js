const models = require('../models')
const upload = (req, res) =>{
    res.json('IMAGE UPLOAD')
}

const recentUploads = (req, res) =>{
    res.json('RECENT UPLOADS')
}

const stats = (req, res) =>{
    res.json('GET STATS')
}


const mostPopular = (req, res) =>{
    res.json('MOST POPULARS')
}

const like = (req, res) =>{
    res.json('GIVE A LIKE')
}

const details =  (req, res) =>{
    res.json('GET POST DETAILS')
}

const remove = (req,res) =>{
    res.json('DELETE POST')
}

module.exports={
    upload,
    recentUploads,
    stats,
    mostPopular,
    like,
    details,
    remove
}