let express = require('express');
let router = express.Router();
let UsersModel = require('../models/usersModel');
//Librarian Registration
router.post('/', async (req, res) => {
    const {
        username,
        password,
        name,
        email
    } = req.body;

    try {
        const result = await UsersModel.registerUser(
            username,
            password,
            name,
            email
        );

        if (result) {
            res.status(201).json({ message: "Librarian registered successfully", data: result });
        } else {
            res.status(500).json({ error: "Librarian registration failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;