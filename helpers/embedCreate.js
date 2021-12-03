const { MessageEmbed } = require("discord.js");

function embedCreate() {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Some title")
    .setDescription("testing123");
}

module.exports.embedCreate = embedCreate;
