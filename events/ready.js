require('dotenv').config();
const guildId = process.env.GUILD_ID;

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`Logged in as ${client.user.tag}.`);

        const guild = client.guilds.cache.get(guildId);
        const userCount = guild.memberCount;
        console.log(`${userCount} users are in the guild. Setting presence.`);
        
        (function setPresence() {
            client.user.setPresence({
                status: 'online',
                activities: [{
                    name: `${userCount} users`,
                    type: 'WATCHING',
                }],
            });
            setTimeout(setPresence, 1000 * 60 * 5);
        })();
	},
};