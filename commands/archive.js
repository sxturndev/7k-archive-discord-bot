require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const inviteLink = process.env.ARCHIVE;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('archive')
		.setDescription('Posts the invite link to the 7k archive resource server.'),
	async execute(interaction) {
		inviteLink ? interaction.reply(`7k archive resource server: ${inviteLink}`) : interaction.reply('Invite link not set.');
	},
};