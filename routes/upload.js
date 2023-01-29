const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');
const fs = require('fs');

// database connection
const db = require('../db');

// upload page
router.post('/', async (req, res) => {

    // get uuid of logged in user
    var uuid = req.session.uuid;

    // If the user is loggedin
    if (req.session.loggedin) {
        try {
            if(!req.files) {
                // Flash message
                req.flash('info', ['Failed', 'You did not select any file', "text"]);

                // Redirect back
                res.redirect('home');
            } else {

                // IMPORTANT TODO: fix possible (but very rare) collisions
                var uid = nanoid.nanoid(6);

                // Hardcoded path to where the file are uploaded
                // TODO: Make this more easily configurable
                var path = "uploads/"+ uid + "_" + nanoid.nanoid(20);
                var filename = "";

                // Set false by default
                var multiple = false;

                // Get files from request body
                let files = req.files.sampleFile;

                // Create new directory for files
                if (!fs.existsSync(path)){
                    fs.mkdirSync(path);
                }

                // Test if there are multiple files uploaded
                if (files.length > 1){

                    // move multiple files
                    files.forEach(file => {
                        //Use the mv() method to place the file in upload directory (i.e. "uploads")
                        file.mv(path + "/" + file.name);
                        //console.log(file.name)
                    });

                    // Set multiple files true
                    multiple = true;
                    filename = "Multiple files";
                } else {
                    files.mv(path + "/" + files.name);
                    filename = files.name;
                }

                // identify filetype
                // Use magic proper filetype indentification in the future

                var type = "none";
                // list of extensions
                var mediaTypes =  ["jpg", "jpeg", "png", "gif", "tiff", "jfif", "webp", "mp4", "mov", "mkv", "mp3", "m4a", "3gp", "ogg", "wav"];

                /*
                var imageTypes =  ["jpg", "jpeg", "png", "gif", "tiff", "jfif", "webp"];
                var videoTypes =  ["mp4", "mov", "mkv"];
                var audioTypes =  ["mp3", "m4a", "3gp", "ogg", "wav"];*/

                // Regex string to find extension
                var re = /(?:\.([^.]+))?$/;

                // Get and store ext
                var ext = re.exec(filename)[1];

                //console.log(ext)

                // Test and find type
                if(mediaTypes.indexOf(ext) > -1){
                    //console.log("media");
                    type = "media";
                }

                // Trim filename
                var trimmedName = filename.length > 45 ? filename.substring(0, 45 - 3) + "..." : filename;
                
                db.query('INSERT INTO `links`(uuid, filename, filepath, link, date, multiple, type) VALUES (?, ?, ?, ?, NOW(), ?, ?);', [uuid, trimmedName, path, uid, multiple, type], function(error, results, fields) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
                    //console.log(results);
                });

                req.flash('info', ['Here\'s your link', 'lohiv.com/f/' + uid, "link"]);

                // Redirect back
                res.redirect('home');
            }
        } catch (err) {
            
        }
    }
});

module.exports = router;