let express = require('express');
let router = express.Router();
let borrowingModel = require('../../models/borrowingModel');
let booksModel = require('../../models/booksModel');
const authmiddleware = require('../../middlewares/authmiddleware');

router.post('/:id/:member_id', authmiddleware, async (req, res) => {
    try {
        const library_id = req.user.library.id;
        const book_id = req.params.id;
        const member_id = req.params.member_id;
        console.log(`the id of the book being issued ${book_id}`);
        console.log(`the id of the member being issued the book ${book_id}`);
        // Update book availability
        const isBookAvailable = await booksModel.checkBookAvailability(book_id);
        console.log(`book availability ${isBookAvailable}`);
        if (!isBookAvailable) {
            return res.status(400).json({ message: 'Book is not available for borrowing.' });
        }

        // Issue the book
        const issueResult = await borrowingModel.issueBook(member_id, library_id, book_id);

        if (issueResult) {
            res.status(200).json({ message: 'Book issued successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to issue the book.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;