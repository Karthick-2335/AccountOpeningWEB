const express = require('express');
require('dotenv/config');
const app = express();
const cors = require('cors')
const { validateToken } = require('./service/tokenValidation');
const registrationRouter = require('./routers/registrationRouter');
const profileRouter = require('./routers/profileRouter');
const productRouter = require('./routers/productRouter');
const loginRouter = require('./routers/loginRouter');
const commonRouter = require('./routers/commonRouter');
const bankRouter = require('./routers/bankRouter');
const dbConnection = require('./dbConnection/connection');

app.use(cors());

app.use(express.json());

app.use('/api',loginRouter);
app.use('/api/registration',validateToken,registrationRouter);
app.use('/api/profile',validateToken,profileRouter);
app.use('/api/bank',validateToken,bankRouter);
app.use('/api/product',validateToken,productRouter);
app.use('/api/common',commonRouter);

dbConnection.then(() => app.listen(4300)).
then(() => console.log('Connected to database and listening to localhost 4300')).catch(error => console.log(error));