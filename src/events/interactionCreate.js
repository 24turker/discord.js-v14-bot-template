const logger = require("@turkerssh/logger");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      logger.debug({
        type: "interaction",
        message: `${interaction.user.tag} executed ${interaction.commandName} command`,
      });
      await command.execute(interaction);
    } catch (error) {
      logger.error({
        type: "interaction",
        message: error,
      });
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });
};
