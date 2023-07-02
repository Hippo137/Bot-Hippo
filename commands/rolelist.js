const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolelist')
        .setDescription('Receive a list of members of a given role')
        .addRoleOption
        (option =>
            option.setName('role')
            .setDescription('Select a role')
            .setRequired(true)
        )
        .addBooleanOption
        (option =>
            option.setName('id')
            .setDescription('false=only names, true=names and IDs')
            .setRequired(false)
        ),
        
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}

async function command(interaction, dbMessage)
{
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    await interaction.guild.members.fetch();
    
    const roleToSearch = interaction.options.getRole('role');

    let membersWithRole = roleToSearch.members; //saved in case the role is deleted before the members are transferred...

    interaction.editReply(`${membersWithRole.size} Member${membersWithRole.size==1?'':'s'} with the role: ${roleToSearch.name}`);
    let messageToWrite = '';
    
    const withID = interaction.options.getBoolean('id') ?? false;
    
    membersWithRole.forEach(member =>
    {
        if (messageToWrite.length + member.user.tag.length + member.user.id.length > 1950)
        {
            interaction.channel.send(`\`${messageToWrite}\``);
            if (withID) messageToWrite = `${member.user.tag};${member.user.id}\n`;
            else messageToWrite = `${member.user.tag}\n`;
        }
        else if (withID) messageToWrite += `${member.user.tag};${member.user.id}\n`;
        else messageToWrite += `${member.user.tag}\n`;

    });

    if (messageToWrite.length > 0) interaction.channel.send(`\`${messageToWrite}\``);
    
    success = true;
}