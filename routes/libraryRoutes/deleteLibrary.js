const express = require('express');
const router = express.Router();
const LibrariesModel = require('../../models/librariesModel');
const authmiddleware = require('../../middlewares/authmiddleware');

router.delete('/:libraryId', authmiddleware, async (req, res) => {
  const { libraryId } = req.params;
  const librarianLibraryId = req.user.library.id;
  console.log(`the user from req.params $JSON.stringify(${req.params})`);
  console.log(`this is the libraryId of the library being deleted ${libraryId}`);
  let library_to_be_deleted = await LibrariesModel.getLibraryById(libraryId);
  console.log(`this is the library to be deleted ${JSON.stringify(library_to_be_deleted)}`);
  console.log(`this is the req.user the one doing the delete action ${JSON.stringify(req.user.library.id)}`);
  // console.log(JSON.stringify(req.user.library));
  // console.log(`this is the req.user.library ${req.user.library}`);
  // console.log(`this is the req.user.library.id ${req.user.library.id}`);

  if (libraryId == librarianLibraryId) {
    try {
      const result = await LibrariesModel.deleteLibrary(libraryId);
  
      if (result.success) {
        res.status(200).json({ message: 'Library deleted successfully' });
      } else {
        res.status(404).json({ error: 'Library not found or deletion unsuccessful' });
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
