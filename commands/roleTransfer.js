const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roletransfer')
        .setDescription('Give all members with a role a different role and remove the original role')
        .addRoleOption
        (option =>
            option.setName('rolefrom')
            .setDescription('Select a role which should be removed.')
            .setRequired(true)
        )
        .addRoleOption
        (option =>
            option.setName('roleto')
            .setDescription('Select a role which should be given.')
            .setRequired(true)
        ),

    async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        
        const roleFrom = interaction.options.getRole('rolefrom');
        const roleTo = interaction.options.getRole('roleto');
        
        await interaction.guild.members.fetch();
        
        const roleMembers = roleFrom.members; //saved in case the role is deleted before the members are transferred...
        
        await roleMembers.forEach(member => member.roles.add(roleTo));
        await roleFrom.delete().catch(console.error);
        await interaction.editReply(`Successfully transfered role ‘${roleFrom.name}’ to ‘${roleTo.name}’.`);
        
        log(interaction);
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}