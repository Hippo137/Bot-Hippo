const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temp')
        .setDescription('Automate the table messages for tournaments')
        //.setDefaultPermission(false)
        .addSubcommand(subcommand =>
            subcommand
            .setName('fivetwelve')
            .setDescription('Use this for the 5–12 players round')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('quarterfinal')
            .setDescription('Use this for the quarterfinals')
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('semifinal')
            .setDescription('Use this for the semifinals')
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('final')
            .setDescription('Use this for the final')
        ),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'Inner Circle')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        let screenshotMessage = '', extraMessage = '', intro = '', q = '', tableStart = 1, tableEnd = 4;
        
        screenshotMessage = 'After each match, the winner posts a screenshot of the game end screen in';
        extraMessage = 'Win this match to move on to the ';
        switch (interaction.options.getSubcommand())
        {
            case 'fivetwelve':
            extraMessage += 'quarterfinal.';
            intro = '5–12 Round';
            q = 'E';
            tableStart = 5;
            tableEnd = 8;
            break;
            
            case 'quarterfinal':
            extraMessage += 'semifinal.';
            intro = 'Quarterfinal';
            q = 'Q';
            break;
            
            case 'semifinal':
            extraMessage += 'final.';
            intro = 'Semifinal';
            q = 'S';
            tableEnd = 2;
            break;
            
            case 'final':
            extraMessage = '';
            intro = 'Final';
            q = 'F';
            tableEnd = 1;
            break;
        }
        
        
        let botMessage = fs.readFileSync(`txt/temp.txt`, 'utf8')
            .replace(/{intro}/g, intro)
            .replace(/{roomname}/g, `CC ${intro} Table {table}`)
            .replace(/{q}/g, q)
            .replace(/{extraMessage}/g, extraMessage)
            .replace(/{screenshots}/g, await interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
        
        for (let i=tableStart; i<=tableEnd; i++)
        {
            const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(botMessage.replace(/{table}/g, i));
        }
        
        /*if (interaction.guild.id != '894372075622526986')
        {
            await getTest(client);
            if (test == 0) return;
        }*/
        //setPresence(client, 2);
        await interaction.editReply(`Successfully used ${interaction.options.getSubcommand()}`).catch(console.error); //error handling in case the message was manually removed in the meantime
	},
};