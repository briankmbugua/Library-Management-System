const LibrariesModel = require('../models/librariesModel');


// Middleware to handle dynamic ID
async function libraryParamMiddleware(req, res, next, id) {
    try {
        const library = await LibrariesModel.getLibraryById(id);
        console.log(library);
        if (library) {
            req.library = library;
            next();
        } else {
            res.status(404).json({ error: 'Library not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error While getting Library by Id' })
    }
}

module.exports = {
    libraryParamMiddleware,
}