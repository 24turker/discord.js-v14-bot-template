const chalk = require('chalk');
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {*} client 
     */

    execute(client) {


        try {
            client.user.setActivity(
                {
                    name: `Hello World`,
                    type: ActivityType.Watching
                }
            )


        } catch (error) {
            console.log(chalk.redBright(`[ERROR]:`), chalk.bold.redBright(error))
        }    
        
        console.log(chalk.magenta(`[READY]:`), chalk.bold.yellowBright(client.user.tag), chalk.yellowBright(`is ready!`))
        

        console.log(chalk.magenta(`[STATS]:`), chalk.bold.yellowBright(`Guilds: ${Number(client.guilds.cache.size).toLocaleString()} | Users: ${Number(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)).toLocaleString()}`))

    }
}