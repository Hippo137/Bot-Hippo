const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reboot')
		.setDescription('Logs out the bot'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        await g.log(interaction, success);
        
        if (success) interaction.client.destroy();
	}
}
    
function command(interaction)
{        
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    }
    interaction.editReply(`Rebooting...`).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    success = true;
}