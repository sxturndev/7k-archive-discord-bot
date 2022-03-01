const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("quick.db");
const channels = new db.table('channels');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channel")
    .setDescription(
      "Set channels for the bot."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("feed")
        .setDescription(
          "Set the channel where the mania Ranked/Loved map feed will go."
        )
    ),
  async execute(interaction) {
    const channelId = interaction.channel.id;
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "You don't have permission to do this!",
        empheral: true,
      });
    }

    if (interaction.options.getSubcommand() === 'feed') {
      if (!channels.get("feed_channel")) {
        channels.set("feed_channel", "");
      }
      if (channels.get("feed_channel") == channelId) {
        return interaction.reply({
          content: "Feed channel already set here.",
        });
      }

      channels.set("feed_channel", channelId);
      return interaction.reply(
        `Set feed channel to ${interaction.channel}\nID: ${channelId}`
      );
    }
  },
};
