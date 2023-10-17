const mongoose = require('mongoose');

const dbConnection = new Promise((resolve,reject) => {
    resolve(mongoose.connect(process.env.DbConnection).catch(error => console.log(error)));
    reject("Connection failed");
    
});

module.exports = dbConnection;