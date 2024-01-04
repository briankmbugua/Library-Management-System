let express = require('express');
let router = express.Router();
let UsersModel = require('../models/usersModel');
let librariesModel = require('../models/librariesModel');
//Librarian Registration
router.post('/', async (req, res) => {
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
    console.log(req.body);
    UsersModel.registerUser(username,password,email, role,library_name, library_address, library_phone_number, library_email);
});

module.exports = router;