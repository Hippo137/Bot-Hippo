const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ntnt')
		.setDescription('Explains NTNT'),
    
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
    let message = 'NTNT means “No Trades No Talk” and is a Catan variant.\nCheck out more information about it in this small document: <http://tiny.cc/NTNT>'
    interaction.editReply(message).catch(console.error);

    success = true;
}