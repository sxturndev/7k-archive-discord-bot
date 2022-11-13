// https://discord.js.org
// https://discordjs.guide

require("dotenv").config();
const token = process.env.TOKEN;
const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const fs = require("fs");
const { pullMaps } = require("./osu/feed.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.once("ready", () => {
  // Check for new maps every 5 minutes.
  setInterval(() => {
    pullMaps(client);
  }, 1000 * 60 * 5);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Commands & Events
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Errors
client.on("error", (err) => {
  console.error(err);
});

client.on("shardError", (err) => {
  console.log("A websocket connection encountered an error.");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled promise rejection.");
  console.error(err);
});

// Login with token
client.login(token);
