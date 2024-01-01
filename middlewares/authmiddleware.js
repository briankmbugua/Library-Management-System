const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(`from authmiddleware${authHeader}`);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`from authmiddleware${token}`);
    
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = jwt.verify(token, secretKey);

        // Query database to validate user's existence and role
        const queryResults = await db.query('SELECT * FROM users WHERE id = ? AND role = ?', [user.id, user.role]);

        if (queryResults.length === 0) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        req.user = user;
        next();
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = authMiddleware;
