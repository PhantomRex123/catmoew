const { MessageEmbed } = require("discord.js");
const { embedCreate } = require("../../helpers/embedCreate");

module.exports = {
  name: "test",
  desc: "A test command",
  async execute(interaction) {
    // const user = interaction.options.getUser("target");
    // if (user) {
    //   return interaction.reply(
    //     embedCreate(
    //       "#0099ff",
    //       `${user.username}'s avatar: ${user.displayAvatarURL({
    //         dynamic: true,
    //       })}`,
    //       "testing"
    //     )
    //   );
    // }
    // return interaction.reply(
    //   // `Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`
    //   embedCreate(
    //     "#0099ff",
    //     `Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`,
    //     "testing"
    //   )
    // );
    const exampleEmbed = embedCreate;
    return interaction.reply({ embeds: [exampleEmbed] });
  },
};
