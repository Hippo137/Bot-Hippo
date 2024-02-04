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
            .addChoice('facts', 'Facts')
            .addChoice('help', 'Help')
            .addChoice('link', 'Link')
            .addChoice('notify', 'Notify')
            .addChoice('ping', 'Ping')
            .addChoice('rockpaperscissors', 'Rockpaperscissors')
            .addChoice('scheduler', 'Scheduler')
            .addChoice('teams', 'teams')
            .addChoice('wacky', 'wacky')
            .addChoice('*backuprefresh', '*Backuprefresh')
            .addChoice('*clear', '*Clear')
            .addChoice('*createtournament', '*Createtournament')
            .addChoice('*endtournament', '*Endtournament')
            .addChoice('*host', 'Host')
            .addChoice('*raffledonator', '*Raffledonator')
            .addChoice('*roleadd', '*Roleadd')
            .addChoice('*rolecolor', '*Rolecolor')
            .addChoice('*rolelist', '*Rolelist')
            .addChoice('*roletransfer', '*Roletransfer')
            .addChoice('*rolewinner', '*Rolewinner')
            .addChoice('*starttournament', '*Starttournament')
            .addChoice('*tablehide', '*Tablehide')
            .addChoice('*tablemessage', '*Tablemessage')
            .addChoice('*tablespam', '*Tablespam')
            
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
	//if (!g.allowed(interaction, 0)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let topic = interaction.options.getString('topic');
    let topic2;
    let memberIsCCTeam = g.allowed(interaction, 1) //Tournament Team is enough now
    if (topic === null)
    {
        topic = `General`;
        if (memberIsCCTeam) topic2 = `General${memberIsCCTeam?'CC':''}`;
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
    if (topic2) interaction.channel.send(fs.readFileSync(`txt/help${topic2}.txt`, 'utf8')).catch(console.error);
    
    success = true;
}