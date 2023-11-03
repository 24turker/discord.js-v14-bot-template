const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Pong!")
      .setDescription(
        `Latency is ${
          Date.now() - interaction.createdTimestamp
        }ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`,
      )
      .setColor("Random");
    await interaction.reply({ embeds: [embed] });
  },
};
