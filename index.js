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
const fs = require("fs");//the package we're going to use ofr the handler
const bot = new Discord.Client({ disableEveryone: true});
bot.commands = new Discord.Collection();//defining the commands

fs.readdir("./commands/", (err, files) => {//reading the directory of the command files
  if(err) console.log(err.message);//if we get any errors
  let jsfile = files.filter(f => f.split(".").pop() === "js");//getting the command files
  if(jsfile.length <= 0) return console.log("There are no command file to load.");//if there are no command files
  
  console.log(`[CONSOLE] Loading ${jsfile.length} commands...`);//the amount of the commands that it's going to load into the bot
  
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);//getting each file
    console.log(`[CONSOLE] ${i + 1}: ${f} file has been successfully loaded into the bot!`);//sending an output when the files are being loaded
    bot.commands.set(props.help.name, props);//setting the commands
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

  let messageArray = message.content.split(" ");//getting the message
  let cmd = messageArray[0];//recognising the command
  let args = messageArray.slice(1);//we'll need this for later
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args, prefix);
})

bot.login(process.env.TOKEN)//to log in
