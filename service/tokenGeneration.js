const { sign } = require('jsonwebtoken');

const webToken = sign({ result: 'token' }, 'karthick2335', {
    expiresIn: '1h'
});

module.exports = webToken;