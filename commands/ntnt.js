const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ntnt')
		.setDescription('Explains NTNT'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        
        g.log(interaction, command(interaction));
	}
}
    
function command(interaction)
{
    let message = 'NTNT means “No Trades No Talk” and is a Catan variant.\nCheck out more information about it in this small document: <http://tiny.cc/NTNT>'
    interaction.editReply(message).catch(console.error);

    return true;
}