let express = require('express');
let router = express.Router();
let booksModel = require('../../models/booksModel');
const authmiddleware = require('../../middlewares/authmiddleware');


router.post('/:id', authmiddleware, async (req, res) => {
    try {
        const library_id = req.user.library.id;
        const bookId = req.params.id;
        const updatedDetails = req.body;

        // Check book availability
        const bookAvailability = await booksModel.checkBookAvailability(bookId, library_id);
        if (!bookAvailability.available) {
            return res.status(400).json({ message: "Book is not available for updating." });
        }

        // Update book details
        const result = await booksModel.updateBookDetails(bookId, library_id, updatedDetails);
        if (result) {
            return res.status(200).json({ message: "Book details updated successfully." });
        } else {
            return res.status(500).json({ error: "Could not update book details." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;