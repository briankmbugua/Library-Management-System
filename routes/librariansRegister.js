let express = require('express');
let router = express.Router();
let UsersModel = require('../models/usersModel');
//Librarian Registration
router.post('/', async (req, res, next) => {
    const {
        username,
        password,
        name,
        email,
        libraryName,
        libraryAddress,
        libraryPhoneNumber,
        libraryEmail,
    } = req.body;

    try {
        const result = await UsersModel.registerLibrarianAndLibrary(
            username,
            password,
            name,
            email,
            libraryName,
            libraryAddress,
            libraryPhoneNumber,
            libraryEmail
        );

        if (result) {
            res.status(201).json({ message: "Librarian and Library registered successfully", data: result });
        } else {
            res.status(500).json({ error: "Librarian and Library registration failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;