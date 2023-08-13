const { config } = require("dotenv");
config();

module.exports = {

    /**
     * @botName {string} - The name of the bot
     * @token {string} - The bot token (go to .env file to change this)
     * @developerIds {string[]} - The IDs of the bot developers
     */

    botName: "BOT_NAME",
    token: process.env.DISCORD_TOKEN, // go to .env file to change this
    developerIds: ["162740870607536128", "DEVELOPER_ID"],

};