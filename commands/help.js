const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows how to use the bot')
        //.setDefaultPermission(false)
        .addStringOption
        (option =>
            option.setName('topic')
            .setDescription('Choose what you need help with. Omitting this gives a general overview over the available commands.')
            .setRequired(false)
            .addChoice('clear', 'Clear')
            .addChoice('createrole', 'Createrole')
            .addChoice('createtournament', 'Createtournament')
            .addChoice('help', 'Help')
            .addChoice('ping', 'Ping')
            .addChoice('rockpaperscissors', 'Rockpaperscissors')
            .addChoice('role', 'Role')
            .addChoice('tablespam', 'Tablespam')
        ),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command. Other than rockpaperscissors (RPS), you can’t do anything with this bot. And the RPS command is pretty straightforward I guess.').catch(console.error);
        
        await interaction.editReply(fs.readFileSync(`txt/help${interaction.options.getString('topic') ?? 'General'}.txt`, 'utf8')).catch(console.error); //error handling in case the message was manually removed in the meantime
        
        const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
        botLogChannel.send(`${interaction.member} used ${interaction.commandName}: https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
    }
}