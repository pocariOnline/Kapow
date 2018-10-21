/*console.log("  .----.-----.-----.-----.");
console.log("    /      \\     \\     \\     \\");
console.log("|  \\/    |     |   __L_____L__");
*/
/*console.log("  .----.-----.-----.-----.\\");
console.log("/      \\     \\     \\     \\");
console.log("|  \\/    |     |   __L_____L__");
console.log("|   |    |     |  (           \\");
console.log("|    \\___/    /    \\______/    |");
console.log("|        \\___/\\___/\\___/       |");
console.log("\\      \\     /               /");
console.log(" |                        __/");
console.log("  \\_                   __/");
console.log("   |        |         \|");
console.log("   |                  \|");
console.log("   |                  \|");
*/
const Jimp = require('jimp');

let pathToDownload = 'DownloadedPics/test2.png'
let src = 'DownloadedPics/test.png';
let x = 100,
    y = 100;

Jimp.read(src).then(source => {
    Jimp.read(pathToDownload).then(pic => {
        pic.composite(source, x, y);
        console.log("this program is the rear end of a particular animal that starts with a d.");
    }).catch(err => {
        console.log(err), message.channel.send(`Error: ${err}`)
    })
}).catch(err2 => {
    console.log(err2), message.channel.send(`Error: ${err2}`)
})