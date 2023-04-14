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
            .addChoice('*backuprefresh', '*Backuprefresh')
            .addChoice('*clear', '*Clear')
            .addChoice('*createtournament', '*Createtournament')
            .addChoice('*endtournament', '*Endtournament')
            .addChoice('facts', 'Facts')
            .addChoice('help', 'Help')
            .addChoice('*host', 'Host')
            .addChoice('ntnt', 'Ntnt')
            .addChoice('ping', 'Ping')
            .addChoice('*raffledonator', '*Raffledonator')
            .addChoice('*reboot', '*Reboot')
            .addChoice('rockpaperscissors', 'Rockpaperscissors')
            .addChoice('*roleadd', '*Roleadd')
            .addChoice('*rolecolor', '*Rolecolor')
            .addChoice('*rolelist', '*Rolelist')
            .addChoice('*roletransfer', '*Roletransfer')
            .addChoice('*starttournament', '*Starttournament')
            .addChoice('*tablehide', '*Tablehide')
            .addChoice('*tablemessage', '*Tablemessage')
            .addChoice('*tablespam', '*Tablespam')
            .addChoice('teams', 'teams')
            .addChoice('tickets', 'tickets')
            .addChoice('wacky', 'wacky')
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
	let topic = interaction.options.getString('topic');
    let memberIsCCTeam = interaction.member.roles.cache.find(role => role.name === 'CC Team')
    if (topic === null)
    {
        topic = `General${memberIsCCTeam?'CC':''}`;
    }
    else if (topic.includes('*'))
    {
        if (!memberIsCCTeam)
        {
            return interaction.editReply('Your selected command can only used by members of the CC-Team.').catch(console.error);
        }
        else topic = topic.slice(1);
    }
    
    interaction.editReply(fs.readFileSync(`txt/help${topic}.txt`, 'utf8')).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    success = true;
}