const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const { localize, getPercentage } = require("../modules/localization");
const EmbedMaker = require("../modules/embed");

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('help')
        .setNameLocalizations({
            tr: 'yardım'
        })
        .setDescription('Shows the help menu')
        .setDescriptionLocalizations({
            tr: 'Yardım menüsünü gösterir'
        }),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.deferReply();

        let allCommands = await interaction.client.application.commands.fetch();
        let commands = interaction.client.commands.toJSON();
        let locale = interaction.locale;
        let commandCategories = {};

        const embed = new EmbedMaker(interaction.client)
            .setTitle(localize(locale, 'HELP_MENU_TITLE'))
            .setDescription(localize(locale, 'LANGUAGE_SUPPORT', locale, getPercentage(locale)));

        for (let command of commands) {
            let category = command.category;

            if (!commandCategories[category]) commandCategories[category] = [];

            commandCategories[category].push(command.data.name);
        };

        for (let category in commandCategories) {
            embed.addFields({
                name: localize(locale, `CATEGORY_${category.toUpperCase()}`),
                value: commandCategories[category].map(command => `</${command}:${allCommands.filter(cmd => cmd.name === command).first().id}>`).join(' | ')
            });
        };

        interaction.editReply({
            embeds: [embed]
        });
    }
};