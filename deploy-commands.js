//
// Required Imports
//

/**
 * Description
 * @param {any} "fs"
 * @returns {any}
 */
const fs = require("fs");
/**
 * Description
 * @param {any} "@discordjs/rest"
 * @returns {any}
 */
const { REST } = require("@discordjs/rest");
/**
 * Description
 * @param {any} "discord-api-types/v9"
 * @returns {any}
 */
const { Routes } = require("discord-api-types/v9");
/**
 * Description
 * @param {any} "./config.json"
 * @returns {any}
 */
const { clientId, token } = require("./config.json");

// ENDL 2

//
// Deceleration

const commands = [];

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
    const command = require(`./commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
  }
}

// ENDL 12

//
// Start
//

/**
 * Description
 * @param {"9"}} {version
 * @returns {any}
 */
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

// ENDL 23
