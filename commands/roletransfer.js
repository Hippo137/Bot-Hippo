const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

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
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}

async function command(interaction, dbMessage)
{
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    }
    
    await interaction.guild.members.fetch();
    
    const roleFrom = interaction.options.getRole('rolefrom');
    const roleTo = interaction.options.getRole('roleto');
    if (roleFrom == roleTo)
    {
        return interaction.editReply('‘rolefrom’ must not equal ‘roleto’.').catch(console.error);
    }
    let roleMembers = roleFrom.members; //saved in case the role is deleted before the members are transferred...

    roleMembers.forEach(member => member.roles.add(roleTo).catch(console.error));
    roleFrom.delete();
    interaction.editReply(`Successfully transferred role ‘${roleFrom.name}’ to ‘${roleTo.name}’.`).catch(console.error);

    success = true;
}