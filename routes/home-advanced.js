const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// database connection
const db = require('../db');

// Filereader
const fileList = require('../filereader');

// String validator
const validator = require('../validator')
const pathValidator = validator.validatePath;

// http://localhost:3000/home
router.get('/', function(req, res) {
    // store uuid
    var uuid = req.session.uuid;

    // Store directory parameter set empty if not given
    var params = req.query.d ? req.query.d : "";

    // File list to render page with
    var list = {filenames: [], links: []};

    // If the user is loggedin
    if (req.session.loggedin) {

        if (uuid != null){
            db.query('SELECT * FROM links WHERE uuid = ?', [uuid], function(error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;

                // If the data exists
                if (results.length > 0) {
                    
                    // Get all the saved links
                    results.forEach(element => {
                        // push to list
                        list.filenames.push(element.filename);
                        list.links.push(element.link);
                    });

                } else {
    
                    // TODO flash this
                    //res.send('no links');
                }

                // Make path safe and get files
                var safe = pathValidator(params);
                console.log(fileTree);
                var fileTree = fileList(safe);

                backEnabled = true;

                console.log(fileTree);
                if (safe == ""){
                    backEnabled = false;
                }
                

                //getRoot(fileTree.children);
                //console.log(fileTree);

                // render page
                res.render('pages/home-advanced', { 
                    // send username
                    user: req.session.username,
                    // send filename and link list
                    list: list,
                    back: backEnabled,
                    fileTree: fileTree
                });
            });
        }
    } else {
        // Not logged in
        //console.log("not logged");

        // send 401 forbideen to non logged in users
        //res.status(401).send("not logged in");
    }
    //res.end();
});

module.exports = router;