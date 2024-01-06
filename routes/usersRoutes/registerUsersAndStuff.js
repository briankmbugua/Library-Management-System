const express = require('express');
const router = express.Router();
const UsersModel = require('../models/usersModel');
const LibrariesModel = require('../models/librariesModel');

// Librarian registers a user or staff to their library
router.post('/register', async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            role, // 'user' or 'staff'
        } = req.body;

        const librarianId = req.user.id; // Assuming authentication middleware sets req.user

        // Retrieve library_id associated with the librarian
        const librarian = await UsersModel.getUserById(librarianId);
        const libraryId = librarian.library_id;

        // Register the user or staff to the library
        const result = await UsersModel.registerUser(username, password, email, role, libraryId);

        if (result) {
            res.status(201).json({ message: `${role} registered successfully`, data: result });
        } else {
            res.status(500).json({ error: `${role} registration failed` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
