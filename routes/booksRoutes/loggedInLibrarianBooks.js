let express = require('express');
let router = express.Router();
const authmiddleware = require('../../middlewares/authmiddleware');
const booksModel = require('../../models/booksModel');

router.get('/',  authmiddleware, async (req, res) => {
    try {
        const books = await booksModel.getAllBooksForLoggedInLibrarian(req.user);
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


