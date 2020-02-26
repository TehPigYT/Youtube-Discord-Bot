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
}, 280000);

const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");//the needed package for the handler
const bot = new Discord.Client({ disableEveryone: true});
bot.commands = new Discord.Collection();//defining the commands

fs.readdir("./commands/", (err, files) => {//reading the directory of the command files
  let i = [];
  try{
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    i = jsfile
  } catch(e) {
    return console.log("[ERROR] No command files detected to load into the bot.\nAdd some by creating a new file in command/(command name)");
  }
  
  console.log(`Loading ${jsfile.length} commands...`)//getting the files
  
  jsfile.forEach((f, i) => {//each command file
    let props = require(`./commands/${f}`);//getting each file
    console.log(`${i + 1}: ${f} file has been successfully loaded into the bot!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`[CONSOLE] ${bot.user.tag} has now logged in on Discord and watching ${bot.guilds.size} guilds, with ${bot.users.size} users and ${bot.channels.size} channels!`)
  bot.user.setActivity("TechPig's tutorials!", { type: "WATCHING"})
})//when it is on

bot.on("message", async message => {
  if(message.channel.type == "dm") return;//dms are disabled
  if(message.author.bot) return;//if a bot executes a command
  
  let prefix = botconfig.prefix;//geting the prefix
  if(!message.content.startsWith(prefix)) return; //if there's not the specified prefix in the start of the message
  
  let messageArray = message.content.split(" ");//getting the message we send
  let cmd = messageArray[0];//seperating the command
  let args = messageArray.slice(1);//we'll need this for later
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));//getting the commands
  if(commandfile) commandfile.run(bot, message, args, prefix);
  
  //now, we're done with the command handler
  //let's make a command to test it!
})

bot.login(process.env.TOKEN)//to log in
