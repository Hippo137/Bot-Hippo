const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tickets')
		.setDescription('Check your number of Cash Tournament Tickets'),
    
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
    let message = 'Check the following link to see how many Cash Tournament Tickets you have: <http://tiny.cc/CashTicketsStash>'
    interaction.editReply(message).catch(console.error);

    success = true;
}