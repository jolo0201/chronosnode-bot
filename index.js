const axios = require('axios');
require('dotenv').config(); //initialize dotenv
const   Discord = require('discord.js'); //import discord.js

const client = new Discord.Client(); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token

client.on('message', async msg => {
    let content = msg.content;
    switch (content) {
      case "!meme":
        msg.channel.send("Here's your meme:"); //Replies to user command
        const img = await getMeme(); //fetches an URL from the API
        msg.channel.send(img); //send the image URL
        break;
      case "!time":
        msg.channel.send("Here's is the current time:");
        const tr = await getTime(); 
        msg.channel.send(tr);
        break;
     }
  })

  async function getMeme(){
    const res = await axios.get('https://memeapi.pythonanywhere.com/');
    return res.data.memes[0].url;
  }
  async function getTime(){
    const res = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Manila');
    console.log(res.data.datetime)
    return res.data.datetime;
  }


 