const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('database')
		.setDescription('test'),
	async execute(interaction) {
		await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        dbGet(interaction, 'sType');
        dbSet(interaction, 'sType', 'Cash');
        //dbSet(interaction, 'sRound', 1);
        
        interaction.editReply('Done');
        
        
        interaction.editReply(`Database


sType: Cash
sMode: Base
zMode: +
sMap: Base
zMap: +
sPlayers: 4
zPlayers: +
sSpeed: Normal
zSpeed: -
sDice: Random Dice
zDice: +
sVp: 10
zVp: +
sRobber: No
zRobber: +
sRounds: 3
sRound: 4
sBox: 1
sDayfinal: No
sPrize: Cash Ticket
sDiscard: 7
zDiscard: +
corrupted: False
sRandom: No
sTables: 10
sBrackets: 1
sLoserfinals: Yes
sTeamsize: 1`);
	}
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}

async function dbGet(interaction, type)
{
    let message = await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE).then(msg => msg.content);
    
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
    await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE).then(msg =>
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
    //await m.fetch(process.env.DATABASE).then(msg => msg.edit(message));
    //console.log(`${type}: ${message}`);