const express = require('express');
const bcrypt = require("bcrypt")

// database connection
const db = require('../db');

const session = require('express-session');
const router = express.Router();

router.post('/', function(req, res) {
    // Capture the input fields
    let username = req.body.username;
    let password = req.body.password;

    // Ensure the input fields exists and are not empty
    if (username && password) {

        // Execute SQL query that'll select the account from the database based on the specified username and password
        db.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {

                bcrypt.compare(password, results[0].password, function(err, result) {
                    if (result) {
                        // password is valid
                        // Set session info
                        req.session.loggedin = true;
                        req.session.username = username;
                        req.session.uuid = results[0].uuid;

                        // Redirect to home page
                        res.redirect('/home');
                   } else {

                    req.flash('login', 'Wrong username/password');
    
                    // Redirect back
                    res.redirect('/');
                }	
                });
            }
        });
    } else {
        req.flash('login', 'Please give your username and password');

        // Redirect back
        res.redirect('/');
    }
});

module.exports = router;