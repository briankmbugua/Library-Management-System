let express = require('express');
let router = express.Router();
//Librarain Login
router.post('/', (req, res, next) => {
    //Validate librarian credentials
    //If valid, generate a token and return it for future authentication
    res.send('librarian login')
});

module.exports = router;