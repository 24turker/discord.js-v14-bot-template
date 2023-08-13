const { ShardingManager } = require('discord.js');
const config = require('../config');
const chalk = require('chalk');
const figlet = require('figlet');
 

figlet.text(`${config.botName}`, function (err, data) {
    if (err) {
        console.log(chalk.redBright(`[ERROR]:`), chalk.bold.redBright(err))
        return;
    }
    console.log(chalk.magenta(data))
})

const manager = new ShardingManager('src/bot.js', {
    token: config.token,
});

manager.on('shardCreate', shard => console.log(chalk.magenta(`[SHARD]:`), chalk.green(`Launched shard ${shard.id}`)));

manager.spawn();