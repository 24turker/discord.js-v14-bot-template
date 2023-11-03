const logger = require("../functions/logger");
const config = require("../../config.js");
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    logger.success({
      type: "Bot",
      message: `Logged in as ${client.user.tag}!`,
    });
    client.user.setPresence({
      activities: [
        { name: config.Presence.Activity, type: ActivityType.Custom },
      ],
      status: "dnd",
    });
  },
};
