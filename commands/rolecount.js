const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolecount')
        .setDescription('Gets the total number of roles in this guild.'),

    async execute(interaction)
    {
        await interaction.deferReply();
        //if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        await interaction.guild.roles.fetch().then( async () =>
        {
            const count = interaction.guild.roles.cache.size;
            await interaction.editReply(`There ${count==1?'is 1 role':`are ${count} roles`} in this guild.`).catch(console.error); //error handling in case the message was manually removed in the meantime
            //log(interaction);
        });
        
        
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}