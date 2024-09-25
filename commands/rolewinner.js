const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolewinner')
		.setDescription('Used to handle the weekly winner role – change the winner(s), the name or both')
        .addIntegerOption
        (option =>
            option.setName('mode')
            .setDescription('Select which role you want to set')
            .setRequired(true)
            .addChoice('Base', 0)
            .addChoice('CK', 1)
        )
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
    
    const mode = interaction.options.getInteger('mode');
    const name = interaction.options.getString('name');
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');
    
    //if (!name && !user1 && !user2) return interaction.editReply(`You need to provide a name or a user or both.`).catch(console.error);
    
    interaction.guild.members.fetch();
    let role = [interaction.guild.roles.cache.get('1081074925567217675'), interaction.guild.roles.cache.get('1282782231638573129')]; //CC
    //let role = [interaction.guild.roles.cache.get('1175889676314365992'), interaction.guild.roles.cache.get('1282776301966590077')]; //W9
    if (!role[0] || !role[1]) return interaction.editReply('At least one of the two roles was not found.').catch(console.error);
    if (name)
    {
        role[mode].edit({name: name});
        message += `\nChanged the name of the role to: ${name}`;
    }
    
    let roleTournamentWinner;
    if (user1 || user2)
    {
        role[mode].members.forEach(member => member.roles.remove(role[mode])); //remove weekly winner role from everybody if a new winner was set
        roleTournamentWinner = interaction.guild.roles.cache.find(role => role.name === 'Tournament Winner');
    }
    if (user1)
    {
        interaction.guild.members.cache.get(user1.id).roles.add([role[mode], roleTournamentWinner]);
        message += `\nGave ${user1} the role ${role[mode]}.`;
    }
    if (user2)
    {
        interaction.guild.members.cache.get(user2.id).roles.add([role[mode], roleTournamentWinner]);
        message += `\nGave ${user2} the role ${role[mode]}.`;
    }
    //console.log(role[0].position, role[1].position)
    if (role[mode].position < role[1-mode].position)
    {
        role[1-mode].setPosition(role[mode].position); //move the changed role above the other one if it was lower
        message += `\nChanged the role order.`;
    }
    
    if (!message) message = 'Nothing changed.';
    //console.log(role[0].position, role[1].position)
    
    interaction.editReply(`${message}`).catch(console.error);
    
    success = true;
}