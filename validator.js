var path = require('path');
const stripDirs = require('strip-dirs');

// Test if folder path is in valid form to avoid leaks
var root = 'uploads/';
function validatePath(user_input){

    if (user_input == ""){
        return "";
    }

    // make safe
    var safeSuffix = path.normalize(user_input).replace(/^(\.\.(\/|\\|$))+/, '');
    var safeJoin = path.join(root, safeSuffix);

    var stripped = stripDirs(path.normalize(safeJoin), 1);

    // This is shit
    if (stripped == ".") { var stripped = ""};

    //console.log(path.normalize(safeJoin));

    // return safe
    return stripped;
}

// Test if url contains only valid characters
function validateUrl(url){
    // Maybe improve this in the future?

    // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-
    return /^[0-9A-Za-z_-]+$/.test(url) && url.length == 6;
}

// Exports
module.exports = {
    validatePath,
    validateUrl,
}