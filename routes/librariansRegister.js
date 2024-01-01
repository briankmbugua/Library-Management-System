let express = require('express');
let router = express.Router();
let UsersModel = require('../models/usersModel');
//Librarian Registration
router.post('/', async (req, res) => {
    const {
        username,
        password,
        email,
        role,
        library_name,
        library_address,
        phone_number,
        library_email
    } = req.body;
    console.log(req.body);
});

module.exports = router;