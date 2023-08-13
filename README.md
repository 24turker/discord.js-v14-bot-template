# Discord.js v14 Bot Template
A simple Discord.js v14 bot template with a command handler and a few commands.

## Features
✅ Slash commands<br>
✅ Simple and easy to use<br>
✅ Fully i18n support<br>
🍃 Coming soon<br>

## Installation
1. Clone the repository
2. Run `npm install`
3. Rename `example.env` to `.env` and fill in the values
4. Rename `config.example.json` to `config.json` and fill in the values
5. Run `node .`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Go to [LICENSE](LICENSE) for more information.

# i18n Usage
1. Create a new file in the `src/i18n` folder with the language code as the name (e.g. `en-US.js`)
2. Edit the code below according to your language.
```js
module.exports = {
    /* Language support text in help command */
    LANGUAGE_SUPPORT: 'Language support for **{{0}}**: **%{{1}}**',

    /* Category Name */
    CATEGORY_GENERAL: 'General',
    CATEGORY_DEVELOPER: 'Developer',

    /* General */
    NOT_FOUND: '{{0}} not found.',
    COMMAND_ERROR: 'An error occurred while executing {{0}}: {{1}}',
    DEVELOPER_ONLY: 'Only bot developers can do this.',


    /* Commands */
    /* Eval Commands */
    OUTPUT: 'Output',
    ERROR: 'Error',

    /* Help Command */
    HELP_MENU_TITLE: 'Help Menu',
};
```
3. Go to `modules/localization.js` and edit the file.
```js
const locales = {
    'en-US': require('../i18n/en-US.js'),
    tr: require('../i18n/tr.js')
    // new language: French
    fr: require('../i18n/fr.js') // example
};
```
4. Edit the codes to suit you.
```js
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('help')
        .setNameLocalizations({
            tr: 'yardım',
            // new
            fr: 'aide'
        })
        .setDescription('Shows the help menu')
        .setDescriptionLocalizations({
            tr: 'Yardım menüsünü gösterir',
            // new
            fr: 'Affiche le menu d\'aide'
        }),
```
5. Done! You can now use the new language.

