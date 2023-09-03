const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolewinner')
		.setDescription('Used to handle the weekly winner role – change the winner, the name or both')
        .addUserOption
        (option =>
            option.setName('user')
            .setDescription('Select a user')
            .setRequired(false)
        )
        .addStringOption
        (option =>
            option.setName('name')
            .setDescription('Select a new name for the role')
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
    
function command(interaction)
{
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let message = ``;
    
    const name = interaction.options.getString('name');
    const user = interaction.options.getUser('user');
    
    if (!name && !user) return interaction.editReply(`You need to provide a name or a user or both.`).catch(console.error);
    
    interaction.guild.members.fetch();
    let role = interaction.guild.roles.cache.get('1081074925567217675');
    if (!role) return interaction.editReply('The role was not found').catch(console.error);
    if (name)
    {
        role.edit({name: name});
        message += `\nChanged the name of the role to ${name}.`;
    }
    if (user)
    {
        role.members.forEach(member => member.roles.remove(role));
        interaction.guild.members.cache.get(user.id).roles.add(role);
        message += `\nGave ${user} the role ${role}.`;
    }
    
    interaction.editReply(`${message}`).catch(console.error);
    
    success = true;
}