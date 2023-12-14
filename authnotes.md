# Set up database connection
create a file in db.js to handle the database connection
# Create authentication and interceptor middleware
###authmidleware.js
```js
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')


function autheniticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Unauthorized});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({error: 'Invalid token'});
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
```
```js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')

function interceptor(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (!err) {
                req.user = user;
            }
            next();
        });
    } else {
        next();
    }
}
module.exports = interceptor;
```