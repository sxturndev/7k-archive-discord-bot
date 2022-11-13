require("dotenv").config();
const logChannel = process.env.LOG_CHANNEL;
const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");

module.exports = {
  name: "guildMemberRemove",
  execute(member, client) {
    const user = member.user;
    const embed = new MessageEmbed()
      .setTitle(
        `${user.username} just left the server.  We now have ${member.guild.memberCount} members.`
      )
      .setColor("RED")
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "**Discord Tag**", value: user.tag, inline: true },
        { name: "**Discord ID**", value: user.id, inline: true },
        { name: "**Leave Date**", value: dayjs().format("MMMM D, YYYY h:mm A") }
      )
      .setTimestamp();

    const channel = client.channels.cache.get(logChannel);
    channel.send({ embeds: [embed] });
  },
};
