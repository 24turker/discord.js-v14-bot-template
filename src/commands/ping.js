const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Shows the bot's ping")
    .setDescriptionLocalizations({
        tr: 'Botun pingini gösterir'
    }),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
    }
};