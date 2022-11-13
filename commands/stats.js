const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Replies with bot stats/usage statistics."),
  async execute(interaction) {
    const bot = interaction.client;
    const duration = humanizeDuration(bot.uptime, { largest: 3 });

    const memoryData = process.memoryUsage().heapUsed / 1024 / 1024;
    const memoryUsage = Math.round(memoryData * 100) / 100;

    const embed = new MessageEmbed()
      .setTitle(`${bot.user.tag} usage stats.`)
      .setColor("#0099ff")
      .setDescription(
        "[Github](https://github.com/sxturndev/7k-archive-discord-bot)"
      )
      .setThumbnail(bot.user.displayAvatarURL())
      .setFields(
        { name: "**Resource Usage**", value: `~${memoryUsage}MB` },
        { name: "**Uptime**", value: `${duration}` }
      )
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL,
      })
      .setTimestamp();
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
