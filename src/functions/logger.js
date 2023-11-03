const chalk = require("chalk");

const defaultVariable = chalk.gray.bold(
  `[${new Date().toLocaleDateString()}]:`,
);

module.exports = {
  info: ({ type, message }) => {
    console.log(
      `${defaultVariable} ${chalk.blue.bold(`[${type}]:`)} ${chalk.blue(
        message,
      )}`,
    );
  },
  error: ({ type, message }) => {
    console.log(
      `${defaultVariable} ${chalk.red.bold(`[${type}]:`)} ${chalk.red(
        message,
      )}`,
    );
  },
  success: ({ type, message }) => {
    console.log(
      `${defaultVariable} ${chalk.green.bold(`[${type}]:`)} ${chalk.green(
        message,
      )}`,
    );
  },
  warn: ({ type, message }) => {
    console.log(
      `${defaultVariable} ${chalk.yellow.bold(`[${type}]:`)} ${chalk.yellow(
        message,
      )}`,
    );
  },
  debug: ({ type, message }) => {
    console.log(
      `${defaultVariable} ${chalk.magenta.bold(`[${type}]:`)} ${chalk.magenta(
        message,
      )}`,
    );
  },
};
