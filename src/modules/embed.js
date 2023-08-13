const { EmbedBuilder } = require("discord.js");

module.exports = class EmbedMaker extends EmbedBuilder {
    
    /**
     * 
     * @param {*} client 
     */

    constructor(client) {
        super();
        this.setColor('Yellow');
        this.setFooter({text: `Embed Footer`, iconURL: client.user.avatarURL({dynamic: true})});
    };
};