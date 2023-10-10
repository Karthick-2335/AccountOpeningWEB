const express = require('express');
require('dotenv');
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

mongoose.connect(process.env.DbConnection).
  catch(error => console.log(error));