const bcrypt = require('bcryptjs');

// Registration middleware (modified)
async function registrationMiddleware(req, res, next) {
    const { username, password, name, email, role, library_name, library_address } = req.body;

    try {
        // Validate user input and library information

        // Create library if necessary
        const libraryInsertResult = await db.query('INSERT INTO libraries (name, address) VALUES (?, ?)', [library_name, library_address]);

        const library_id = libraryInsertResult.insertId;

        // Hash password and insert user
        const hashedPassword = await bcrypt.hash(password, 10);

        const userInsertResult = await db.query('INSERT INTO users (username, password, name, email, role, library_id) VALUES (?, ?, ?, ?, ?, ?)', [username, hashedPassword, name, email, role, library_id]);

        // Handle success
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
}

module.exports = registrationMiddleware;
