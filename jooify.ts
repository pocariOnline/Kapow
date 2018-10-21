const Discord = require('discord.js');
const fs = require('fs');
const Jimp = require('jimp');
const crypto = require('crypto');
const request = require('request');
const Client = new Discord.Client();

//Important thigns
const tokens = JSON.parse(fs.readFileSync('Storage/tokens.json'));
const func = require('./functions.js');
const prefix = ("$");

Client.on('ready', () => {
    func.fist();
});

Client.on('message', message => {
    //Stuffs
    let msg = message.content.toUpperCase();
    let args = message.content.slice(prefix.length).trim().split(" ");

    if (msg.startsWith(prefix + "JOOIFY")) {
        args.shift();
        let link = args[0];
        let userSel;

        if (!args[1]) userSel = func.randomNumGenInc(0, 3);
        else if (/[0-3]/.test(args[1])) userSel = args[1];
        else return message.channel.send('Invalid selection.');

        //Pics
        let imgName = crypto.randomBytes(20).toString('hex') + ".png";
        let imgName2 = crypto.randomBytes(20).toString('hex') + ".png"
        let pathToDownload = `DownloadedPics/${imgName}`;
        let src = `src/${userSel}.png`;
        let x = 0, y = 0;

        async function help() {
            await func.download(link, imgName, function() {
                message.channel.send('Image received. Processing...');
                console.log(`> Image downloaded to ${pathToDownload}`);
            })

            setTimeout(function () {
                Jimp.read(src).then(source => {
                    source.resize(1120, Jimp.AUTO);

                    Jimp.read(`${pathToDownload}`).then(pic => {
                        console.log("> Composing image...");

                        pic.resize(1024, Jimp.AUTO);
                        pic.composite(source, x, y);    //Compose the pics
                        pic.write(`FinishedPics/${imgName2}`);

                        message.channel.send("", {file: `FinishedPics/${imgName2}`});
                        console.log(`> Joo-ification complete: Image stored at FinishedPics/${imgName2}`);
                    }).catch(err => {
                        console.log(err), message.channel.send(`Error: ${err}`)
                    }) 
                }).catch(err2 => {
                    console.log(err2), message.channel.send(`Error: ${err2}`)
                })
            }, 1000);
        }

        help();
    }
});

//Client login
Client.login(tokens.bot_token);