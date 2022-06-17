const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolelist')
        .setDescription('Receive a list of members of a given role')
        .addRoleOption
        (option =>
            option.setName('rolelist')
            .setDescription('Select a role')
            .setRequired(true)
        ),

    async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        const roleToSearch = interaction.options.getRole('rolelist');
        
        await interaction.guild.members.fetch();
        const membersWithRole = roleToSearch.members.size;
        
        await interaction.editReply(`${membersWithRole} Member${roleToSearch.members.size==1?'':'s'} with the role: ${roleToSearch.name}`);
        let messageToWrite = '';

        
        //await interaction.guild.fetch().then(g => g.roles.fetch().then(r => r.find(role => role.id === roleToSearch.id).members.forEach(member => messageToWrite += `\n${member.user.tag}`)))
        await roleToSearch.members.forEach(async (member) =>
        {
            if (messageToWrite.length + member.user.tag.length > 1990)
            {
                await interaction.channel.send(`\`${messageToWrite}\``);
                messageToWrite = '';
            }
            messageToWrite += `${member.user.tag}\n`
            
        });
        if (messageToWrite.length > 0) await interaction.channel.send(`\`${messageToWrite}\``);
        
        log(interaction);
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}