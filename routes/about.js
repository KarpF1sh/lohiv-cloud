const express = require('express');
const router = express.Router();

// about page
router.get('/', function(req, res) {
    res.render('pages/about');
});

module.exports = router;