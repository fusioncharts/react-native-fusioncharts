const path = require('path');
const fs = require('fs');

function replacePathsWithContents(obj) {
    const promises = [];
    function traverseAndReplace(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                const filePath = path.join(__dirname, obj[key]);
                promises.push(
                    new Promise((resolve, reject) => {
                        fs.readFile(filePath, 'utf8', (err, data) => {
                            if (err) {
                                return reject(err);
                            }
                            obj[key] = data;
                            resolve();
                        });
                    })
                );
            } else if (typeof obj[key] === 'object') {
                traverseAndReplace(obj[key]);
            }
        }
    }
    traverseAndReplace(obj);
    return Promise.all(promises).catch(err => {
        console.error('Error reading file:', err);
    });
}

module.exports = { replacePathsWithContents };