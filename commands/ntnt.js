const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ntnt')
		.setDescription('Explains NTNT'),
	async execute(interaction) {
		await interaction.deferReply();
        let message = 'NTNT means “No Trades No Talk” and is a Catan variant.\nCheck out more information about it in this small document: <http://tiny.cc/NTNT>'
        await interaction.editReply(message).catch(console.error);
        
        log(interaction);
	}
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}