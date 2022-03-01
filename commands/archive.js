const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Archives a channel."),
  async execute(interaction) {
    const channel = interaction.channel;
    const hasPerms = interaction.member.permissions.has("ADMINISTRATOR");
    if (!hasPerms)
      return interaction.reply({
        content: "You do not have permission to do this!",
        ephemeral: true,
      });
    interaction
      .reply("Are you sure you want to archive this channel?")
      .then(() => {
        const filter = (m) => interaction.user.id == m.author.id;
        interaction.channel
          .awaitMessages({ filter, time: 15000, max: 1, errors: ["time"] })
          .then((message) => {
            if (message.first().content.toLowerCase() === "yes") {
              channel.permissionOverwrites
                .edit(channel.guild.roles.everyone, { VIEW_CHANNEL: false })
                .catch(err => console.error(err));
              interaction.followUp("Archived this channel.");
            } else if (message.first().content.toLowerCase() === "no") {
              interaction.followUp("Cancelled.");
            }
          })
          .catch(() => {
            interaction.followUp(
              "You didn't answer in time, please respond with 'yes'. Cancelled."
            );
          });
      });
  },
};
