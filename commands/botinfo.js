const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
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

module.exports.help = {
  name: "botinfo"
}   
