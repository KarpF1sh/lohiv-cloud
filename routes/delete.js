const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');
const fs = require('fs');
const validator = require('../validator');

// Validator
const urlValidator = validator.validateUrl;

// database connection
const db = require('../db');

// upload page
router.post('/', async (req, res) => {

    // get uuid of logged in user
    var uuid = req.session.uuid;
    var short = req.body.short;

    //console.log(short);

    // If the user is loggedin
    if (req.session.loggedin) {
        try {
            if(!req.body.short) {
                res.send({
                    status: false,
                    message: 'No link code provided'
                });
            } else {
                if (urlValidator(short)) {
                    // Delete link from base
                    db.query('DELETE FROM links WHERE uuid = ? AND link = ?', [uuid, short], function(error, results, fields) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;
                        //console.log(results);

                        //console.log(results);
                        res.send({
                            status: true,
                            message: 'Link deleted'
                        });
                    });
                }
            }
        } catch (err) {
            //res.status(500).send(err);
        }
    }
});

module.exports = router;