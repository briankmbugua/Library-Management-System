let express = require('express');
let router = express.Router();
let booksModel = require('../../models/booksModel');
const authmiddleware = require('../../middlewares/authmiddleware');
const bookParamMiddleware = require('../../middlewares/bookParamMiddleware');


router.post('/:id', authmiddleware, async(req, res) => {
    try {
        const library_id = req.user.library.id;
        console.log(`in the updateBook router:library_id ${library_id}`);
        const bookId = req.params.id;
        console.log(`in the updateBook router:library_id ${bookId}`);
        const updatedDetails = req.body;
        console.log(`in the updateBook router:library_id ${updatedDetails}`);
        const result = await booksModel.updateBookDetails(bookId, library_id, updatedDetails);
        if(result) {
            res.status(200).json({message:"Book details updated succesfully"});
        } else {
            res.status(500).json({error:"could not update book"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server errror"});
    }
});

module.exports = router;