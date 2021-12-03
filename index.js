//
// Required Imports
//

const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

//
// Deceleration
//

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


// read files ./events folder
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

//
// Start
//

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
