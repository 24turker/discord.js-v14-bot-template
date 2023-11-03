const { ShardingManager } = require("discord.js");
const logger = require("./functions/logger.js");
const config = require("../config.js");
const figlet = require('figlet');
const shard = new ShardingManager("src/bot.js", {
  token: config.General.BotToken,
  totalShards: "auto", // 'auto' or number
  respawn: true, // whether to respawn a shard when it encounters an error
  mode: "process", // process or worker
});

figlet(config.General.BotName, function(err, data) {
  if (err) {
      logger.error({
        type: "Figlet",
        message: `Error while starting the bot.`,
      });
      console.dir(err);
      return;
  }
  console.log(data)
});

shard.on("shardCreate", (shard) => {
  logger.info({ type: "Shard", message: `Launched shard ${shard.id}` });
});

shard.spawn({
  amount: shard.totalShards,
  delay: 5500,
  timeout: 30000,
});
