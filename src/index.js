require('./mongo');
const server = require('./server');

server.listen(server.get('port'), ()=>{
    console.log(`Server running on port: ${server.get('port')}`)
})

