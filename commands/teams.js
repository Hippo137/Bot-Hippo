const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
const { MessageEmbed } = require('discord.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('teams')
		.setDescription('Puts users into teams')
        .addUserOption(option => option.setName('user01').setDescription('User 01 – defaults to yourself if omitted'))
        .addUserOption(option => option.setName('user02').setDescription('User 02'))
        .addUserOption(option => option.setName('user03').setDescription('User 03'))
        .addUserOption(option => option.setName('user04').setDescription('User 04'))
        .addUserOption(option => option.setName('user05').setDescription('User 05'))
        .addUserOption(option => option.setName('user06').setDescription('User 06'))
        .addUserOption(option => option.setName('user07').setDescription('User 07'))
        .addUserOption(option => option.setName('user08').setDescription('User 08'))
        .addUserOption(option => option.setName('user09').setDescription('User 09'))
        .addUserOption(option => option.setName('user10').setDescription('User 10'))
        .addUserOption(option => option.setName('user11').setDescription('User 11'))
        .addUserOption(option => option.setName('user12').setDescription('User 12'))
        .addUserOption(option => option.setName('user13').setDescription('User 13'))
        .addUserOption(option => option.setName('user14').setDescription('User 14'))
        .addUserOption(option => option.setName('user15').setDescription('User 15'))
        .addUserOption(option => option.setName('user16').setDescription('User 16'))
        .addUserOption(option => option.setName('user17').setDescription('User 17'))
        .addUserOption(option => option.setName('user18').setDescription('User 18'))
        .addUserOption(option => option.setName('user19').setDescription('User 19'))
        .addUserOption(option => option.setName('user20').setDescription('User 20'))
        .addUserOption(option => option.setName('user21').setDescription('User 21'))
        .addUserOption(option => option.setName('user22').setDescription('User 22'))
        .addUserOption(option => option.setName('user23').setDescription('User 23'))
        .addUserOption(option => option.setName('user24').setDescription('User 24'))
        .addIntegerOption
        (option =>
            option.setName('teams')
            .setDescription('Number of teams – defaults to 2 if omitted')
            .setRequired(false)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
            .addChoice('7', 7)
            .addChoice('8', 8)
            .addChoice('9', 9)
            .addChoice('10', 10)
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
    let teams = interaction.options.getInteger('teams') ?? 2;
    let users = [];
    for (let i=1; i<25; i++)
    {
        let user = interaction.options.getUser(`user${i<10?'0':''}${i}`);
        if (user && !users.includes(user)) users.push(user);
        else if (i==1) users.push(interaction.user);
    }
    if (users.length < teams) return interaction.editReply('Provide at least as many users as the number of teams.').catch(console.error);
    let usersInTeams = [];
    while (usersInTeams.push([])<teams); //every team has its own array inside this array
    let min = 0;
    let k = 0;
    while (users.length > 0)
    {
        let r;
        do
        {
            r = Math.floor(Math.random()*teams);
        }
        while (usersInTeams[r].length > min);
        if (++k%teams == 0) min++;
        usersInTeams[r].push(users.splice(Math.floor(Math.random()*users.length),1));
    }
    
    let letters = 'ABCDEFGHIJ';
    const messageEmbed = new MessageEmbed().setColor('RANDOM')
    
    for (let i=0; i<teams; i++)
    {
        let txt = '';
        while (usersInTeams[i].length > 0)
        {
            txt += `${usersInTeams[i].shift()}\n`;
        }
        messageEmbed.addField(`Team ${letters.substr(i,1)}`, txt, true);
    }

    interaction.editReply({ embeds: [messageEmbed] }).catch(console.error);
    
    success = true;
}