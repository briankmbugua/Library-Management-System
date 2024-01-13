let express = require('express');
const { libraryParamMiddleware } = require('../../middlewares/libraryMiddleware');
const authmiddleware = require('../../middlewares/authmiddleware');
let router = express.Router();


// Use the libraryParamMiddleWare for handling dynamic ID

router.param('id',libraryParamMiddleware);

router.get('/:id', [authmiddleware,(req, res) => {
    const { id } = req.params;
    const librarianLibraryId = req.user.library.id;
    console.log(id);
    console.log(librarianLibraryId);
    if (id == librarianLibraryId) {
        res.json(req.library);
    } else {
        res.send('Not authorized');
    }
    res.json(req.library);
}])

module.exports = router;