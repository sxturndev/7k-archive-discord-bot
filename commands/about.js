const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("About the server."),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#04171E")
      .setTitle("About 7k archive hub")
      .setDescription(
        "This server was created to be both a starting point for new players as well as a helpful \
      and vital resource that can be used by the wider 7K community. Through the archiving of tools, maps/packs, \
      and skins, we provide one centralized space for players to collaberate and use these resources. \
      With help from the community, we can grow our server and keep the 7K community alive and thriving."
      )
      .addFields({
        name: "\u200b",
        value: `All downloadable resources and tools are stored on the 7k archive server: https://discord.gg/e6FXqa9dJV
        
        If you're new or have any maps/resources to share, please have a look at these channels:
        <#1039278509161468005>
        <#948307684166344734>
        <#1039278577272750240>
        
        The 7k archive bot has slash commands available to easily retrieve resources as well:
        \`/packs {coro, beginner, converts, etc.}\`
        
        \`/guides {improvement}\`
        
        \`/tools {converters, mapping}\`
        
        Feel free to post feedback or suggestions here: <#943661578207776808>`,
      })
      .setFooter({
        text: "Bot created by sadistik#7060 • If you'd like to contribute please DM.",
      });

    return interaction.reply({ embeds: [embed] });
  },
};
