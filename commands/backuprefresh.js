const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backuprefresh')
        .setDescription('Removes the Back Up Hero role for everyone'),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        //interaction.channel.send('0');
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        await interaction.guild.members.fetch();
        const role = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero');
        //interaction.guild.roles.create({name: role.name, color: role.color, hoist: role.hoist, position: role.position, permissions: role.permissions, mentionable: role.mentionable});
        //role.delete();
        //console.log(role);
        await role.members.forEach(member => member.roles.remove(role));
        
        
        await interaction.editReply('Successfully refreshed the Back Up Hero role.').catch(console.error); //error handling in case the message was manually removed in the meantime
        
        log(interaction);
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}
    https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}