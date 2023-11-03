const logger = require("../functions/logger");
const config = require("../../config.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      logger.error({
        type: "Command",
        message: `Command ${interaction.commandName} not found.`,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error({ type: "Command", message: error });
    }
  },
};
