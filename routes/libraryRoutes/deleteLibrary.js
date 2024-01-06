const express = require('express');
const router = express.Router();
const LibrariesModel = require('../../models/librariesModel');

router.delete('/:libraryId', async (req, res) => {
  const { libraryId } = req.params;

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
});

module.exports = router;
