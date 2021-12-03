const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server."),
  async execute(interaction) {
    console.log(interaction);
    return interaction.reply(
      `${interaction}`
      // `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  },
};
