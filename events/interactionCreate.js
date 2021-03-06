/**
 * Description
 * @param {any} "fs"
 * @returns {any}
 */
const fs = require("fs");
/**
 * Description
 * @param {any} "discord.js"
 * @returns {any}
 */
const { Client, Collection, Intents } = require("discord.js");

/**
 * Description
 * @param {[Intents.FLAGS.GUILDS]}} {intents
 * @returns {any}
 */
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/**
 * Description
 * @returns {any}
 */
client.commands = new Collection();
/**
 * Description
 * @returns {any}
 */
client.type = new Collection();

/**
 * Description
 * @param {any} "../config.json"
 * @returns {any}
 */
const { prefix } = require("../config.json");

/**
 * Description
 * @param {any} "./commands"
 * @returns {any}
 */
const commandFolders = fs.readdirSync("./commands");

/**
 * Description
 * @param {any} constfolderofcommandFolders
 * @returns {any}
 */
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}/`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`../commands/${folder}/${file}`);
    client.commands.set(command.name || command.data.name, command);
    client.type.set(command.type || command.data.type, command);
  }
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );

    /**
     * Description
     * @param {any} !interaction.content.startsWith(prefix
     * @returns {any}
     */
    if (!interaction.content.startsWith(prefix) || interaction.author.bot) {
      return;
    }

    /**
     * Description
     * @param {any} prefix.length
     * @returns {any}
     */
    const args = interaction.content.slice(prefix.length).trim().split(/ +/);

    /**
     * Description
     * @returns {any}
     */
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;

    /**
     * Description
     * @param {any} interaction.typeInfo
     * @returns {any}
     */
    const type = client.type.get(interaction.typeInfo);

    if (type == "slash") {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return;

      try {
        await cmd.execute(interaction);
      } catch (error) {
        console.error(error);
        return interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }

    try {
      client.commands.get(command).execute(interaction, args);
    } catch (error) {
      console.error(error);
      interaction.reply("there was an error trying to execute that command!");
    }
  },
};
