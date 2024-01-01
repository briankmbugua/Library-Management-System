let express = require('express');
let router = express.Router();
const librariesModel = require('../models/librariesModel')


router.get('/', async (req, res) => {
    try {
        // const currentPage = req.query.page || 1;
        // const libraries = await librariesModel.getAllLibraries(currentPage);
        // res.json(libraries);
        res.send('this is the index route')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error in allLibraries.js" })
    }
});

module.exports = router;