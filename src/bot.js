const { readdirSync } = require("node:fs");
const config = require("../config.js");
const logger = require("./functions/logger.js");

const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767,
  allowedMentions: { parse: ["users"], repliedUser: true },
});

client.commands = new Collection();

// Commands
const commandFiles = readdirSync("./src/commands").filter((file) =>
  file.endsWith(".js"),
);
if (commandFiles.length > 0)
  logger.info({
    type: "Commands",
    message: `Found ${commandFiles.length.toString()} commands`,
  });
else logger.error({ type: "Commands", message: "No commands found" });

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: "9" }).setToken(config.General.BotToken);

(async () => {
  try {
    logger.debug({
      type: "Commands",
      message: "Started refreshing application (/) commands.",
    });

    await rest.put(Routes.applicationCommands(config.General.BotID), {
      body: commands,
    });

    logger.success({
      type: "Commands",
      message: "Successfully reloaded application (/) commands.",
    });
  } catch (error) {
    logger.error({ type: "Commands", message: error });
  }
})();

// Events
const eventFiles = readdirSync("./src/events").filter((file) =>
  file.endsWith(".js"),
);
if (eventFiles.length > 0)
  logger.info({
    type: "Events",
    message: `Found ${eventFiles.length.toString()} events`,
  });
else logger.error({ type: "Events", message: "No events found" });

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once)
    client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
}

// Login
client
  .login(config.General.BotToken)
  .then()
  .catch((err) => {
    logger.error({ type: "Login", message: err });
  });

// Process events
process.on("unhandledRejection", (error) => {
  logger.error({ type: "Unhandled Rejection", message: error });
});

process.on("uncaughtException", (error) => {
  logger.error({ type: "Uncaught Exception", message: error });
});

process.on("warning", (warning) => {
  logger.warn({ type: "Warning", message: warning });
});
