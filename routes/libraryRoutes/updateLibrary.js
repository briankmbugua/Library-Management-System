const express = require('express');
const router = express.Router();
const librariesModel = require('../../models/librariesModel');
const authmiddleware = require('../../middlewares/authmiddleware');
// Update Library
router.put('/:libraryId', authmiddleware, async (req, res) => {
    const libraryId = req.params.libraryId;
    const updatedDetails = req.body; // Assuming you're sending updated details in the request body
    const {
        library_name,
        library_address,
        library_phone_number,
        library_email,
    } = req.body;
    console.log(updatedDetails);
    //req.user && req.user.library && req.user.library.id === libraryId
    //req.user && req.user.library_id == libraryId
    if (req.user && req.user.library && req.user.library.id === libraryId) {
      try {
        const result = await librariesModel.updateLibraryDetails(libraryId, updatedDetails);
    
        if (result && result.success) {
          res.status(200).json({ message: 'Library details updated successfully' });
        } else {
          res.status(404).json({ error: 'Library not found or no changes applied' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(403).json({error: 'Forbidden: Insufficient permissions for this library'})
    }
  });
  
  module.exports = router;