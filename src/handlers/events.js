const logger = require("@turkerssh/logger");
const { readdirSync } = require("fs");
const allevents = [];

module.exports = (client) => {
  let amount = 0;
  for (const file of readdirSync("./src/events").filter((f) =>
    f.endsWith(".js"),
  )) {
    try {
      const module = require("../events/" + file);
      let eventName = file.split(".")[0];
      allevents.push(eventName);
      client.on(eventName, module.bind(null, client));
      amount++;
    } catch (e) {
      logger.error({
        type: "events",
        message: `Error while loading event ${file}`,
      });
      console.log(e);
    }
  }
};
