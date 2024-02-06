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
        const issueResult = await borrowingModel.issueBook(book_id, member_id, library_id);
        console.log(`issueresults ${JSON.stringify(issueResult)}`)
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