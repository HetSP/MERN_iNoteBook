const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
//This line is required to pass json data in request body of API endpint
app.use(express.json())

//Middle wares for the API endpoinds
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})