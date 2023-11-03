# Discord.js v14 Template
A template for discord.js v14 bots.

## Installation
1. Clone the repository
```sh
git clone https://github.com/turkwr/discord.js-v14-template-bot.git
```
2. Install NPM packages
```sh
npm install
```
3. Rename `config.example.js` to `config.js` and fill in the values
4. Start the bot
```sh
npm run start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[ISC](https://choosealicense.com/licenses/isc/)

## Example config.js file
```js
module.exports = {
    General: {
        BotToken: "", // Discord bot token
        BotID: "", // Discord bot ID
    },

    Presence: {
        Activity: "", // activity that will appear: ex: Hello World
    }
}
```

## Versions Used
- Node.js: v16.6.1 or higher
- Discord.js: v14.10.0 or higher
- Chalk: v4.0.0 or v4.1.2
