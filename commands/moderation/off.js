const { SlashCommandBuilder } = require("@discordjs/builders");

// TODO ! MUST BE WORKED ON !

module.exports = {
  data: new SlashCommandBuilder()
    .setName("off")
    .setDescription("Turn off the bot!")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("shutdown or restart?")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const isBotOwner = interaction.user.id == "905355727185514546";
    switch (interaction) {
      case "restart": {
        if (!isBotOwner) return;
        interaction.reply("Restarting...").then(() => {
          client.destroy().then(() => {
            client.login("token");
          });
        });
        break;
      }
      case "shutdown": {
        if (!isBotOwner) return;
        interaction.reply("Shutting down...").then(() => {
          client.destroy();
        });
        break;
      }
    }

    return interaction.reply("Done!");
  },
};
