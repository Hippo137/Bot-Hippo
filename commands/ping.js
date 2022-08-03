const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong'),
	async execute(interaction) {
		await interaction.deferReply();
        let message = 'Pong!'
        let random = Math.floor(Math.random()*1000);
        if (random == 0) message = 'POOOOOOONNNGGGGGG!!!!!';
        else if (random < 10) message = 'PONG!';
        else if (random < 20) message = 'Ping?';
        await interaction.editReply(message).catch(console.error);
        
        log(interaction);
	}
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}