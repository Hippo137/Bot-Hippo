require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createtournament')
        .setDescription('Create a tournament')
        //.setDefaultPermission(false)
        .addStringOption
        (option =>
            option.setName('create')
            .setDescription('New=default if omitted, Update=ignored if omitted, Restart=only resets round to 1 and tables to 0')
            .setRequired(true)
            .addChoice('New', 'New')
            .addChoice('Update', 'Update')
            .addChoice('Restart', 'Restart')
        )
        .addIntegerOption
        (option =>
            option.setName('box')
            .setDescription('Number of matches per round – defaults to 1 if omitted')
            .setRequired(false)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
        )
        .addIntegerOption
        (option =>
            option.setName('brackets')
            .setDescription('Number of brackets in finals – defaults to 4 if omitted')
            .setRequired(false)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
            .addChoice('7', 7)
            .addChoice('8', 8)
        )
        .addStringOption
        (option =>
            option.setName('dayfinal')
            .setDescription('YES if the qualifier has a Day Final – defaults to NO if omitted')
            .setRequired(false)
            .addChoice('Yes', 'Yes')
            .addChoice('No', 'No')
        )
        .addStringOption
        (option =>
            option.setName('dayfinalprize')
            .setDescription('What does winning the Day Final reward? – defaults to CASH TICKET if omitted')
            .setRequired(false)
            .addChoice('Cash Ticket', 'Cash Ticket')
            .addChoice('Final Spot', 'Final Spot')
            .addChoice('Nothing', 'Nothing')
        )
        .addStringOption
        (option =>
            option.setName('dice')
            .setDescription('[setting]: dice – defaults to RANDOM DICE if omitted')
            .setRequired(false)
            .addChoice('Random Dice', 'Random Dice')
            .addChoice('Balanced Dice', 'Balanced Dice')
        )
        .addIntegerOption
        (option =>
            option.setName('discard')
            .setDescription('[setting]: discard limit – defaults to 7 if omitted')
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
            .addChoice('11', 11)
            .addChoice('12', 12)
        )
        .addStringOption
        (option =>
            option.setName('friendlyrobber')
            .setDescription('[setting]: Friendly Robber – defaults to NO if omitted')
            .setRequired(false)
            .addChoice('Yes', 'Yes')
            .addChoice('No', 'No')
        )
        .addStringOption
        (option =>
            option.setName('loserfinal')
            .setDescription('adds Loserfinals to the final round – defaults to NO in BASE and YES in CASH if omitted')
            .setRequired(false)
            .addChoice('Yes', 'Yes')
            .addChoice('No', 'No')
        )
        .addStringOption
        (option =>
            option.setName('map')
            .setDescription('[setting]: map – defaults to BASE if omitted')
            .setRequired(false)
            .addChoice('Base', 'Base')
            .addChoice('Base 5-6 Player', 'Base 5-6 Player')
            .addChoice('Base 7-8 Player', 'Base 7-8 Player')
            .addChoice('Base Random', 'Base Random')
            .addChoice('Black Forest', 'Black Forest')
            .addChoice('Diamond', 'Diamond')
            .addChoice('Earth', 'Earth')
            .addChoice('Heading for New Shores', 'Heading for New Shores')
            .addChoice('Fog Islands', 'Fog Islands')
            .addChoice('Four Islands', 'Four Islands')
            .addChoice('Gear', 'Gear')
            .addChoice('Gold Rush', 'Gold Rush')
            .addChoice('Lakes', 'Lakes')
            .addChoice('Pond', 'Pond')
            .addChoice('UK & Ireland', 'UK & Ireland')
            .addChoice('USA', 'USA')
            .addChoice('Shuffle Board', 'Shuffle Board')
            .addChoice('Through the Desert', 'Through the Desert')
            .addChoice('Twirl', 'Twirl')
            .addChoice('Volcano', 'Volcano')
        )
        .addStringOption
        (option =>
            option.setName('mode')
            .setDescription('[setting]: game mode – defaults to BASE if omitted')
            .setRequired(false)
            .addChoice('Base', 'Base')
            .addChoice('Seafarers', 'Seafarers')
            .addChoice('Cities & Knights', 'Cities & Knights')
            .addChoice('Seafarers + Cities & Knights', 'Seafarers + Cities & Knights')
        )
        .addIntegerOption
        (option =>
            option.setName('players')
            .setDescription('[setting]: players per match – defaults to 4 if omitted')
            .setRequired(false)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
            .addChoice('7', 7)
            .addChoice('8', 8)
        )
        .addStringOption
        (option =>
            option.setName('random')
            .setDescription('adds random letters to the game link – defaults to NO if omitted')
            .setRequired(false)
            .addChoice('Yes', 'Yes')
            .addChoice('No', 'No')
        )
        .addIntegerOption
        (option =>
            option.setName('round')
            .setDescription('current round number – defaults to 1 if omitted')
            .setRequired(false)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
        )
        .addIntegerOption
        (option =>
            option.setName('rounds')
            .setDescription('total number of rounds in the qualifier – defaults to 3 in BASE/SF and 2 in CK/CKSF if omitted')
            .setRequired(false)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
        )
        .addStringOption
        (option =>
            option.setName('special')
            .setDescription('Any special rules – defaults to NONE if omitted')
            .setRequired(false)
            .addChoice('NTNT', 'Ntnt')
            .addChoice('First Building on Coast', 'CoastFirst')
            .addChoice('One Building on Coast', 'CoastSingle')
            .addChoice('Both Buildings on Coast', 'CoastDouble')
            .addChoice('No Ports', 'Port0')
            .addChoice('First Building on Port', 'PortFirst')
            .addChoice('Three Resources', 'Resources3')
            .addChoice('Four Resources', 'Resources4')
            .addChoice('Side-By-Side', 'SBS')
            .addChoice('Anti-Side-By-Side', 'ASBS')
            .addChoice('Goon', 'Goon')
            .addChoice('None', 'None')
        )
        .addStringOption
        (option =>
            option.setName('speed')
            .setDescription('[setting]: game speed – defaults to FAST if omitted')
            .setRequired(false)
            .addChoice('Very Slow', 'Very Slow')
            .addChoice('Slow', 'Slow')
            .addChoice('Normal', 'Normal')
            .addChoice('Fast', 'Fast')
            .addChoice('Very Fast', 'Very Fast')
        )
        .addIntegerOption
        (option =>
            option.setName('tables')
            .setDescription('Number of tables – defaults to 0 if omitted')
            .setRequired(false)
        )
        .addIntegerOption
        (option =>
            option.setName('teamsize')
            .setDescription('number of winners in a match – defaults to 1 if omitted')
            .setRequired(false)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
        )
        .addStringOption
        (option =>
            option.setName('type')
            .setDescription(`type of tournament – defaults to OPEN if omitted`)
            .setRequired(false)
            .addChoice('Open', 'Open')
            .addChoice('Cash', 'Cash')
            .addChoice('Special', 'Special')
        )
        .addIntegerOption
        (option =>
            option.setName('vp')
            .setDescription('[setting]: VP to win the game – defaults to Colonist’s default for the selected mode+map if omitted')
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
            .addChoice('11', 11)
            .addChoice('12', 12)
            .addChoice('13', 13)
            .addChoice('14', 14)
            .addChoice('15', 15)
            .addChoice('16', 16)
            .addChoice('17', 17)
            .addChoice('18', 18)
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
            
    const create = interaction.options.getString('create');

    if (create === 'Restart')
    {
        dbContent = g.writeDb(dbContent, 'sRound', '1'); //sRound
        dbContent = g.writeDb(dbContent, 'sTables', '0'); //sTables

        //log(interaction);
        success = true;
        dbMessage.edit(dbContent).catch(console.error);
        return interaction.editReply(`Successfully restarted the tournament.`).catch(console.error);
    }
    let sBox = interaction.options.getInteger('box');
    let sBrackets = interaction.options.getInteger('brackets');
    let sDayfinal = interaction.options.getString('dayfinal');
    let sDayfinalPrize = interaction.options.getString('dayfinalprize');
    let sDice = interaction.options.getString('dice');
    let sDiscard = interaction.options.getInteger('discard');
    let sLoserfinals = interaction.options.getString('loserfinal');
    let sMap = interaction.options.getString('map');
    let sMode = interaction.options.getString('mode');
    let sSpecial = interaction.options.getString('special');
    let sPlayers = interaction.options.getInteger('players');
    let sRandom = interaction.options.getString('random');
    let sRobber = interaction.options.getString('friendlyrobber');
    let sRound = interaction.options.getInteger('round');
    let sRounds = interaction.options.getInteger('rounds');
    let sSpeed = interaction.options.getString('speed');
    let sTables = interaction.options.getInteger('tables');
    let sTeamsize = interaction.options.getInteger('teamsize');
    let sType = interaction.options.getString('type');
    let sVp = interaction.options.getInteger('vp');

    let updateVP;

    if (create === 'New')
    {
        sBox = sBox ?? 1;
        sBrackets = sBrackets ?? 4;
        sDayfinal = sDayfinal ?? 'No';
        sDayfinalPrize = sDayfinalPrize ?? 'Cash Ticket';
        sDice = sDice ?? g.tournamentDefaults.Dice;
        sDiscard = sDiscard ?? 7;
        //sLoserfinals = sLoserfinals ?? 'No'; //at the bottom because it depends on sType
        sMap = sMap ?? 'Base';
        sMode = sMode ?? 'Base';
        sPlayers = sPlayers ?? 4;
        
        sRandom = sRandom ?? 'No';
        sRobber = sRobber ?? g.tournamentDefaults.FriendlyRobber;
        sRound = sRound ?? 1;
        //sRounds = sRounds ?? 3; //at the bottom because it depends on the sMode
        sSpecial = sSpecial ?? 'None';
        sSpeed = sSpeed ?? g.tournamentDefaults.Speed;
        sTables = sTables ?? 0;
        sTeamsize = sTeamsize ?? 1;
        sType = sType ?? 'Open';
        //sVp = sVp;

        sLoserfinals = sLoserfinals ?? sType === 'Cash' ? 'Yes' : 'No';
        sRounds = sRounds ?? (sMode === 'Cities & Knights' || sMode === 'Seafarers + Cities & Knights' ? 2 : 3);

        updateVP = true;
    }
    else updateVP = sVp != null || sMode != null || sMap != null;

    if (sPlayers != null)
    {
        dbContent = g.writeDb(dbContent, 'sPlayers', `${sPlayers}`);
        dbContent = g.writeDb(dbContent, 'zPlayers', `${sPlayers === 4 ? '+' : '-'}`);
    }
    else sPlayers = g.readDb(dbContent, 'sPlayers');

    if (sTeamsize != null) dbContent = g.writeDb(dbContent, 'sTeamsize', `${sTeamsize}`);
    else sTeamsize = g.readDb(dbContent, 'sTeamsize');

    if (sPlayers % sTeamsize != 0)
    {
        dbContent = g.writeDb(dbContent, 'corrupted', 'True');
        return interaction.editReply(`The number of players per match must be divisible by the number of winners in a match.`).catch(console.error);
    }
    if (sPlayers <= sTeamsize)
    {
        dbContent = g.writeDb(dbContent, 'corrupted', 'True');
        return interaction.editReply(`The number of players per match must be higher than the number of winners in a match.`).catch(console.error);
    }

    if (sBox != null) dbContent = g.writeDb(dbContent, 'sBox', `${sBox}`);
    else sBox = g.readDb(dbContent, 'sBox');

    if (sBrackets != null) dbContent = g.writeDb(dbContent, 'sBrackets', `${sBrackets}`);
    else sBrackets = g.readDb(dbContent, 'sBrackets');

    if (sDayfinal != null) dbContent = g.writeDb(dbContent, 'sDayfinal', `${sDayfinal}`);
    else sDayfinal = g.readDb(dbContent, 'sDayfinal');
    
    if (sDayfinalPrize != null) dbContent = g.writeDb(dbContent, 'sDayfinalPrize', sDayfinalPrize);
    else sDayfinalPrize = g.readDb(dbContent, 'sDayfinalPrize');

    if (sDice != null)
    {
        dbContent = g.writeDb(dbContent, 'sDice', sDice);
        dbContent = g.writeDb(dbContent, 'zDice', `${sDice === g.colonistDefaults.Dice ? '+' : '-'}`);
    }
    else sDice = g.readDb(dbContent, 'sDice');

    if (sDiscard != null)
    {
        dbContent = g.writeDb(dbContent, 'sDiscard', `${sDiscard}`);
        dbContent = g.writeDb(dbContent, 'zDiscard', `${sDiscard === 7 ? '+' : '-'}`);
    }
    else sDiscard = g.readDb(dbContent, 'sDiscard');

    if (sLoserfinals != null) dbContent = g.writeDb(dbContent, 'sLoserfinals', sLoserfinals);
    else sLoserfinals = g.readDb(dbContent, 'sLoserfinals');

    if (sMap != null)
    {
        dbContent = g.writeDb(dbContent, 'sMap', sMap);
        dbContent = g.writeDb(dbContent, 'zMap', sMap === 'Base' ? '+' : '-');
    }
    else sMap = g.readDb(dbContent, 'sMap');

    if (sMode != null)
    {
        dbContent = g.writeDb(dbContent, 'sMode', sMode);
        dbContent = g.writeDb(dbContent, 'zMode', sMode === 'Base' ? '+' : '-');
    }
    else sMode = g.readDb(dbContent, 'sMode');

    if (sRandom != null) dbContent = g.writeDb(dbContent, 'sRandom', sRandom);
    else sRandom = g.readDb(dbContent, 'sRandom');

    if (sRobber != null)
    {
        dbContent = g.writeDb(dbContent, 'sRobber', sRobber);
        dbContent = g.writeDb(dbContent, 'zRobber', `${sRobber === g.colonistDefaults.FriendlyRobber ? '+' : '-'}`);
    }
    else sRobber = g.readDb(dbContent, 'sRobber');

    if (sRound != null) dbContent = g.writeDb(dbContent, 'sRound', `${sRound}`);
    else sRound = g.readDb(dbContent, 'sRound');

    if (sRounds != null) dbContent = g.writeDb(dbContent, 'sRounds', `${sRounds}`);
    else sRounds = g.readDb(dbContent, 'sRounds');
    
    if (sSpecial != null)
    {
        dbContent = g.writeDb(dbContent, 'sSpecial', sSpecial);
        dbContent = g.writeDb(dbContent, 'zSpecial', sSpecial === 'None' ? '+' : '-');
    }
    else sSpecial = g.readDb(dbContent, 'sSpecial');
    
    if (sSpeed != null)
    {
        dbContent = g.writeDb(dbContent, 'sSpeed', `${sSpeed}`);
        dbContent = g.writeDb(dbContent, 'zSpeed', `${sSpeed === g.colonistDefaults.Speed ? '+' : '-'}`);
    }
    else sSpeed = g.readDb(dbContent, 'sSpeed');
    
    if (sTables != null) dbContent = g.writeDb(dbContent, 'sTables', `${sTables}`);
    else sTables = g.readDb(dbContent, 'sTables');
    
    if (sType != null) dbContent = g.writeDb(dbContent, 'sType', sType);
    else sType = g.readDb(dbContent, 'sType');
    
    let zVp;
    if (updateVP)
    {
        switch (sMode)
        {
            case 'Base':
            switch (sMap)
            {
                case 'Heading for New Shores': case 'Fog Islands': case 'Four Islands': case 'Through the Desert':
                //do nothing
                break;

                default:
                if (!sVp) sVp = 10;
                zVp = sVp === 10 ? '+' : '-';
                break;
            }
            break;

            case 'Seafarers':
            switch (sMap)
            {
                case 'Heading for New Shores':
                if (!sVp) sVp = 14;
                zVp = sVp === 14 ? '+' : '-';
                break;

                case 'Four Islands':
                if (!sVp) sVp = 13;
                zVp = sVp === 13 ? '+' : '-';
                break;

                case 'Fog Islands':
                if (!sVp) sVp = 12;
                zVp = sVp === 12 ? '+' : '-';
                break;

                case 'Through the Desert':
                if (!sVp) sVp = 14;
                zVp = sVp === 14 ? '+' : '-';
                break;

                case 'Earth':
                if (!sVp) sVp = 14;
                zVp = sVp === 14 ? '+' : '-';
                break;

                case 'UK & Ireland':    //not sure, check when it’s free
                if (!sVp) sVp = 14;
                zVp = sVp === 14 ? '+' : '-';
                break;
            }
            break;

            case 'Cities & Knights':
            switch (sMap)
            {
                case 'Heading for New Shores': case 'Fog Islands': case 'Four Islands': case 'Through the Desert':
                //do nothing
                break;

                default:
                if (!sVp) sVp = 13;
                zVp = sVp === 13 ? '+' : '-';
                break;
            }
            break;

            case 'Seafarers + Cities & Knights':
            switch (sMap)
            {
                case 'Heading for New Shores':
                if (!sVp) sVp = 16;
                zVp = sVp === 16 ? '+' : '-';
                break;

                case 'Four Islands':
                if (!sVp) sVp = 15;
                zVp = sVp === 15 ? '+' : '-';
                break;

                case 'Fog Islands':
                if (!sVp) sVp = 14;
                zVp = sVp === 14 ? '+' : '-';
                break;

                case 'Through the Desert':
                if (!sVp) sVp = 16;
                zVp = sVp === 16 ? '+' : '-';
                break;

                case 'Earth':
                if (!sVp) sVp = 16;
                zVp = sVp === 16 ? '+' : '-';
                break;

                case 'UK & Ireland':    //not sure, check when it’s free
                if (!sVp) sVp = 16;
                zVp = sVp === 16 ? '+' : '-';
                break;
            }
            break;
        }

        if (!zVp)
        {
            dbContent = g.writeDb(dbContent, 'corrupted', 'True');
            return interaction.editReply(`The map ‘${sMap}’ isn’t available in the game mode ‘${sMode}’!`).catch(console.error);
        }
        dbContent = g.writeDb(dbContent, 'sVp', `${sVp}`);
        dbContent = g.writeDb(dbContent, 'zVp', `${zVp}`);
        dbContent = g.writeDb(dbContent, 'corrupted', 'False');
    }
    else
    {
        sVp = g.readDb(dbContent, 'sVp');
        zVp = g.readDb(dbContent, 'zVp');
        if (g.readDb(dbContent, 'corrupted') == 'True')
        {
            return interaction.editReply(`The map ‘${sMap}’ isn’t available in the game mode ‘${sMode}’!`).catch(console.error);
        }
    }

    let botMessage = fs.readFileSync(`txt/settings.txt`, 'utf8')
        .replace(/{zBox}/g, sBox==1?'+':'-')
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
        .replace(/{sVp}/g, sVp);
        

    //await interaction.editReply(`Successfully ${create === 'New' ? 'created' : 'updated'} the tournament.`).catch(console.error); //error handling in case the message was manually removed in the meantime
    interaction.editReply(`Successfully ${create === 'New' ? 'created' : 'updated'} the tournament.\n\n${botMessage}`).catch(console.error); //error handling in case the message was manually removed in the meantime
    dbMessage.edit(dbContent).catch(console.error);
    
    success = true;
}