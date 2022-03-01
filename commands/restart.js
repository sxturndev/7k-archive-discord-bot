const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Attempts to restart the discord bot."),
  async execute(interaction) {
    const hasPerms = interaction.member.permissions.has("ADMINISTRATOR");

    if (!hasPerms) {
      return interaction.reply({
        content: "You don't have permission to do this!",
        ephemeral: true,
      });
    }
    await interaction.reply({
      content: "Killing process, bot should automatically restart...",
      ephemeral: true,
    });
    interaction.client.destroy();
    console.log("client destroyed");
    // force exit
    process.exit();
  },
};
