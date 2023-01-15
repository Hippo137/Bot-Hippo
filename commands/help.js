const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows how to use the bot')
        //.setDefaultPermission(false)
        .addStringOption
        (option =>
            option.setName('topic')
            .setDescription('Command to get help for. Omitting this gives a general overview over all commands. * = CC Team only')
            .setRequired(false)
            .addChoice('backuprefresh*', 'Backuprefresh')
            .addChoice('clear*', 'Clear')
            .addChoice('createtournament*', 'Createtournament')
            //.addChoice('endtournament*', 'Endtournament')
            .addChoice('facts', 'Facts')
            .addChoice('help', 'Help')
            .addChoice('ntnt', 'Ntnt')
            .addChoice('ping', 'Ping')
            .addChoice('reboot*', 'Reboot')
            .addChoice('rockpaperscissors', 'Rockpaperscissors')
            .addChoice('roleadd*', 'Roleadd')
            .addChoice('rolecolor*', 'Rolecolor')
            .addChoice('rolecount', 'Rolecount')
            .addChoice('rolelist*', 'Rolelist')
            .addChoice('roletransfer*', 'Roletransfer')
            //.addChoice('starttournament*', 'Starttournament')
            .addChoice('tablehide*', 'Tablehide')
            .addChoice('tablemessage*', 'Tablemessage')
            .addChoice('tablespam*', 'Tablespam')
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
	interaction.editReply(fs.readFileSync(`txt/help${interaction.options.getString('topic') ?? 'General'}.txt`, 'utf8')).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    success = true;
}