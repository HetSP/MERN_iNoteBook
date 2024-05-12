const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

//This line is required to pass json data in request body of API endpint
app.use(express.json())

//Middle wares for the API endpoinds
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})