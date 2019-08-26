const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
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

module.exports.help = {
  name: "serverinfo"
}
