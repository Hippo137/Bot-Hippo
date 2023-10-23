const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Receive a link to a document')
        .addStringOption
        (option =>
            option.setName('topic')
            .setDescription('Choose the document you want to receive')
            .setRequired(true)
            .addChoice('ntnt', 'ntnt')
            .addChoice('tickets', 'tickets')
            .addChoice('winners', 'winners')
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
    //if (!g.allowed(interaction, 0)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let topic = interaction.options.getString('topic');
    let message = '';
    switch (topic)
    {
        case 'ntnt': message = 'NTNT means “No Talk No Trade” and is a Catan variant.\nCheck out more information about it in this small document: <http://tiny.cc/NTNT>'; break;
        case 'tickets': message = 'Check the following link to see how many Cash Tournament Tickets you have: <http://tiny.cc/CashTicketsStash>'; break;
        case 'winners': message = 'Check the following link to see the leaderboard for tournament winners: <http://tiny.cc/CCWinners>'; break;
    }
    
    interaction.editReply(message).catch(console.error);

    success = true;
}