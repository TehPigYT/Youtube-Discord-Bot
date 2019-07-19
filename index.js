const http = require('http');      
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " ping recieved. I think.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);//glitch stuff

const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true});

bot.on("ready", async () => {
  console.log(`[CONSOLE] ${bot.user.tag} has now logged in on Discord and watching ${bot.guilds.size} guilds, with ${bot.users.size} users and ${bot.channels.size} channels!`)
  bot.user.setActivity("TechPig_YT's tutorials!", { type: "WATCHING"})
})//when it is on

bot.on("message", async message => {
  if(message.channel.type == "dm") return;//dms are disabled
  if(message.author.bot) return;//if a bot executes a command
  
  if(message.content.startsWith("hello")){
    message.channel.send(`Hello there, ${message.author}!`)
  } else if(message.content.startsWith("ping")){
    message.channel.send("I think that you're looking for the answer **PONG**.")
  }
})

bot.login(process.env.TOKEN)//to log in
