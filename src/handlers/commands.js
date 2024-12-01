const logger = require("@turkerssh/logger");
const { readdirSync } = require("fs");

const config = require("../../config");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
  const commands = [];
  const commandFiles = readdirSync("./src/commands").filter((file) =>
    file.endsWith(".js"),
  );
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }
  const rest = new REST({ version: "9" }).setToken(
    config.GeneralInformation.BotToken,
  );
  (async () => {
    try {
      await rest.put(
        Routes.applicationCommands(config.GeneralInformation.BotId),
        { body: commands },
      );

      logger.success({
        type: "commands",
        message: "Successfully registered application commands",
      });
    } catch (error) {
      logger.error({
        type: "commands",
        message: "Error while registering application commands",
      });
    }
  })();
};
