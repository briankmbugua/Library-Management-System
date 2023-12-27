let express = require('express');
const { libraryParamMiddleware } = require('../middlewares/libraryMiddleware')
let router = express.Router();


// Use the libraryParamMiddleWare for handling dynamic ID

router.param('id', libraryParamMiddleware);

router.get('/:id', (req, res) => {
    res.json(req.library);
})

module.exports = router;