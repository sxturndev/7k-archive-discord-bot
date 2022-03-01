require("dotenv").config();
const dayjs = require("dayjs");
const db = require("quick.db");
const osu = require("node-osu");
const { MessageEmbed } = require("discord.js");
const osuKey = process.env.OSU_API;
const osuApi = new osu.Api(osuKey);
const pushedBeatmaps = new db.table("pushedBeatmaps");
const feedChannel = new db.table('channels').get("feed_channel");

// Convert seconds to MM:SS
function convertSeconds(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

// Check whether beatmap set is in database and if it's Ranked or Loved, then send the map.
function checkBeatmap(beatmap, client) {
  const setId = beatmap.beatmapSetId;
  if (!pushedBeatmaps.has(setId)) {
    if (
      beatmap.approvalStatus == "Ranked" ||
      beatmap.approvalStatus == "Loved"
    ) {
      sendNewMap(setId, client);
      pushedBeatmaps.set(setId, "");
    }
  }
}

// Pull most recent mania beatmaps from the last day.
function pullMaps(client) {
  const date = String(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
  osuApi
    .getBeatmaps({
      m: 3,
      since: date,
    })
    .then((beatmaps) => {
      beatmaps.forEach((beatmap) => {
        checkBeatmap(beatmap, client);
      });
    });
}

// Function for sending a map to the feeds channel.
function sendNewMap(setId, client) {
  const channel = client.channels.cache.get(feedChannel);
  let mapEmbed = new MessageEmbed();
  let has6kplus = false;

  osuApi
    .getBeatmaps({
      s: setId,
      m: 3,
    })
    .then((diffs) => {
      const title = diffs[0].title;
      const artist = diffs[0].artist;
      const creator = diffs[0].creator;
      const length = convertSeconds(diffs[0].length.total);

      mapEmbed.setTitle(`${artist} - ${title}`);
      diffs[0].approvalStatus == "Ranked"
        ? mapEmbed.setColor("#0099E1")
        : mapEmbed.setColor("#FD0061");
      mapEmbed.setAuthor({
        name: `New ${diffs[0].approvalStatus} map by ${creator}.`,
      });
      mapEmbed.setURL(`https://osu.ppy.sh/s/${setId}`);
      mapEmbed.setImage(
        `https://assets.ppy.sh/beatmaps/${setId}/covers/cover.jpg`
      );
      let desc = `\`Length: ${length}\`\n[\`Download\`](https://osu.ppy.sh/d/${setId})\n\n`;
      diffs.forEach((diff) => {
        const keys = diff.difficulty.size;
        if (keys >= 6) {
          has6kplus = true;
        }
        const stars = `${diff.difficulty.rating.slice(0, -3)}★`;
        const version = diff.version;
        desc += `\`[${keys}k] ${stars}\` [\`${version}\`](https://osu.ppy.sh/b/${diff.id})\n`;
      });
      mapEmbed.setDescription(desc);
      mapEmbed.setFooter({
        text: diffs[0].raw_approvedDate,
      });
      if (has6kplus == false) {
        return;
      }
      channel.send({
        embeds: [mapEmbed],
      });
    })
    .catch((err) => console.error(err));
}

module.exports.pullMaps = pullMaps;
