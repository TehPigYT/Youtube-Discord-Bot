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
const bot = new Discord.Client({ disableEveryone: true});

bot.on("ready", async () => {
  console.log(`[CONSOLE] ${bot.user.tag} has now logged in on Discord and watching ${bot.guilds.size} guilds, with ${bot.users.size} users and ${bot.channels.size} channels!`)
  bot.user.setActivity("TechPig's tutorials!", { type: "WATCHING"})
})//when it is on

bot.on("message", async message => {
  if(message.channel.type == "dm") return;//dms are disabled
  if(message.author.bot) return;//if a bot executes a command
  
  let prefix = botconfig.prefix;//geting the prefix
  if(!message.content.startsWith(prefix)) return; //if there's not the specified prefix in the start of the message
  
  if(message.content.startsWith(`${prefix}botinfo`)){
    let embed = new Discord.RichEmbed()//We're going to use embeds to make the text look better and more understandable
    .setAuthor(message.author.username, message.author.avatarURL)//Getting and providing information about the author of the message
    .setDescription("Here's some information about this bot!")//Setting the description of the embed
    .setColor("RANDOM")//This is my choice, but embeds support hex colors, too! If you want to input a certain color, here's what you have to need That's it!
    .setThumbnail(bot.user.avatarURL)
    .addField("Username:", bot.user.username, true)//adding fields with information about the bot
    .addField("Nickname:", bot.user.nickname || "None", true)//forgot to put this in the video
    .addField("ID:", bot.user.id, true)
    .addField("Discriminator:", bot.user.discriminator, true)
    .addField("Created At:", bot.user.createdAt.toDateString(), true)
    .addField("Servers:", bot.guilds.size, true)
    .addField("Users:", bot.users.size, true)
    .addField("Channels:", bot.channels.size, true)
    .setFooter(`Executed in ${message.guild.name}`, message.guild.iconURL)//setting the footer
    
    message.channel.send(embed)//now, it's time to test the command!
  }
  if(message.content.startsWith(`${prefix}serverinfo`)){
    let embed = new Discord.RichEmbed()//we're going to make it the same way
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription("Here's some information about this server!")
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL)
    .addField("Name:", message.guild.name, true)
    .addField("ID:", message.guild.id, true)
    .addField("Created At:", message.guild.createdAt.toDateString(), true)
    .addField("Joined At:", message.guild.joinedAt.toDateString(), true)
    .addField("Users:", message.guild.members.size, true)
    .addField("Channels:", message.guild.channels.size, true)
    .addField("Roles:", message.guild.roles.size, true)
    .setFooter(`Executed in ${message.guild.name}`, message.guild.iconURL)
    
    message.channel.send(embed);
  }
})

bot.login(process.env.TOKEN)//to log in
