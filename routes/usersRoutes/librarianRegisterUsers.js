const express = require('express');
const router = express.Router();
const UsersModel = require('../../models/usersModel');
const authmiddleware = require('../../middlewares/authmiddleware');


router.post('/', authmiddleware, async (req, res) => {
    try {
        // Ensure only librarians can register users
        if (req.user.role !== 'librarian') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const { username,  email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await UsersModel.getMemberByUsernameOrEmail(username, email);
        if (existingUser) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }
        console.log(`username in librarianRegisterUsers ${username}`);
        console.log(`email in librarianRegisterUsers ${email}`);
        console.log(`library_id in librarianRegisterUsers ${req.user.library.id}`);

        const registeredUser = await UsersModel.registerLibraryMember(username,  email, req.user.library.id);

        if (registeredUser) {
            res.status(201).json({ message: 'User registered successfully', user: registeredUser });
        } else {
            res.status(500).json({ error: 'Could not register user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
