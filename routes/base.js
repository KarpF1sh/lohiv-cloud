const express = require('express');
const router = express.Router();

// index page
router.get('/', function(req, res) {
    res.render('pages/login', {
        message: req.flash('login')
    });
});

// other routes
router.use('/about', require('./about'));
router.use('/auth', require('./auth'));
router.use('/home', require('./home'));
router.use('/home-advanced', require('./home-advanced'));
router.use('/upload', require('./upload'));
router.use('/delete', require('./delete'));

module.exports = router;