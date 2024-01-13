let express = require('express');
let router = express.Router();
let booksModel = require('../../models/booksModel');
const authmiddleware = require('../../middlewares/authmiddleware');
//Add book
router.post('/', authmiddleware, async(req, res) => {
    // const book_details = req.user.library.id;
    //req.body.libraryId = librarianLibraryId;
    // console.log(`in add book ${JSON.stringify(req.body)}`);
    // console.log(`in add book ${librarianLibraryId}`);
    // let library_id = librarianLibraryId;

    try {
        const {
            title,
            author,
            isbn,
            publication_date,
            genre,
            available
        } = req.body;
        const library_id = req.user.library.id;
        console.log('Received request with parameters:');
        console.log('title:', title);
        console.log('author:', author);
        console.log('isbn:', isbn);
        console.log('publication_date:', publication_date);
        console.log('genre:', genre);
        console.log('available:', available);
        console.log('library_id:', library_id);
        console.log(req.body);
        const result = await booksModel.addBook(title, author, isbn, publication_date, genre, available, library_id);
        if(result){
            res.status(201).json({message: `book registered in ${JSON.stringify(req.user, null, 2)}`});
        } else {
            res.status(500).json({error: 'could not register book'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


module.exports = router;