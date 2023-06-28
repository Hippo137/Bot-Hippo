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
    //if (!g.allowed(interaction, 0)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let message = 'NTNT means “No Talk No Trade” and is a Catan variant.\nCheck out more information about it in this small document: <http://tiny.cc/NTNT>'
    interaction.editReply(message).catch(console.error);

    success = true;
}