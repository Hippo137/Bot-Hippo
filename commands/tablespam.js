require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tablespam')
        .setDescription('Sends the table messages for tournaments')
        //.setDefaultPermission(false)
        .addSubcommand(subcommand =>
            subcommand
            .setName('qualifier')
            .setDescription('Use this for the qualifiers')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Last table channel which should be posted in, updates ‘tables’ if provided')
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('tablestart')
                .setDescription('First table channel which should be posted in – defaults to 1 if omitted')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('dayfinal')
            .setDescription('Use this for the dayfinal')
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('sixteenthfinal')
            .setDescription('Use this for the sixteenthfinal')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the eigthfinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('eighthfinal')
            .setDescription('Use this for the eighthfinals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the eigthfinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('quarterfinal')
            .setDescription('Use this for the quarterfinals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the quarterfinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('semifinal')
            .setDescription('Use this for the semifinals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the semifinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('final')
            .setDescription('Use this for the finals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the final. Only set this with one bracket and if some players skipped a round.')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('settings')
            .setDescription('Use this to get the current settings')
        ),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}

async function command(interaction)
{
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    }
    
    const dbMessage = await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE);
    let dbContent = dbMessage.content;
    
    if (g.readDb(dbContent, 'corrupted') !== 'False')
    {
        return interaction.editReply('The tournament settings are corrupted. Please create a new tournament or fix the corruption.').catch(console.error);
    }

    const tableStart = interaction.options.getInteger('tablestart') ?? 1;
    let tableEnd = interaction.options.getInteger('tableend');

    if (interaction.options.getSubcommand() === 'qualifier')
    {
        if (tableEnd != undefined) dbContent = g.writeDb(dbContent, 'sTables', tableEnd);
        else tableEnd = parseInt(g.readDb(dbContent, 'sTables'));
        //else tableEnd = parseInt(g.readDb(dbContent, sTables));

        if (tableEnd === 0)
        {
            return interaction.editReply(`Set either ‘tables’ or ‘tableEnd’ to something higher than 0.`).catch(console.error);
        }
        if (tableStart > tableEnd)
        {
            return interaction.editReply(`‘tablestart’ must not exceed ‘tableend’/‘tables.’`).catch(console.error);
        }
    }

    let sRound = g.readDb(dbContent, 'sRound');
    if (tableStart > 1 && sRound > 1) sRound--;
    const sRounds = g.readDb(dbContent, 'sRounds');
    if (interaction.options.getSubcommand() === 'qualifier' && parseInt(sRound) > parseInt(sRounds))
    {
        return interaction.editReply(`‘round’ must not exceed ‘rounds’. Maybe you need to restart the tournament.`).catch(console.error);
    }
    //if (interaction.options.getSubcommand() === 'qualifier' && parseInt(sRound) > parseInt(sRounds)) return interaction.editReply(`‘round’ must not exceed ‘rounds’`).catch(console.error);

    const sBox = g.readDb(dbContent, 'sBox');
    const sBrackets = g.readDb(dbContent, 'sBrackets');
    const sDayfinal = g.readDb(dbContent, 'sDayfinal');
    const sDayfinalPrize = g.readDb(dbContent, 'sDayfinalPrize');
    const sDice = g.readDb(dbContent, 'sDice');
    const zDice = g.readDb(dbContent, 'zDice');
    const sDiscard = g.readDb(dbContent, 'sDiscard');
    const zDiscard = g.readDb(dbContent, 'zDiscard');
    const sLoserfinals = g.readDb(dbContent, 'sLoserfinals');
    const sMap = g.readDb(dbContent, 'sMap');
    const zMap = g.readDb(dbContent, 'zMap');
    const sMode = g.readDb(dbContent, 'sMode');
    const zMode = g.readDb(dbContent, 'zMode');
    const sSpecial = g.readDb(dbContent, 'sSpecial');
    const zSpecial = g.readDb(dbContent, 'zSpecial');
    const sPlayers = g.readDb(dbContent, 'sPlayers');
    const zPlayers = g.readDb(dbContent, 'zPlayers');
    const sRandom = g.readDb(dbContent, 'sRandom');
    const sRobber = g.readDb(dbContent, 'sRobber');
    const zRobber = g.readDb(dbContent, 'zRobber');
    const sSpeed = g.readDb(dbContent, 'sSpeed');
    const zSpeed = g.readDb(dbContent, 'zSpeed');
    const sTables = g.readDb(dbContent, 'sTables');
    const sType = g.readDb(dbContent, 'sType');
    const sVp = g.readDb(dbContent, 'sVp');
    const zVp = g.readDb(dbContent, 'zVp');
    const sTeamsize = g.readDb(dbContent, 'sTeamsize');

    if (interaction.options.getSubcommand() === 'settings')
    {
        let botMessage = fs.readFileSync(`txt/settings.txt`, 'utf8')
            .replace(/{zBox}/g, zBox)
            .replace(/{sBox}/g, sBox)
            .replace(/{zBrackets}/g, zBrackets)
            .replace(/{sBrackets}/g, sBrackets)
            .replace(/{zDayfinal}/g, zDayfinal)
            .replace(/{sDayfinal}/g, sDayfinal)
            .replace(/{zDayfinalPrize}/g, zDayfinalPrize)
            .replace(/{sDayfinalPrize}/g, sDayfinalPrize)
            .replace(/{zDice}/g, zDice)
            .replace(/{sDice}/g, sDice)
            .replace(/{zDiscard}/g, zDiscard)
            .replace(/{sDiscard}/g, sDiscard)
            .replace(/{zLoserfinals}/g, zLoserfinals)
            .replace(/{sLoserfinals}/g, sLoserfinals)
            .replace(/{zMap}/g, zMap)
            .replace(/{sMap}/g, sMap)
            .replace(/{zMode}/g, zMode)
            .replace(/{sMode}/g, sMode)
            .replace(/{zPlayers}/g, zPlayers)
            .replace(/{sPlayers}/g, sPlayers)
            .replace(/{zRandom}/g, zRandom)
            .replace(/{sRandom}/g, sRandom)
            .replace(/{zRobber}/g, zRobber)
            .replace(/{sRobber}/g, sRobber)
            .replace(/{zRound}/g, zRound)
            .replace(/{sRound}/g, sRound)
            .replace(/{zRounds}/g, zRounds)
            .replace(/{sRounds}/g, sRounds)
            .replace(/{zSpecial}/g, zSpecial)
            .replace(/{sSpecial}/g, sSpecial)
            .replace(/{zSpeed}/g, zSpeed)
            .replace(/{sSpeed}/g, sSpeed)
            .replace(/{zTables}/g, zTables)
            .replace(/{sTables}/g, sTables)
            .replace(/{zTeamsize}/g, zTeamsize)
            .replace(/{sTeamsize}/g, sTeamsize)
            .replace(/{zType}/g, zType)
            .replace(/{sType}/g, sType)
            .replace(/{zVp}/g, zVp)
            .replace(/{sVp}/g, sVp);
            
            /*.replace(/{zBox}/g, sBox==1?'+':'-')
            .replace(/{sBox}/g, sBox)
            .replace(/{zBrackets}/g, sBrackets==4?'+':'-')
            .replace(/{sBrackets}/g, sBrackets)
            .replace(/{zDayfinal}/g, sDayfinal==='No'?'+':'-')
            .replace(/{sDayfinal}/g, sDayfinal)
            .replace(/{zDayfinalPrize}/g, sDayfinalPrize==='Cash Ticket'?'+':'-')
            .replace(/{sDayfinalPrize}/g, sDayfinalPrize)
            .replace(/{zDice}/g, sDice===g.colonistDefaults.Dice?'+':'-')
            .replace(/{sDice}/g, sDice)
            .replace(/{zDiscard}/g, sDiscard==7?'+':'-')
            .replace(/{sDiscard}/g, sDiscard)
            .replace(/{zLoserfinals}/g, (sLoserfinals==='No')!=(sType==='Cash')?'+':'-')
            .replace(/{sLoserfinals}/g, sLoserfinals)
            .replace(/{zMap}/g, sMap==='Base'?'+':'-')
            .replace(/{sMap}/g, sMap)
            .replace(/{zMode}/g, sMode==='Base'?'+':'-')
            .replace(/{sMode}/g, sMode)
            .replace(/{zPlayers}/g, sPlayers==4?'+':'-')
            .replace(/{sPlayers}/g, sPlayers)
            .replace(/{zRandom}/g, sRandom==='No'?'+':'-')
            .replace(/{sRandom}/g, sRandom)
            .replace(/{zRobber}/g, sRobber===g.colonistDefaults.FriendlyRobber?'+':'-')
            .replace(/{sRobber}/g, sRobber)
            .replace(/{zRound}/g, sRound==1?'+':'-')
            .replace(/{sRound}/g, sRound)
            .replace(/{zRounds}/g, (sRounds==3)!=(sMode==='Cities & Knights'||sMode==='Seafarers + Cities & Knights')?'+':'-')
            .replace(/{sRounds}/g, sRounds)
            .replace(/{zSpecial}/g, sSpecial==='None'?'+':'-')
            .replace(/{sSpecial}/g, sSpecial)
            .replace(/{zSpeed}/g, sSpeed===g.colonistDefaults.Speed?'+':'-')
            .replace(/{sSpeed}/g, sSpeed)
            .replace(/{zTables}/g, sTables==0?'+':'-')
            .replace(/{sTables}/g, sTables)
            .replace(/{zTeamsize}/g, sTeamsize==1?'+':'-')
            .replace(/{sTeamsize}/g, sTeamsize)
            .replace(/{zType}/g, sType==='Open'?'+':'-')
            .replace(/{sType}/g, sType)
            .replace(/{zVp}/g, zVp)
            .replace(/{sVp}/g, sVp);*/

        //settings don’t change anything, so no need to update the database
        success = true;
        return interaction.editReply(botMessage).catch(console.error);
    }



    const roundName = ['last', 'first', 'second', 'third', 'fourth'];
    const intNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

    let screenshotMessage = '', extraMessage1 = '', extraMessage2 = '';
    let remainingRounds = sRounds - sRound;

    if (sBox > 1)
    {
        screenshotMessage = 'After each game, the winner posts a screenshot of the game end screen in';
        extraMessage2 = `You will play a total of ${intNames[sBox]} games with the same opponent${sPlayers>2?'s':''} in this round. Use the ‘Rematch’ button after a game ends to create a new lobby.\n`;
    }
    else screenshotMessage = 'After the game, the winner posts a screenshot of the game end screen in';

    if (sTeamsize > 1) extraMessage1 = `\n:warning: You don’t play on your own. You have ${sTeamsize==2?'a teammate':`${intNames[sTeamsize-1]} teammates`}!\n`;

    let intro, /*roomname,*/ message, link;
    switch (interaction.options.getSubcommand())
    {
        case 'qualifier':
        intro = `${roundName[sRound>=sRounds ? 0 : sRound]} qualifying round`;
        //roomname = `CC${sType} Round ${sRound} Table {sTable}`;
        if (remainingRounds == 0)
        {
            if (sDayfinal === 'Yes')
            {
                extraMessage2 += `There is a Dayfinal for the Top ${sPlayers/sTeamsize} after this match. You might be in with a good performance.`
                switch (sDayfinalPrize)
                {
                    case 'Cash Ticket':
                    extraMessage2 += ' Don’t miss your chance to win a cash tournament ticket. :money_with_wings:';
                    break;
                    
                    case 'Final Spot':
                    extraMessage2 += ' Don’t miss your chance to win a guaranteed spot in the final. :trophy:'
                    break;
                    
                    case 'None':    //no additional message if there is nothing to win
                    //extraMessage2 += ' ';
                    break;
                }
            }
            else extraMessage2 += 'This is the last round in the qualifier.';
        }
        else extraMessage2 += `In this qualifier, everyone will play ${intNames[remainingRounds]} more ${remainingRounds>1?'rounds':'round'} after this round.`;
        message = `Posted Round ${sRound}.`;
        link = 'R{sRound}T{sTable}'
        break;

        case 'dayfinal':
        intro = 'Dayfinal';
        //roomname = `CC${sType} Dayfinal`;
        switch (sDayfinalPrize)
        {
            case 'Cash Ticket':
            extraMessage2 += 'Win this match to win a free entry to a future Cash Tournament.';
            break;

            case 'Final Spot':
            extraMessage2 += 'Win this match to win a guaranteed spot in the final. :trophy:'
            break;
            
            case 'None':
            extraMessage2 += 'This is your very last match in this qualifier. :slight_smile:';
            break;
        }
        tableEnd = 1;
        link = 'DF';
        message = 'Posted the Dayfinal.';
        break;

        case 'sixteenthfinal':
        intro = 'Sixteenthfinal';
        //roomname = `CC${sType} sixteenthfinal Table {sTable}`;
        extraMessage2 += 'Win this match to advance to the Quarterfinal.'
        if (!tableEnd) tableEnd = sBrackets * Math.pow(sPlayers / sTeamsize, 4);
        link = 'EF{sTable}';
        message = 'Posted the Sixteenthfinal.';
        break;

        case 'eighthfinal':
        intro = 'Eighthfinal';
        //roomname = `CC${sType} Eighthfinal Table {sTable}`;
        extraMessage2 += 'Win this match to advance to the Quarterfinal.'
        if (!tableEnd) tableEnd = sBrackets * Math.pow(sPlayers / sTeamsize, 3);
        link = 'EF{sTable}';
        message = 'Posted the Eighthfinal.';
        break;

        case 'quarterfinal':
        intro = 'Quarterfinal';
        //roomname = `CC${sType} Quarterfinal Table {sTable}`;
        extraMessage2 += 'Win this match to advance to the Semifinal.'
        if (!tableEnd) tableEnd = sBrackets * Math.pow(sPlayers / sTeamsize, 2);
        link = 'QF{sTable}';
        message = 'Posted the Quarterfinal.';
        break;

        case 'semifinal':
        intro = 'Semifinal';
        //roomname = `CC${type} Semifinal Table {sTable}`;
        if (sLoserfinals === 'Yes') extraMessage2 += 'Everyone plays one more match after this one.';
        else extraMessage2 += 'Win this match to advance to the Final.';
        if (!tableEnd) tableEnd = sBrackets * sPlayers / sTeamsize;
        link = 'SF{sTable}';
        message = 'Posted the Semifinal.';
        break;

        case 'final':
        intro = '{finalName}';
        //roomname = `CC${type} {finalName} Table {table}`;
        extraMessage2 += 'This is your last match in the tournament.'
        if (!tableEnd /*|| sBrackets>1*/) tableEnd = sBrackets * (sLoserfinals === 'Yes' ? sPlayers / sTeamsize : 1);
        link = '{X}T{sTable}';
        message = 'Posted the Final.';
        break;
    }
    switch (sSpecial)
    {
        case 'Ntnt':
        extraMessage2 += '\n\n:warning: Remember that this game is played with the special rule ‘NTNT’. No messages, no talking, no trades until the game officially ended. No exceptions!';
        break;
        
        case 'CoastFirst':
        extraMessage2 += '\n\n:warning: Remember that this game is played with the special rule ‘First Settlement on Coast’. Everyone has to place their first settlement on at least one water tile. No exceptions!';
        break;
    }
    let botMessage = fs.readFileSync(sType != 'Special' ? `txt/blank.txt` : `txt/blank special.txt`, 'utf8')
        .replace(/{intro}/g, intro)
        .replace(/{link}/g, link)
        //.replace(/{roomname}/g, roomname)
        .replace(/{zRobber}/g, zRobber)
        .replace(/{sRobber}/g, sRobber)
        .replace(/{zMode}/g, zMode)
        .replace(/{sMode}/g, sMode)
        .replace(/{zMap}/g, zMap)
        .replace(/{sMap}/g, sMap)
        .replace(/{zDice}/g, zDice)
        .replace(/{sDice}/g, sDice)
        .replace(/{zSpeed}/g, zSpeed)
        .replace(/{sSpeed}/g, sSpeed)
        .replace(/{zPlayers}/g, zPlayers)
        .replace(/{sPlayers}/g, sPlayers)
        .replace(/{zDiscard}/g, zDiscard)
        .replace(/{sDiscard}/g, sDiscard)
        .replace(/{zVp}/g, zVp)
        .replace(/{sVp}/g, sVp)
        .replace(/{sRound}/g, sRound)
        .replace(/{sType}/g, sType)
        .replace(/{roundName}/g, roundName[sRound>=sRounds ? 0 : sRound])
        .replace(/{screenshotMessage}/g, screenshotMessage)
        .replace(/{extraMessage1}/g, extraMessage1)
        .replace(/{extraMessage2}/g, extraMessage2)
        .replace(/{screenshots}/g, /*await*/ interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
        //.replace(/{screenshots}/g, interaction.guild.channels.cache.get('894372076884992015'));

    for (let i=tableStart; i<=tableEnd; i++)
    {
        let randomLetters = '';
        if (sRandom === 'Yes')
        {
            for (let i=0; i<3; i++)
            {
                randomLetters += g.symbols[Math.floor(Math.random()*g.symbols.length)];
            }
        }
        let table = i, botMessageTemp = botMessage;
        if (interaction.options.getSubcommand() === 'final')
        {
            if (i > sBrackets)
            {
                table = sBrackets * (sPlayers / sTeamsize - 1) + i;
                botMessageTemp = botMessage.replace(/{finalName}/g, 'Loserfinal').replace(/{X}/g, 'L');
            }
            else
            {
                botMessageTemp = botMessage.replace(/{finalName}/g, 'Final').replace(/{X}/g, 'F');
            }
        }
        let channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `table-`+table);
        if (channelTarget)
        {
            channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            channelTarget.send(botMessageTemp.replace(/{sTable}/g, table<10?'0'+table:table).replace(/{random}/g, randomLetters));
        }
        if (sSpecial !== 'Ntnt')
        {
            channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `table `+table);
            if (channelTarget)
            {
                channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            }
        }
    }

    /*if (interaction.guild.id != '894372075622526986')
    {
        await getTest(client);
        if (test == 0) return;
    }*/
    //setPresence(client, 2);
    //console.log(dbContent);
    if (interaction.options.getSubcommand() === 'qualifier') dbContent = g.writeDb(dbContent, 'sRound', `${parseInt(sRound)+1}`);
    interaction.editReply(message).catch(console.error); //error handling in case the message was manually removed in the meantime
    //console.log(dbContent);
    dbMessage.edit(dbContent).catch(console.error);
    success = true;
}