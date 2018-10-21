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
    let imgName, pathToDownload;

    if (msg.startsWith(prefix + "JOOIFY")) {
        args.shift();
        let link = args[0];
        
        async function apJoo() {
            async function JooIsDaddy () {
                //Download photo
                imgName = crypto.randomBytes(20).toString('hex') + ".png";
                pathToDownload = `DownloadedPics/${imgName}`;
                func.download(link, imgName, function () {
                    message.channel.send('Image received.');
                    console.log(`> Image downloaded to ${pathToDownload}`);
                })

                //Select a Joo!
                async function selectAJoo() {
                    const embed = new Discord.RichEmbed()
                        .setTitle('Select-A-Joo!')
                        .setDescription('Select one of the following Joo options...')
                        .setColor(0x3AF2DC)
                        .addField('Options', '1-12', false)
                        .attachFile('src/demo.png')
                        .setFooter('0 of 3');

                    await message.channel.send(embed);

                }
                await selectAJoo();
            }

            JooIsDaddy();

            async function help() {
                let userSel;

                message.channel.awaitMessages(async msg => {            
                    if (msg.author.bot) return;

                    userSel = msg.content;
                    await message.channel.send('Selection received. Image processing...');
                    await console.log(`> User has selected the use of Joo #${userSel}`);

                    //Pics
                    let imgName2 = crypto.randomBytes(20).toString('hex') + ".png"
                    let src = `src/${userSel}.png`;
                    let x = 0, y = 0;

                    async function noU() {
                        setTimeout(function () {
                            Jimp.read(src).then(source => {
                                source.resize(1120, Jimp.AUTO);

                                Jimp.read(`${pathToDownload}`).then(pic => {
                                    console.log("> Composing image...");

                                    pic.resize(1024, Jimp.AUTO);
                                    pic.composite(source, x, y);    //Compose the pics
                                    pic.write(`FinishedPics/${imgName2}`);

                                    message.channel.send("", { file: `FinishedPics/${imgName2}` });
                                    console.log(`> Joo-ification complete: Image stored at FinishedPics/${imgName2}`);
                                }).catch(err => {
                                    console.log(err), message.channel.send(`Error: ${err}`)
                                })
                            }).catch(err2 => {
                                console.log(err2), message.channel.send(`Error: ${err2}`)
                            })
                        }, 1000);
                    }
                    await noU();
                }, {time: 10000})
            }
            help();
        }
        apJoo();
    }  
});

//Client login
Client.login(tokens.bot_token);