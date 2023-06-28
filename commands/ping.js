const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong'),
    
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
    
    let message = 'Pong!';
    let random = Math.floor(Math.random()*1000);
    if (random == 0) message = 'POOOOOOONNNGGGGGG!!!!!';
    else if (random < 10) message = 'PONG!';
    else if (random < 20) message = 'Ping?';
    interaction.editReply(message).catch(console.error);
    
    success = true;
}