const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')
const config = require('./config')
const server = express();

//Settings
server.set('port',config.server.port )

//Middlewares
server.use(express.urlencoded({ extended: false }));
server.use(express.json()); 
server.use(cors());
server.use(morgan('dev'))

//Routes
server.use('/api/user', routes.user)
server.use('/api/comment', routes.comment)
server.use('/api/post', routes.post)

server.get('/', (req, res)=>{
    return res.json('Built done')
})

//Static
server.use(express.static(path.join(__dirname, 'static')))

module.exports = server;