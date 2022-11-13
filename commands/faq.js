const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Frequently asked questions")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("patterns")
        .setDescription("Returns an image of the VSRG pattern glossary.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("terms")
        .setDescription("Common terms used throughout the community.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("bms").setDescription("Information about BMS.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("o2jam").setDescription("Information about o2jam.")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "patterns") {
      const attachment = new MessageAttachment("./images/patterns.png");

      const embed = new MessageEmbed()
        .setColor("#ff9500")
        .setImage("attachment://patterns.png");

      return interaction.reply({ embeds: [embed], files: [attachment] });
    }

    if (interaction.options.getSubcommand() === "terms") {
      const embed = new MessageEmbed()
        .setTitle("Common Terms")
        .setColor("#ff9500")
        .addFields(
          {
            name: "\u200b",
            value:
              "**Chart/Beatmap** - Refers to the file that you play when you select a song and difficulty.\n\n\
          **ET** - Originated from o2jam, ET, or extraterrestrial, is someone who is a very good player or \"out of this world\".\n\n\
          **Dan** - A course or set of maps (usually 4) assembled in a gauntlet-like fashion. Typically it will focus on a variety of skillsets. \
          Dans are an overall test of your skill, if you clear a dan course then that means you're at that dan rank. For osu!mania, a 'pass' would be 96% \
          accuracy on one of these courses.",
          },
          {
            name: "\u200b",
            value:
              "**Percy LN** - Named after the player Percyqaz, percy LN or just percy are long notes that have have been visually altered to \
        appear shorter in length. Usually by fading or cutting off the tail of the long note. Its purpose is to try to make reading \
        long notes easier. Percy LN are controversial in the community and is often considered cheating. More info: \
        https://github.com/ppy/osu/discussions/20576#discussioncomment-3938241\n\n\
        **VSRG** - Acronym for Vertical Scrolling Rythm Game. Examples: Quaver, LR2 (Lunatic Rave 2), beatoraja, Beatmania IIDX, \
        o2jam, Etterna, Stepmania, SVDX (Sound Voltex), etc.",
          }
        )
        .setFooter({
          text: "Also see: /faq patterns • Feel free to contribute terms.",
        })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "bms") {
      const embed = new MessageEmbed()
        .setTitle("BMS FAQ")
        .setDescription("https://news.keysounds.net/terminology")
        .setColor("#ff9500")
        .addFields(
          {
            name: "**What is BMS?**",
            value:
              "BMS, short for Be-Music Source, is a file format created by Urao Yane and NBK in 1998 for use in the game BM98; \
            a simulator of Beatmania by KONAMI. Typically when people talk about BMS they are referring to the entire community \
            and the content within it, as BMS is originally just a file format. Now however a lot of people make the assumption that \
            BMS automatically refers to LunaticRave2, a popular BMS player. In a context for osu!mania, this generally refers to \
            converted BMS files and 'rice' heavy maps. See: `/faq patterns`",
          },
          {
            name: "**BMS Players?**",
            value:
              "While most people would assume this refers to the people who play BMS, it also refers to the software used to play BMS; \
            Games capable of playing BMS / BME / BML / PMS charts. The most popular are LunaticRave2 and beatoraja, both have their pros \
            and cons. Guides are available for setting them up if you'd like to check them out: `/guides lr2` and `/guides beatoraja`",
          },
          {
            name: "__**Other Important Terms**__",
            value:
              "**SP / DP** - SP is short for Single Play, which refers to charts that use 5 or 7 keys and a single turntable. \
            DP is short for Double Play, which refers to charts that use 10 or 14 keys and two turntables. \n\n\
            **Dan** - Not the english name 'Dan', however it is the word for the grading system. Similar to karate belts, where you go from \
            the lowest dan to the highest dan. You might see players say they are e.g. '7th dan' or 'Kaiden', this is the highest \
            段位認定 (Daninintei) course they have cleared.",
          },
          {
            name: "**Converts**",
            value:
              "If you're looking for BMS converts for osu! then please use `/packs converts`",
          }
        )
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "o2jam") {
      const embed = new MessageEmbed()
        .setTitle("O2JAM FAQ")
        .setColor("#ff9500")
        .addFields(
          {
            name: "**What is O2Jam?**",
            value:
              "O2Jam is an online rhythm game developed in South Korea by O2Media. The earliest release was in 2005 but is still \
            played by a handful of players today. Unlike BMS, O2Jam is a 7k (no scratch) game that primarily focuses on long notes. O2Jam \
            is known to have a very lenient judgement, which determines how accurately you have to hit notes. Compared to other rhythm games, \
            what is defined as a full accuracy play in O2Jam may only translate to 75% accuracy in games like LR2. Playing O2Jam is recommended \
            if you want to learn a wide range of long note patterns. Guides for O2Jam are available here: `/guides o2jam`",
          },
          {
            name: "**Servers**",
            value: "O2Jam has public and private servers. The most popular international server is DMJAM, however it's invite only and you'll \
            have to find someone to vouch for you. If you're new, it's recommended to join C2Jam, a popular and public international server: \
            https://discord.gg/3fTWaWx",
          }
        )
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
