let express = require('express');
let router = express.Router();
let booksModel = require('../../models/booksModel');
const authmiddleware = require('../../middlewares/authmiddleware');


router.delete('/:id', authmiddleware, async (req, res) => {
    try {
        const library_id = req.user.library.id;
        console.log(`in the deleteBook router:library_id ${library_id}`);
        const bookId = req.params.id;
        console.log(`in the deleteBook router:bookid ${bookId}`);
        const result = await booksModel.deleteBook(bookId, library_id);
        if(result) {
            res.status(200).json({message: "Book deleted succesfully"});
        } else {
            res.status(500).json({error: "could not delete book"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

module.exports = router;