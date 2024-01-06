const express = require('express');
const router = express.Router();
const UsersModel = require('../../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config'); // Make sure to replace this with your actual secret key

// Librarian Login
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Fetch librarian details from the database
        const librarian = await UsersModel.getUserByUsername(username);

        if (!librarian) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, librarian.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate and send JWT token for authentication
        const token = jwt.sign({ id: librarian.user_id, role: librarian.role }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
