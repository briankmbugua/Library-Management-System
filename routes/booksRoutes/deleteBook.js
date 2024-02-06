let express = require('express');
let router = express.Router();
let booksModel = require('../../models/booksModel');
const authmiddleware = require('../../middlewares/authmiddleware');


router.delete('/:id', authmiddleware, async (req, res) => {
    try {
        const library_id = req.user.library.id;
        const bookId = req.params.id;        
        const bookAvailability = await booksModel.checkBookAvailability(bookId, library_id);
        if (!bookAvailability.available) {
            return res.status(400).json({ message: "Book has already been issued." });
        }
        const deletionResult = await booksModel.deleteBook(req.user, bookId);
        if (deletionResult) {
            return res.status(200).json({ message: "Book deleted successfully." });
        } else {
            return res.status(500).json({ error: "Could not delete book." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

module.exports = router;