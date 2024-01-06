let express = require('express');
let router = express.Router();
let UsersModel = require('../../models/usersModel');
//Librarian Registration
router.post('/', async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            role,
            library_name,
            library_address,
            library_phone_number,
            library_email
        } = req.body;

        // Register librarian and library
        const result = await UsersModel.registerLibrarianAndLibrary(username, password, email, role, library_name, library_address, library_phone_number, library_email);

        if (result) {
            res.status(201).json({ message: 'Librarian and library registered successfully', data: result });
        } else {
            res.status(500).json({ error: 'Librarian and library registration failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;