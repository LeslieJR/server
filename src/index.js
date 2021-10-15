require('dotenv').config();
require('./mongo');
const server = require('./server');

server.listen(process.env.PORT || server.get('port'), ()=>{
    console.log(`Server running on port: ${server.get('port')}`)
})

