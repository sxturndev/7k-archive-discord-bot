require("dotenv").config();
const logChannel = process.env.LOG_CHANNEL;
const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const humanizeDuration = require("humanize-duration");

module.exports = {
  name: "guildMemberAdd",
  execute(member, client) {
    const user = member.user;
    const embed = new MessageEmbed()
      .setTitle(`${user.username} just joined the server.`)
      .setColor("#0099ff")
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "**Discord Tag**", value: user.tag, inline: true },
        { name: "**Discord ID**", value: user.id, inline: true },
        {
          name: "**Avatar URL**",
          value: `[Link](${user.displayAvatarURL({
            size: 2048,
            dynamic: true,
          })})`,
        },
        {
          name: "**Creation Date**",
          value: dayjs(user.createdAt).format("MMMM D, YYYY h:mm A"),
          inline: true,
        },
        {
          name: "**Created**",
          value: `${humanizeDuration(Date.now() - user.createdTimestamp, {
            largest: 4,
          })} ago`,
          inline: true,
        },
        {
          name: "**Join Date**",
          value: dayjs(member.joinedAt).format("MMMM D, YYYY h:mm A"),
        }
      )
      .setTimestamp();

    const channel = client.channels.cache.get(logChannel);
    channel.send({ embeds: [embed] });
  },
};
