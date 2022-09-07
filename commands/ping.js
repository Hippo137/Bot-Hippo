const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        
        g.log(interaction, command(interaction));
	}
}
    
function command(interaction)
{
    let message = 'Pong!'
    let random = Math.floor(Math.random()*1000);
    if (random == 0) message = 'POOOOOOONNNGGGGGG!!!!!';
    else if (random < 10) message = 'PONG!';
    else if (random < 20) message = 'Ping?';
    interaction.editReply(message).catch(console.error);

    return true;
}