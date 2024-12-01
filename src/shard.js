const logger = require("@turkerssh/logger");
const { ShardingManager, WebhookClient } = require("discord.js");

const config = require("../config");

const webhook = new WebhookClient({
  url: config.WebhookInformation.ShardWebhook,
});

exports.run = async () => {
  const manager = new ShardingManager("./src/bot.js", {
    token: config.GeneralInformation.BotToken,
    totalShards: "auto",
    respawn: true,
    mode: "process",
  });

  manager.on("shardCreate", (shard) => {
    logger.info({
      type: "shard",
      message: `Shard ${shard.id} launched`,
    });

    webhook.send(
      `🟢 [<t:${Math.floor(Date.now() / 1000)}:f>]: Shard **#${shard.id}** online!`,
    );
  });

  manager.spawn().catch((err) => {
    logger.error({
      type: "shard",
      message: "Error while spawning shards",
    });
    console.dir(err);

    webhook.send(
      `🔴 [<t:${Math.floor(Date.now() / 1000)}:f>]: Error while spawning shards!`,
    );
  });
};
