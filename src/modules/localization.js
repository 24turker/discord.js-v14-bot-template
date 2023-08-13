const locales = {
    'en-US': require('../i18n/en-US.js'),
    tr: require('../i18n/tr.js')
};

const chalk = require('chalk');

/**
 * 
 * @param {*} locale 
 * @param {*} id 
 * @param  {...any} params 
 * @returns 
 */
module.exports.localize = (locale, id, ...params) => {
    let localized = locales?.[locale]?.[id];

    if (!localized) {
        console.log(chalk.magenta(`[LOCALIZATION]:`), chalk.red(`Localization of`, id, `for`, locale, `not found`));

        localized = locales['en-US'][id];
    };
    if (!localized) {
        console.log(chalk.magenta(`[LOCALIZATION]:`), chalk.red(`Localization of`, id, `for`, 'en-US', `not found`));
        localized = 'Localization not found';
    };

    if (localized) if (params.length > 0) for (let i = 0; i < params.length; i++) {
        localized = localized.replace(`{{${i}}}`, params[i]);
    };

    return localized;
};

/**
 * @param {string} locale 
 * @returns {number}
 */
module.exports.getPercentage = (locale) => {
    let localeKeys = Object.keys(locales['en-US']);
    let percentage = 0;

    for (let key of localeKeys) {
        if (locales[locale]?.[key]) percentage++;
    };

    return Math.round(percentage / localeKeys.length * 100);
};