const { Client, Collection } = require("discord.js");
const { readdirSync } = require("node:fs");
const { default: axios } = require("axios");
const { localize } = require("./modules/localization");
const { developerIds } = require("../config");
const chalk = require("chalk");

const client = new Client({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "GuildMessageReactions",
    "DirectMessages",
    "DirectMessageReactions",
  ],
  partials: ["Channel", "GuildMember", "Message", "Reaction", "User"],
});

client.commands = new Collection();

const commandFiles = readdirSync("src/commands").filter((file) =>
  file.endsWith(".js")
);

if (commandFiles.length > 0)
  console.log(
    `${chalk.magenta(`[COMMANDS]:`)}`,
    chalk.blue("Found", commandFiles.length.toString(), "commands")
  );
else
  console.log(
    `${chalk.magenta(`[COMMANDS]:`)}`,
    chalk.red("No commands found")
  );

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);

  console.log(
    `${chalk.magenta(`[COMMANDS]:`)}`,
    chalk.green("Loaded command:", command.data.name)
  );
}

const eventFiles = readdirSync("src/events").filter((file) =>
  file.endsWith(".js")
);

if (eventFiles.length > 0)
  console.log(
    `${chalk.magenta(`[EVENTS]:`)}`,
    chalk.blue("Found", eventFiles.length.toString(), "events")
  );
else console.log(`${chalk.magenta(`[EVENTS]:`)}`, chalk.red("No events found"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once)
    client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));

  console.log(
    `${chalk.magenta(`[EVENTS]:`)}`,
    chalk.green("Loaded event:", event.name)
  );
}

client.on("ready", () => {
  console.log(
    `${chalk.magenta(`[CLIENT]:`)}`,
    chalk.green("Logged in as", client.user.tag, `(${client.user.id})`)
  );
  console.log(
    `${chalk.magenta(`[COMMANDS]:`)}`,
    chalk.blue("Registering commands")
  );

  axios
    .put(
      `https://discord.com/api/v10/applications/${client.user.id}/commands`,
      client.commands.map((command) => command.data.toJSON()),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      }
    )
    .then(() =>
      console.log(
        chalk.magenta(`[COMMANDS]:`),
        chalk.green(`Succesfully commands registered.`)
      )
    )
    .catch((error) =>
      console.log(
        `${
          (chalk.magenta(`[COMMANDS]:`),
          chalk.red(`Error while registering commands:\n${error.message}`))
        }`
      )
    );
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand() || interaction.isContextMenuCommand()) {
    console.log(
        `${chalk.magenta(`[COMMANDS]:`)}`,
        chalk.green("Command", interaction.commandName, "executed by", interaction.user.tag)
        );
        

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.log(
        `${chalk.magenta(`[COMMANDS]:`)}`,
        chalk.red("Command", interaction.commandName, "not found")
      );

      return interaction.reply({
        content: localize(interaction.locale, "NOT_FOUND", "Command"),
        ephemeral: true,
      });
    }

    if (
      command.category === "Developer" &&
      !developerIds.includes(interaction.user.id)
    ) {
      console.log(
        `${chalk.magenta(`[COMMANDS]:`)}`,
        chalk.red("Command", interaction.commandName, "is developer only")
      );
      return interaction.reply({
        content: localize(interaction.locale, "DEVELOPER_ONLY"),
        ephemeral: true,
      });
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.log(
        `${chalk.magenta(`[COMMANDS]:`)}`,
        chalk.red(
          "Error while executing command:",
          `${error.message}\n`,
          error.stack
        )
      );
      return interaction
        .reply({
          content: localize(
            interaction.locale,
            "COMMAND_ERROR",
            "command",
            error.message
          ),
          ephemeral: true,
        })
        .catch(() =>
          interaction.editReply({
            content: localize(
              interaction.locale,
              "COMMAND_ERROR",
              "command",
              error.message
            ),
          })
        );
    }
  } else if (interaction.isMessageComponent()) {
    console.log(
      `${chalk.magenta(`[COMMANDS]:`)}`,
      chalk.green(
        "Received message component",
        interaction.customId,
        "from",
        interaction.guild
          ? `${interaction.guild.name} (${interaction.guild.id})`
          : "DMs",
        "by",
        `${interaction.user.tag} (${interaction.user.id})`
      )
    );
    try {
      switch (interaction.customId) {
        default: {
            console.log(
                `${chalk.magenta(`[COMMANDS]:`)}`,
                chalk.red("Message component", interaction.customId, "not found")
                );


          return interaction.reply({
            content: localize(
              interaction.locale,
              "NOT_FOUND",
              "Message component"
            ),
            ephemeral: true,
          });
        }
      }
    } catch (error) {
        console.log(
            `${chalk.magenta(`[COMMANDS]:`)}`,
            chalk.red(
                "Error while executing message component:",
                `${error.message}\n`,
                error.stack
                )
            );


      return interaction
        .reply({
          content: localize(
            interaction.locale,
            "COMMAND_ERROR",
            "message component",
            error.message
          ),
          ephemeral: true,
        })
        .catch(() =>
          interaction.editReply({
            content: localize(
              interaction.locale,
              "COMMAND_ERROR",
              "message component",
              error.message
            ),
          })
        );
    }
  } else if (interaction.isModalSubmit()) {
    console.log(
        `${chalk.magenta(`[COMMANDS]:`)}`,
        chalk.green(
            "Received modal submit",
            interaction.customId,
            "from",
            interaction.guild
            ? `${interaction.guild.name} (${interaction.guild.id})`
            : "DMs",
            "by",
            `${interaction.user.tag} (${interaction.user.id})`
            )

        );


    try {
      switch (interaction.customId) {
        default: {
            console.log(
                `${chalk.magenta(`[MODAL]:`)}`,
                chalk.red("Modal", interaction.customId, "not found")
                );


          return interaction.reply({
            content: localize(interaction.locale, "NOT_FOUND", "Modal"),
            ephemeral: true,
          });
        }
      }
    } catch (error) {
        console.log(
            `${chalk.magenta(`[MODAL]:`)}`,
            chalk.red(
                "Error while executing modal:",
                `${error.message}\n`,
                error.stack
                )
            );

      return interaction
        .reply({
          content: localize(
            interaction.locale,
            "COMMAND_ERROR",
            "modal",
            error.message
          ),
          ephemeral: true,
        })
        .catch(() =>
          interaction.editReply({
            content: localize(
              interaction.locale,
              "COMMAND_ERROR",
              "modal",
              error.message
            ),
          })
        );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
