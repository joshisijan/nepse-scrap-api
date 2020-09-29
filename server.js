const express = require('express')
const path = require('path')
//require('events').EventEmitter.defaultMaxListeners = Infinity;
const app = express()

//port for server
const PORT = process.env.PORT || 5000

//Initializing Middlewares
//for json
app.use(express.json());

//Use Router
app.use('/api', require('./routes/api/nepse'))


//listning to port
app.listen(PORT, () => {
  console.log(`Server started at post: ${PORT}`);
})

