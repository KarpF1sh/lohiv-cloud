const bcrypt = require("bcrypt")
const crypto = require('crypto');

// database connection
const db = require('./db');


bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(process.argv[3], salt, function(err, hash) {

        // Store hash in the database
        db.query('INSERT INTO `accounts`(uuid, username, password, email) VALUES (?, ?, ?, ?);', [crypto.randomUUID(), process.argv[2], hash, process.argv[4]], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;

            console.log(process.argv[2], process.argv[3]);
            
        });
    });
})