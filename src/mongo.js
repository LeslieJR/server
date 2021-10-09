const mongoose = require('mongoose');
const config = require('./config')

mongoose.connect(config.database.uri)
  .then(()=>{
      console.log('Connection successful')
  })
  .catch((err)=>{
      console.log(err)
  })

