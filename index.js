//
// Required Imports
//

/**
 * Description
 * @param {any} "discord.js"
 * @returns {any}
 */
const { Client, Intents } = require("discord.js");
/**
 * Description
 * @param {any} "./config.json"
 * @returns {any}
 */
const { token } = require("./config.json");
/**
 * Description
 * @param {any} "fs"
 * @returns {any}
 */
const fs = require("fs");

//
// Deceleration
//

/**
 * Description
 * @param {[Intents.FLAGS.GUILDS]}} {intents
 * @returns {any}
 */
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// read files ./events folder
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

//
// Start
//

/**
 * Description
 * @param {any} constfileofeventFiles
 * @returns {any}
 */
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

/**
 * Description
 * @param {any} token
 * @returns {any}
 */
client.login(token);
