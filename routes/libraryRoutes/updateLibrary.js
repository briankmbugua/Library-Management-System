let express = require('express');
let router = express.Router();
let librariesModel = require('../../models/librariesModel');
// Update Library
router.put('/:libraryId', async (req, res) => {
    const libraryId = req.params.libraryId;
    const updatedDetails = req.body; // Assuming you're sending updated details in the request body
    const {
        library_name,
        library_address,
        library_phone_number,
        library_email,
    } = req.body;
    console.log(updatedDetails);
  
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
  });
  
  module.exports = router;