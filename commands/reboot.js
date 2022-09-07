const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reboot')
		.setDescription('Logs out the bot'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        
        const success = await command(interaction);
        await g.log(interaction, success);
        
        if (success) interaction.client.destroy();
	}
}
    
function command(interaction)
{        
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        interaction.editReply('You are not allowed to use this command.').catch(console.error);
        return false;
    }
    interaction.editReply(`Rebooting...`).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    return true;
}