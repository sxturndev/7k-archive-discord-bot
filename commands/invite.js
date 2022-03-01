require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const inviteLink = process.env.INVITE;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Posts the invite link to the server.'),
	async execute(interaction) {
		inviteLink ? interaction.reply(`Invite link: ${inviteLink}`) : interaction.reply('Invite link not set.');
	},
};
