const express = require('express');
require('dotenv/config');
const app = express();
const cors = require('cors')
const productRouter = require('./routers/productRouter');
const loginRouter = require('./routers/loginRouter');
const commonRouter = require('./routers/commonRouter');
const dbConnection = require('./dbConnection/connection');

app.use(cors());

app.use(express.json());

app.use('/api/product',productRouter);
app.use('/api',loginRouter);
app.use('/api/common',commonRouter);

dbConnection.then(() => app.listen(4300)).
then(() => console.log('Connected to database and listening to localhost 4300')).catch(error => console.log(error));