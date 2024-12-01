const { ActivityType, EmbedBuilder } = require("discord.js");

const logger = require("@turkerssh/logger");
const config = require("../../config");

module.exports = (client) => {
  client.user.setPresence({
    activities: [
      {
        name: config.PresenceInformation.ActivityState,
        type: ActivityType.Custom,
      },
    ],
    status: "idle",
  });

  logger.success({
    type: "client",
    message: `${client.user.tag} is ready!`,
  });
};
