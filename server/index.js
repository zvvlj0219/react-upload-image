const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI, 
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(()=>console.log('connected mongodb atlas'))
.catch(error=>console.log(error))

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongo DB success');
});

const userRoute = require('./routes/usersRoute');
app.use('/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})