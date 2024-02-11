const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolewinner')
		.setDescription('Used to handle the weekly winner role – change the winner(s), the name or both')
        .addStringOption
        (option =>
            option.setName('name')
            .setDescription('Select a new name for the role')
            .setRequired(false)
        )
        .addUserOption
        (option =>
            option.setName('user1')
            .setDescription('Select a user')
            .setRequired(false)
        )
        .addUserOption
        (option =>
            option.setName('user2')
            .setDescription('Select a user')
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
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');
    
    if (!name && !user1 && !user2) return interaction.editReply(`You need to provide a name or a user or both.`).catch(console.error);
    
    interaction.guild.members.fetch();
    let role = interaction.guild.roles.cache.get('1081074925567217675'); //CC
    //let role = interaction.guild.roles.cache.get('1206368587598790856'); //W9
    if (!role) return interaction.editReply('The role was not found.').catch(console.error);
    if (name)
    {
        role.edit({name: name});
        message += `\nChanged the name of the role to ‘${name}’.`;
    }
    
    let roleTournamentWinner;
    if (user1 || user2)
    {
        role.members.forEach(member => member.roles.remove(role)); //remove weekly winner role from everybody if a new winner was set
        roleTournamentWinner = interaction.guild.roles.cache.find(role => role.name === 'Tournament Winner');
    }
    if (user1)
    {
        interaction.guild.members.cache.get(user1.id).roles.add([role, roleTournamentWinner]);
        message += `\nGave ${user1} the role ${role}.`;
    }
    if (user2)
    {
        interaction.guild.members.cache.get(user2.id).roles.add([role, roleTournamentWinner]);
        message += `\nGave ${user2} the role ${role}.`;
    }
    
    interaction.editReply(`${message}`).catch(console.error);
    
    success = true;
}