require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;
let errorMessage = ''; //receive an error message in the end instead of immediately failing, so you can fix what’s wrong instead of doing everything all over again

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createtournament')
        .setDescription('Create a tournament')
        //.setDefaultPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName('design')
            .setDescription('Use this for the parameters which aren’t lobby settings')
            .addStringOption
            (option =>
                option.setName('create')
                .setDescription('New=default if omitted, Update=ignored if omitted')/*, Restart=only resets round to 1 and tables to 0')*/
                .setRequired(true)
                .addChoice('New', 'New')
                .addChoice('Update', 'Update')
                //.addChoice('Restart', 'Restart')
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
                option.setName('loserfinal')
                .setDescription('adds Loserfinals to the final round – defaults to NO in OPEN/WEEKDAY and YES in CASH if omitted')
                .setRequired(false)
                .addChoice('Yes', 'Yes')
                .addChoice('No', 'No')
            )
            .addIntegerOption
            (option =>
                option.setName('number')
                .setDescription('tournament number – is used for TwoSheep to be able to search for games and replays')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('platform')
                .setDescription('platform/website – defaults to COLONIST if omitted')
                .setRequired(false)
                .addChoice('Colonist', 'Colonist')
                .addChoice('TwoSheep', 'TwoSheep')
            )
            .addStringOption
            (option =>
                option.setName('qualfinal')
                .setDescription('YES if the qualifier has a final – defaults to YES in OPEN and NO in WEEKDAY/CASH if omitted')
                .setRequired(false)
                .addChoice('Yes', 'Yes')
                .addChoice('No', 'No')
            )
            .addStringOption
            (option =>
                option.setName('qualfinalprize')
                .setDescription('What does winning the Qual Final reward? – defaults to CASH TICKET if omitted')
                .setRequired(false)
                .addChoice('Cash Ticket', 'Cash Ticket')
                .addChoice('Final Spot', 'Final Spot')
                .addChoice('Nothing', 'Nothing')
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
                .addChoice('Bingo', 'Bingo')
                .addChoice('None', 'None')
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
                .addChoice('Weekday', 'Weekday')
                //.addChoice('Special', 'Special')
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('lobby')
            .setDescription('Use this for the parameters which are lobby settings')
            .addStringOption
            (option =>
                option.setName('create')
                .setDescription('New=default if omitted, Update=ignored if omitted')/*, Restart=only resets round to 1 and tables to 0')*/
                .setRequired(true)
                .addChoice('New', 'New')
                .addChoice('Update', 'Update')
                //.addChoice('Restart', 'Restart')
            )
            .addStringOption
            (option =>
                option.setName('dice')
                .setDescription('dice – defaults to RANDOM DICE if omitted')
                .setRequired(false)
                .addChoice('Random Dice', 'Random Dice')
                .addChoice('Balanced Dice', 'Balanced Dice')
                .addChoice('Uniform Dice', 'Uniform Dice')
            )
            .addIntegerOption
            (option =>
                option.setName('discard')
                .setDescription('discard limit – defaults to 7 if omitted')
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
            .addIntegerOption
            (option =>
                option.setName('initialmode1')
                .setDescription('restrictions to the first building – defaults to NORMAL if omitted')
                .setRequired(false)
                .addChoice('Normal', 0)
                .addChoice('Coastal', 1)
                .addChoice('Inland', 2)
                .addChoice('Port', 3)
                .addChoice('Blind Terrain', 4)
                .addChoice('Blind Number', 5)
                .addChoice('Blind All', 6)
                .addChoice('Adverse Pick', 7)
                .addChoice('Highest Production', 8)
                //.addChoice('Skip', 9)
                .addChoice('Sahel', 10)
                //.addChoice('Different Island', 11)
            )
            .addIntegerOption
            (option =>
                option.setName('initialmode2')
                .setDescription('restrictions to the second building – defaults to NORMAL if omitted')
                .setRequired(false)
                .addChoice('Normal', 0)
                .addChoice('Coastal', 1)
                .addChoice('Inland', 2)
                .addChoice('Port', 3)
                .addChoice('Blind Terrain', 4)
                .addChoice('Blind Number', 5)
                .addChoice('Blind All', 6)
                .addChoice('Adverse Pick', 7)
                .addChoice('Highest Production', 8)
                .addChoice('Skip', 9)
                .addChoice('Sahel', 10)
                .addChoice('Different Island', 11)
            )
            .addIntegerOption
            (option =>
                option.setName('initialtype1')
                .setDescription('the first building – defaults to SETTLEMENT if omitted')
                .setRequired(false)
                .addChoice('Settlement', 0)
                .addChoice('City', 1)
            )
            .addIntegerOption
            (option =>
                option.setName('initialtype2')
                .setDescription('the second building – defaults to SETTLEMENT in non-CK and CITY in CK if omitted')
                .setRequired(false)
                .addChoice('settlement', 0)
                .addChoice('city', 1)
            )
            .addStringOption
            (option =>
                option.setName('map')
                .setDescription('map – defaults to BASE if omitted')
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
                .addChoice('New World', 'New World')
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
                .setDescription('game mode – defaults to BASE if omitted')
                .setRequired(false)
                .addChoice('Base', 'Base')
                .addChoice('Seafarers', 'Seafarers')
                .addChoice('Cities & Knights', 'Cities & Knights')
                .addChoice('Seafarers + Cities & Knights', 'Seafarers + Cities & Knights')
            )
            .addStringOption
            (option =>
                option.setName('placements')
                .setDescription('placement order – defaults to RANDOM if omitted')
                .setRequired(false)
                .addChoice('Random', 'Random')
                .addChoice('Specified', 'Specified')
            )
            .addIntegerOption
            (option =>
                option.setName('players')
                .setDescription('players per match – defaults to 4 if omitted')
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
                option.setName('robber')
                .setDescription('Robber – defaults to NORMAL if omitted')
                .setRequired(false)
                .addChoice('Normal', 'Normal')
                .addChoice('Friendly', 'Friendly')
                .addChoice('Lazy', 'Lazy')
                .addChoice('Smelly', 'Smelly')
                .addChoice('Red', 'Red')
                .addChoice('Junior', 'Junior')
            )
            .addStringOption
            (option =>
                option.setName('speed')
                .setDescription('game speed – defaults to FAST if omitted')
                .setRequired(false)
                .addChoice('Very Slow / Relaxed', 'Very Slow')
                .addChoice('Slow / Classic', 'Slow')
                .addChoice('Normal / Rapid', 'Normal')
                .addChoice('Fast / Blitz', 'Fast')
                .addChoice('Very Fast / Bullet', 'Very Fast')
                .addChoice('None', 'None')
            )
            .addIntegerOption
            (option =>
                option.setName('vp')
                .setDescription('Victory Points to win the game – defaults to the default for the selected mode+map if omitted')
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
            )
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
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    const dbMessage = await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE);
    let dbContent = dbMessage.content;
            
    const create = interaction.options.getString('create');

    /*if (create === 'Restart')
    {
        dbContent = g.writeDb(dbContent, 'sRound', '1');
        dbContent = g.writeDb(dbContent, 'sTables', '0');

        //log(interaction);
        success = true;
        dbMessage.edit(dbContent).catch(console.error);
        return interaction.editReply(`Restarted the tournament.`).catch(console.error);
    }*/
    let sBox = interaction.options.getInteger('box');
    let sBrackets = interaction.options.getInteger('brackets');
    let sDice = interaction.options.getString('dice');
    let sDiscard = interaction.options.getInteger('discard');
    let sLoserfinals = interaction.options.getString('loserfinal');
    let sInitialMode1 = interaction.options.getInteger('initialmode1');
    let sInitialMode2 = interaction.options.getInteger('initialmode2');
    let sInitialType1 = interaction.options.getInteger('initialtype1');
    let sInitialType2 = interaction.options.getInteger('initialtype2');
    let sMap = interaction.options.getString('map');
    let sMode = interaction.options.getString('mode');
    let sNumber = interaction.options.getInteger('number');
    let sPlacements = interaction.options.getString('placements');
    let sPlatform = interaction.options.getString('platform');
    let sPlayers = interaction.options.getInteger('players');
    let sQualfinal = interaction.options.getString('qualfinal');
    let sQualfinalPrize = interaction.options.getString('qualfinalprize');
    let sRandom = interaction.options.getString('random');
    let sRobber = interaction.options.getString('robber');
    let sRound = interaction.options.getInteger('round');
    let sRounds = interaction.options.getInteger('rounds');
    let sSpecial = interaction.options.getString('special');
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
        sDice = sDice ?? g.tournamentDefaults.Dice;
        sDiscard = sDiscard ?? 7;
        sInitialMode1 = sInitialMode1 ?? 0;
        sInitialMode2 = sInitialMode2 ?? 0;
        sInitialType1 = sInitialType1 ?? 0;
        //sInitialType2 = //at the bottom because it depends on sMode
        //sLoserfinals = //at the bottom because it depends on sType
        sMap = sMap ?? 'Base';
        sMode = sMode ?? 'Base';
        sNumber = sNumber ?? -1;
        sPlatform = sPlatform ?? 'Colonist';
        sPlayers = sPlayers ?? 4;
        //sQualfinal = //at the bottom because it depends on sType
        sQualfinalPrize = sQualfinalPrize ?? 'Cash Ticket';
        sRandom = sRandom ?? 'No';
        sRobber = sRobber ?? g.tournamentDefaults.Robber;
        sRound = sRound ?? 1;
        //sRounds = //at the bottom because it depends on the sMode
        sSpecial = sSpecial ?? 'None';
        sSpeed = sSpeed ?? g.tournamentDefaults.Speed;
        sTables = sTables ?? 0;
        sTeamsize = sTeamsize ?? 1;
        sType = sType ?? 'Open';
        //sVp = sVp; //depends on mode and map
        
        sInitialType2 = sInitialType2 ?? (['Cities & Knights', 'Seafarers + Cities & Knights'].includes(sMode) ? 1 : 0); //second building defaults to City in CK and CKSF
        sLoserfinals = sLoserfinals ?? (sType === 'Cash' ? 'Yes' : 'No');
        sQualfinal = sQualfinal ?? (['Cash', 'Weekday'].includes(sType) ? 'No' : 'Yes');
        sRounds = sRounds ?? (['Cities & Knights', 'Seafarers + Cities & Knights'].includes(sMode) ? 2 : 3);

        updateVP = true;
    }
    else updateVP = sVp != null || sMode != null || sMap != null || sPlatform != null;
    
    errorMessage = '';
    
    if (sPlacements != null)
    {
        dbContent = g.writeDb(dbContent, 'sPlacements', `${sPlacements}`);
        dbContent = g.writeDb(dbContent, 'zPlacements', `${sPlacements === 'Random' ? '+' : '-'}`);
    }
    else sPlacements = g.readDb(dbContent, 'sPlacements');
    
    if (sPlatform != null)
    {
        dbContent = g.writeDb(dbContent, 'sPlatform', `${sPlatform}`);
        dbContent = g.writeDb(dbContent, 'zPlatform', `${sPlatform === 'Colonist' ? '+' : '-'}`);
    }
    else sPlatform = g.readDb(dbContent, 'sPlatform');
    
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
        addErrorMessage(`The number of players per match must be divisible by the number of winners in a match.`);
    }
    if (sPlayers <= sTeamsize)
    {
        addErrorMessage(`The number of players per match must be higher than the number of winners in a match.`)
    }

    if (sBox != null) dbContent = g.writeDb(dbContent, 'sBox', `${sBox}`);
    else sBox = g.readDb(dbContent, 'sBox');

    if (sBrackets != null) dbContent = g.writeDb(dbContent, 'sBrackets', `${sBrackets}`);
    else sBrackets = g.readDb(dbContent, 'sBrackets');

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
    
    if (sInitialMode1 != null) dbContent = g.writeDb(dbContent, 'sInitialMode1', sInitialMode1);
    else sInitialMode1 = g.readDb(dbContent, 'sInitialMode1');
    
    if (sInitialMode2 != null) dbContent = g.writeDb(dbContent, 'sInitialMode2', sInitialMode2);
    else sInitialMode2 = g.readDb(dbContent, 'sInitialMode2');
    
    if (sInitialType1 != null) dbContent = g.writeDb(dbContent, 'sInitialType1', sInitialType1);
    else sInitialType1 = g.readDb(dbContent, 'sInitialType1');
    
    if (sInitialType2 != null) dbContent = g.writeDb(dbContent, 'sInitialType2', sInitialType2);
    else sInitialType2 = g.readDb(dbContent, 'sInitialType2');
    
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
    
    if (sNumber != null)
    {
        dbContent = g.writeDb(dbContent, 'sNumber', `${sNumber}`);
        dbContent = g.writeDb(dbContent, 'zNumber', `${sNumber === -1 ? '+' : '-'}`);
    }
    else sNumber = g.readDb(dbContent, 'sNumber');
    
    if (sLoserfinals != null) dbContent = g.writeDb(dbContent, 'sLoserfinals', sLoserfinals);
    else sLoserfinals = g.readDb(dbContent, 'sLoserfinals');
    
    if (sQualfinal != null) dbContent = g.writeDb(dbContent, 'sQualfinal', `${sQualfinal}`);
    else sQualfinal = g.readDb(dbContent, 'sQualfinal');
    
    if (sQualfinalPrize != null) dbContent = g.writeDb(dbContent, 'sQualfinalPrize', sQualfinalPrize);
    else sQualfinalPrize = g.readDb(dbContent, 'sQualfinalPrize');

    if (sRandom != null) dbContent = g.writeDb(dbContent, 'sRandom', sRandom);
    else sRandom = g.readDb(dbContent, 'sRandom');

    if (sRobber != null)
    {
        dbContent = g.writeDb(dbContent, 'sRobber', sRobber);
        dbContent = g.writeDb(dbContent, 'zRobber', `${sRobber === g.colonistDefaults.Robber ? '+' : '-'}`);
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
                case 'Heading for New Shores': case 'Fog Islands': case 'Four Islands': case 'Through the Desert': case 'New World':
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
                
                case 'New World':
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
                
                default:
                if (sPlatform === 'TwoSheep')
                {
                    if (!sVp)
                    {
                        sVp = g.readDb(dbContent, 'sVp');
                    }
                    zVp = '?';
                }
            }
            break;

            case 'Cities & Knights':
            switch (sMap)
            {
                case 'Heading for New Shores': case 'Fog Islands': case 'Four Islands': case 'Through the Desert': case 'New World':
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
                
                case 'New World':
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
                
                default:
                if (sPlatform === 'TwoSheep')
                {
                    if (!sVp)
                    {
                        sVp = g.readDb(dbContent, 'sVp');
                    }
                    zVp = '?';
                }
            }
            break;
        }
        if (!zVp && sPlatform == 'Colonist')
        {
            addErrorMessage(`The map ‘${sMap}’ isn’t available in the game mode ‘${sMode}’.`)
            zVp = '?';
        }
        if (sVp) dbContent = g.writeDb(dbContent, 'sVp', `${sVp}`);
        if (zVp) dbContent = g.writeDb(dbContent, 'zVp', `${zVp}`);
    }
    else
    {
        sVp = g.readDb(dbContent, 'sVp');
        zVp = g.readDb(dbContent, 'zVp');
        if (sPlatform == 'Colonist' && !consistentModeMap(sMode, sMap))
        {
            addErrorMessage(`The map ‘${sMap}’ isn’t available in the game mode ‘${sMode}’.`)
        }
    }
    
    if (sPlatform === 'Colonist')
    {
        if (sDice === 'Uniform Dice')
        {
            addErrorMessage(`The dice setting ‘${sDice}’ does not exist on Colonist.`)
        }
        if (sDiscard > 20)
        {
            addErrorMessage(`The discard setting can’t be set above 20 on Colonist. It’s currently set to ${sDiscard}.`)
        }
        if (!['Normal', 'Friendly'].includes(sRobber))
        {
            addErrorMessage(`The robber setting ‘${sRobber}’ does not exist on Colonist.`);
        }
        if (sSpeed === 'None')
        {
            addErrorMessage(`The speed setting ‘${sSpeed}’ does not exist on Colonist.`);
        }
        if (sVp > 20)
        {
            addErrorMessage(`The VP setting can’t be set above 20 on Colonist. It’s currently set to ${sVp}.`);
        }
        if (sInitialType1 != 0 || (sInitialType2==0)==['Cities & Knights', 'Seafarers + Cities & Knights'].includes(sMode))
        {
            addErrorMessage(`You can’t change the initial buildings in Colonist.`);
        }
    }
    else
    {
        switch (sSpeed)
        {
            case 'Very Slow': sSpeed = 'Relaxed'; break;
            case 'Slow': sSpeed = 'Classic'; break;
            case 'Normal': sSpeed = 'Rapid'; break;
            case 'Fast': sSpeed = 'Blitz'; break;
            case 'Very Fast': sSpeed = 'Bullet'; break;
            //case 'None': break;
        }
    }
    
    let botMessage = fs.readFileSync(`txt/settings.txt`, 'utf8')
        .replace(/{zBox}/g, sBox==1?'+':'-')
        .replace(/{sBox}/g, sBox)
        .replace(/{zBrackets}/g, sBrackets==4?'+':'-')
        .replace(/{sBrackets}/g, sBrackets)
        .replace(/{zDice}/g, sDice===g.colonistDefaults.Dice?'+':'-')
        .replace(/{sDice}/g, sDice)
        .replace(/{zDiscard}/g, sDiscard==7?'+':'-')
        .replace(/{sDiscard}/g, sDiscard)
        .replace(/{zInitialMode1}/g, sInitialMode1==0?'+':'-')
        .replace(/{sInitialMode1}/g, g.initialModeToName(sInitialMode1))
        .replace(/{zInitialMode2}/g, sInitialMode2==0?'+':'-')
        .replace(/{sInitialMode2}/g, g.initialModeToName(sInitialMode2))
        .replace(/{zInitialType1}/g, sInitialType1==0?'+':'-')
        .replace(/{sInitialType1}/g, g.initialTypeToName(sInitialType1))
        .replace(/{zInitialType2}/g, (sInitialType2==1)==['Cities & Knights', 'Seafarers + Cities & Knights'].includes(sMode)?'+':'-')
        .replace(/{sInitialType2}/g, g.initialTypeToName(sInitialType2))
        .replace(/{zLoserfinals}/g, (sLoserfinals==='No')!=(sType==='Cash')?'+':'-')
        .replace(/{sLoserfinals}/g, sLoserfinals)
        .replace(/{zMap}/g, sMap==='Base'?'+':'-')
        .replace(/{sMap}/g, sMap)
        .replace(/{zMode}/g, sMode==='Base'?'+':'-')
        .replace(/{sMode}/g, sMode)
        .replace(/{zNumber}/g, sNumber==-1?'+':'-')
        .replace(/{sNumber}/g, sNumber)
        .replace(/{zPlacements}/g, sPlacements=='Random'?'+':'-')
        .replace(/{sPlacements}/g, sPlacements)
        .replace(/{zPlatform}/g, sPlatform=='Colonist'?'+':'-')
        .replace(/{sPlatform}/g, sPlatform)
        .replace(/{zPlayers}/g, sPlayers==4?'+':'-')
        .replace(/{sPlayers}/g, sPlayers)
        .replace(/{zQualfinal}/g, (sQualfinal==='No')==(sType!='Open')?'+':'-')
        .replace(/{sQualfinal}/g, sQualfinal)
        .replace(/{zQualfinalPrize}/g, sQualfinalPrize==='Cash Ticket'?'+':'-')
        .replace(/{sQualfinalPrize}/g, sQualfinalPrize)
        .replace(/{zRandom}/g, sRandom==='No'?'+':'-')
        .replace(/{sRandom}/g, sRandom)
        .replace(/{zRobber}/g, sRobber===g.colonistDefaults.Robber?'+':'-')
        .replace(/{sRobber}/g, sRobber)
        .replace(/{zRound}/g, sRound==1?'+':'-')
        .replace(/{sRound}/g, sRound)
        .replace(/{zRounds}/g, (sRounds==3)!=['Cities & Knights', 'Seafarers + Cities & Knights'].includes(sMode)?'+':'-')
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
    
    
    
    if (sPlatform == 'TwoSheep')
    {
        if(sNumber == -1)
        {
            let random = 1+Math.floor(Math.random()*1000);
            addErrorMessage(`To host a tournament on TwoSheep, you have to provide ‘number’. It’s used to easily find games and replays from this tournament. The ‘number’ is our tournament number, so for tournament ${random} it’s ‘${random}’. *(Set ‘number=0’ if you only want to test!)*`);
        }
        else if (sNumber == 0)
        {
            botMessage += `\nSince ‘number’ is currently 0, this tournament is considered a test and won’t be registered by TwoSheep as a tournament. *(If this isn’t supposed to be a test, change ‘number’ to a number bigger than 0 to receive an ‘id’.)*`;
        }
        else if (sNumber < -1)
        {
            addErrorMessage(`‘number’ must not be negative.`);
        }
        else
        {
            let modeTemp;
            switch (sMode)
            {
                case 'Base': modeTemp = 'Base'; break;
                case 'Seafarers': modeTemp = 'SF'; break;
                case 'Cities & Knights': modeTemp = 'CK'; break;
                case 'Seafarers + Cities & Knights': modeTemp = 'CKSF'; break;
            }
            if (modeTemp)
            {
                id = `CC-${sType}-${sNumber}-${modeTemp}`;
                botMessage += `\nThis tournament will use the following id: ${id}`;
            }
        }
    }
    
    let players = sTables * sPlayers;
    if (sType != 'Cash' && sTables > 0)
    {
        if (sTables < 3)
        {
            if (sQualfinal == 'Yes') botMessage += `\n:warning: Since we have less than three tables, there should be no Qualfinal.`;
        }
        else if (sTables < 6)
        {
            if (sQualfinal == 'No') botMessage += `\n:warning: Since we have at least three tables, there should be a Qualfinal which has no prize.`;
            else if (sQualfinalPrize != 'Nothing') botMessage += `\n:warning: Since we have less than six tables, the Qualfinal should not have a prize.`;
        }
        else
        {
            if (sQualfinal == 'No') botMessage += `\n:warning: Since we have at least three tables, there should be a Qualfinal which gives a Cash Ticket.`;
            else if (sQualfinalPrize != 'Cash Ticket') botMessage += `\n:warning: Since we have at least six tables, the Qualfinal should give a Cash Ticket.`;
        }
    }
    
    interaction.editReply(`${create === 'New' ? 'Created' : 'Updated'} the tournament.\n\n${botMessage}`).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    if (errorMessage != '')
    {
        interaction.channel.send(`:warning: The settings are corrupted: :warning:${errorMessage}`);
        dbContent = g.writeDb(dbContent, 'corrupted', 'True');
    }
    else
    {
        dbContent = g.writeDb(dbContent, 'corrupted', 'False');
    }
    dbMessage.edit(dbContent).catch(console.error);
    
    success = errorMessage == '';
}

function addErrorMessage(message)
{
    errorMessage += `\n- ${message}`;
}

function consistentModeMap(mode, map) //in Colonist, you can’t play SF maps in Base/CK or non-SF maps in SF
{
    let sfOnly = ['Heading for New Shores', 'Four Islands', 'Fog Islands'];
    if (mode == 'Seafarers' || mode == 'Seafarers + Cities & Knights')
    {
        return sfOnly.includes(map) || ['Through the Desert', 'Earth', 'UK & Ireland'].includes(map);
    }
    else
    {
        return !sfOnly.includes(map);
    }
}