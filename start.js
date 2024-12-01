const logger = require("@turkerssh/logger");
const figlet = require("figlet");

const config = require("./config");

figlet(config.GeneralInformation.BotName, (err, data) => {
  if (err) {
    logger.error({
      type: "figlet",
      message: "Something went wrong...",
    });
    console.dir(err);
    return;
  }
  console.log(data);
});

require("./src/shard.js").run();
