const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //now, to test the command handler, we're going to make this test command here
  message.channel.send("Hello there! What do you want to test exactly?");
}

module.exports.help = {
  name: "test"
}
