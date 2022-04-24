const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('database')
		.setDescription('test'),
	async execute(interaction) {
		await interaction.deferReply();
        
        //dbGet(interaction, 'sTeamsize');
        //dbSet(interaction, 'sBrackets', 2);
        dbSet(interaction, 'sRound', 1);
        
        interaction.editReply('Done');
	}
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}

async function dbGet(interaction, type)
{
    let message = await interaction.client.channels.cache.get('862422544652828713').messages.fetch('966432536236539945').then(msg => msg.content);
    
    let title = `\n${type}:`;
    let index = message.indexOf(title);
    if (index == -1) return console.log(`Type ${type} not found in the database`);
    index += title.length + 1;
    let endIndex = message.indexOf(`\n`, index);
    if (endIndex == -1) message = message.substring(index, message.length);
    else message = message.substring(index, endIndex);
    
    console.log(`${type}: ${message}`);
}

async function dbSet(interaction, type, newValue)
{
    await interaction.client.channels.cache.get('862422544652828713').messages.fetch('966432536236539945').then(msg =>
    {
        let message = msg.content;
        let title = `\n${type}:`;
        let index = message.indexOf(title);
        if (index == -1) return console.log(`Type ${type} not found in the database`);
        index += title.length + 1;
        let endIndex = message.indexOf(`\n`, index);
        if (endIndex == -1) message = `${message.substring(0, index)}${newValue}`;
        else message = `${message.substring(0, index)}${newValue}${message.substring(endIndex, message.length)}`;

        
        msg.edit(message);
    });
}
    //await m.fetch('966432536236539945').then(msg => msg.edit(message));
    //console.log(`${type}: ${message}`);