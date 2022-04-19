const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Receive a list of members of a given role ')
        .addRoleOption
        (option =>
            option.setName('role')
            .setDescription('Select a role')
            .setRequired(true)
        ),

    async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        const roleToSearch = interaction.options.getRole('role');
        
        let messageToWrite = `Members with the role: ${roleToSearch.name}\n`;

        await interaction.guild.members.fetch();
        //await interaction.guild.fetch().then(g => g.roles.fetch().then(r => r.find(role => role.id === roleToSearch.id).members.forEach(member => messageToWrite += `\n${member.user.tag}`)))
        await roleToSearch.members.forEach(member => messageToWrite += `\n${member.user.tag}`);
        await interaction.editReply(`\`${messageToWrite}\``);
        
        log(interaction);
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}
    https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}