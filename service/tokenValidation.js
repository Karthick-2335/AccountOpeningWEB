const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
        token = token.slice(7);
        verify(token, 'karthick2335', (err, decode) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Invalid Token'
                });
            }
            else {
                next();
            }
        });
    }
    else {
        res.json({
            success: false,
            message: 'Access denied! Unauthorized token'
        });
    }
}

module.exports = {
    validateToken: validateToken
}