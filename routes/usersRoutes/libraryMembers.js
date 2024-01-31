let express = require('express');
let router = express.Router();
let usersModel = require('../../models/usersModel');
let authmiddleware = require('../../middlewares/authmiddleware');



router.get('/', authmiddleware,async (req, res) => {
    try {
        let libraryMembers = await usersModel.getAllMembersForLoggedInLibrarian(req.user.library.id);
            res.status(200).json({libraryMembers});
        console.log(`in the libraryMembers route ${libraryMembers.libraryMembers}`);
        
    
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;