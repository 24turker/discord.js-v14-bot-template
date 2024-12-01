const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot ping."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setDescription(`🏓 Pong! **${interaction.client.ws.ping}ms**.`)
      .setColor("#13131B");
    await interaction.reply({ embeds: [embed] });
  },
};
