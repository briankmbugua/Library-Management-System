let express = require('express')
let router = express.Router();


/* Get test page */
router.get('/', function (req, res, next) {
    res.render('test', { test: 'This is the test page' });
});

module.exports = router;