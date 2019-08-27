const Discord = require("discord.js");
//constructing the command handler
module.exports.run = async (bot, message, args) => {//no need to type all of the specified items
  
  message.channel.send("Hello there!")
}

module.exports.help = {
  name: "test"//the name of the command, in which the bot will respond
}//you don't have to do this step
//time to test it!
