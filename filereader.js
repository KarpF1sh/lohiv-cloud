const fs = require('fs');
const path = require('path');

// Hardcoded path to find files from
var root = "./uploads/"

// Recursive function to find all the files from all of the subdirectories
const dirTree = (filename) => {
    try {
        const stats = fs.lstatSync(root + filename)
        const info = {
            // aaaaaaaaaaaaaa
            // Jank
            path: filename,
            name: path.basename(filename)
        };
        
        // If the file is a directory go one deeper and repeat
        if (stats.isDirectory()) {
            info.type = "folder";
            info.children = fs.readdirSync(root + filename).map((child) => {
                return dirTree(`${filename}/${child}`);
            });
        } else {
            info.type = "file";
        }
        return info;
    } catch (e){
        console.log(e.code);
        return;
    }
    
    
}

// Export
module.exports = dirTree;