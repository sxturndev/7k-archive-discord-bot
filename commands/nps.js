const { SlashCommandBuilder } = require("@discordjs/builders");
let http = require("https");
let fs = require("fs");
const { MessageAttachment } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nps")
    .setDescription(
      "(Disabled) Returns a nps graph and stats given a .osu file."
    ),
  async execute(interaction) {
    // Disable this because it's not finished yet
    return interaction.reply({
      content: "Disabled until finished.",
      ephemeral: true,
    });

    const channel = interaction.channel;

    function download(attachment) {
      if (!fs.existsSync("./downloads")) {
        fs.mkdirSync("./downloads");
      }
      const dest = `./downloads/${attachment.id}.osu`;
      const file = fs.createWriteStream(dest);
      const request = http.get(attachment.url, (response) => {
        response.pipe(file);
      });

      file.on("finish", () => {
        console.log("Finished downloading file.");
        file.close(showNPSGraph(dest)); // closes file and triggers callback
      });
      file.on("error", (err) => {
        console.error(err);
        fs.unlink(dest, () => {
          return interaction.followUp("There was an error with this file.");
        });
      });
      request.on("error", (err) => {
        console.error(err);
        fs.unlink(dest, () => {
          return interaction.followUp(
            "There was an error with downloading this file."
          );
        });
      });
    }

    function showNPSGraph(file) {
      // open file, calculate NPS/statistics
      // create graph using data with some npm package
      // send the image to the channel and delete temp files
      // const image = new MessageAttachment(fs.readFileSync(imageDest), 'graph.png');
      //   try {
      //     channel
      //       .send({ content: `NPS Graph for ${fileName}`, files: [Response] })
      //       .then(() => {
      //         fs.unlinkSync(file);
      //         fs.unlinkSync(imageDest);
      //       });
      //   } catch (err) {
      //     console.error(err);
      //   }
    }

    interaction
      .reply({ content: "Please upload a .osu file.", ephemeral: true })
      .then(() => {
        const filter = (m) => interaction.user.id === m.author.id;

        channel
          .awaitMessages({ filter, time: 30000, max: 1, errors: ["time"] })
          .then((messages) => {
            const message = messages.first();
            if (!message.attachments.first()) {
              return interaction.followUp({
                content: "You didn't upload a file, cancelling.",
                empheral: true,
              });
            }

            const fileExt = message.attachments.first().name.split(".").pop();
            const isOsuFile = fileExt === "osu";
            if (!isOsuFile) {
              return interaction.followUp({
                content: "You didn't provide a .osu file, cancelling.",
                empheral: true,
              });
            }
            download(message.attachments.first());
          })
          .catch((err) => {
            console.log(err);
            interaction.followUp("You didn't provide any input.");
          });
      });
  },
};
