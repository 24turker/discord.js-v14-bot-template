const logger = require("@turkerssh/logger");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const config = require("../config");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
});

client.interaction = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();
client.shards = new Collection();

["events", "commands"].filter(Boolean).forEach((h) => {
  require(`./handlers/${h}`)(client);
});

process.on("unhandledRejection", (err) => {
  logger.error({
    type: "client",
    message: err,
  });
});

process.on("uncaughtException", (err) => {
  logger.error({
    type: "client",
    message: err,
  });
});

process.on("warning", (warning) => {
  logger.warn({
    type: "client",
    message: warning,
  });
});

client.login(config.GeneralInformation.BotToken).catch((err) => {
  logger.error({
    type: "client",
    message: "Error while logging in",
  });
  console.dir(err);
});
