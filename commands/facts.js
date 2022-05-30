const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

let repeats = new Array(10) //10 consecutive facts must be different from each other

module.exports = {
	data: new SlashCommandBuilder()
		.setName('facts')
		.setDescription('Returns a random fact'),
	async execute(interaction) {
		await interaction.deferReply();
        let facts = fs.readFileSync(`txt/facts.txt`, 'utf8').split('\n')
        let r
        do
        {
            r = Math.floor(Math.random()*facts.length);
        }
        while (repeats.includes(r));
        repeats.shift();
        repeats.push(r);
        interaction.editReply(facts[r]).catch(console.error);
        log(interaction);
	}
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}