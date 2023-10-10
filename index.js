const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const sipRouter = require('./api/product/sipRouter');
const loginRouter = require('./api/login/loginRouter');

app.use(cors());

app.use(express.json());

app.use('/api/product',sipRouter);
app.use('/api',loginRouter);

app.listen(4300,() => {
    console.log('server created running n 4300');
})

mongoose.connect('mongodb://localhost:27017/testDb').
  catch(error => console.log(error));