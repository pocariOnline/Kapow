const request = require('request');
const fs = require('fs');

module.exports = {
    fist: function () {
        console.log("  .----.-----.-----.-----.");
        console.log("/        \\     \\     \\     \\");
        console.log("|  \\/    |     |   __L_____L__");
        console.log("|   |    |     |  (           \\");
        console.log("|    \\___/    /    \\______/    |");
        console.log("|        \\___/\\___/\\___/       |");
        console.log("\\      \\     /                 /");
        console.log(" |                          __/");
        console.log("  \\_                     __/");
        console.log("   |        |           \|");
        console.log("   |                    \|");
        console.log("   |                    \|");
    },

    download: function (url, filename, callback) {
        request.head(url, function (err, res, body) {
            //console.log('content-type:', res.headers['content-type']);
            //console.log('content-length:', res.headers['content-length']);
            console.log('> Downloading image...');

            request(url).pipe(fs.createWriteStream(`DownloadedPics/${filename}`)).on('close', callback);
        });
    },

    //Random Number Generator (Inclusive)
    randomNumGenInc: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
}