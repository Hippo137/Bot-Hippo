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
        .addSubcommand(subcommand => subcommand
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
                .setDescription('Uses previous round number if set, start with this table – defaults to 1 if omitted')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('qualfinal')
            .setDescription('Use this for the Qual Final')
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('sixteenthfinal')
            .setDescription('Use this for the sixteenthfinal')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the eigthfinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('eighthfinal')
            .setDescription('Use this for the eighthfinals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the eigthfinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('quarterfinal')
            .setDescription('Use this for the quarterfinals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the quarterfinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('semifinal')
            .setDescription('Use this for the semifinals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the semifinal. Only set this if some players skip a round.')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('final')
            .setDescription('Use this for the finals')
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Number of tables in the final. Only set this with one bracket and if some players skipped a round.')
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('tablestart')
                .setDescription('One more than the number of tables which should be skipped – defaults to 1 if omitted')
                .setRequired(false)
            )
            .addStringOption
            (option =>
                option.setName('mapkey')
                .setDescription('Custom Map on which the game should be played if TwoSheep is used')
                .setRequired(false)
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
    
    const sRounds = g.readDb(dbContent, 'sRounds');
    if (interaction.options.getSubcommand() === 'qualifier')
    {
        if (parseInt(sRound) > 1 && interaction.options.getInteger('tablestart')) sRound--; //if you set tablestart, you will not start a new round
        if (parseInt(sRound) > parseInt(sRounds))
        {
            return interaction.editReply(`‘round’ (${sRound}) must not exceed ‘rounds’ (${sRounds}.`).catch(console.error);
        }
    }
    //if (interaction.options.getSubcommand() === 'qualifier' && parseInt(sRound) > parseInt(sRounds)) return interaction.editReply(`‘round’ must not exceed ‘rounds’`).catch(console.error);
    
    const sNumber = g.readDb(dbContent, 'sNumber');
    const sPlatform = g.readDb(dbContent, 'sPlatform');
    if (sNumber < 0 && sPlatform == 'TwoSheep') return interaction.editReply(`Tournaments hosted in TwoSheep must have a ‘number’. If you want to ignore this (for example when testing), set ‘number’ to 0.`).catch(console.error);
    
    const mapKey = interaction.options.getString('mapkey')
    
    const sBox = g.readDb(dbContent, 'sBox');
    const sBrackets = g.readDb(dbContent, 'sBrackets');
    const sChatMode = g.readDb(dbContent, 'sChatMode');
    const sDice = g.readDb(dbContent, 'sDice');
    const zDice = g.readDb(dbContent, 'zDice');
    const sDiscard = g.readDb(dbContent, 'sDiscard');
    const zDiscard = g.readDb(dbContent, 'zDiscard');
    const sInitialMode1 = g.readDb(dbContent, 'sInitialMode1');
    const sInitialMode2 = g.readDb(dbContent, 'sInitialMode2');
    const sInitialType1 = g.readDb(dbContent, 'sInitialType1');
    const sInitialType2 = g.readDb(dbContent, 'sInitialType2');
    const sLoserfinals = g.readDb(dbContent, 'sLoserfinals');
    const sMap = g.readDb(dbContent, 'sMap');
    const zMap = g.readDb(dbContent, 'zMap');
    const sMode = g.readDb(dbContent, 'sMode');
    const zMode = g.readDb(dbContent, 'zMode');
    const zNumber = g.readDb(dbContent, 'zNumber');
    const sPlacements = g.readDb(dbContent, 'sPlacements');
    const zPlacements = g.readDb(dbContent, 'zPlacements');
    const zPlatform = g.readDb(dbContent, 'zPlatform');
    const sPlayers = g.readDb(dbContent, 'sPlayers');
    const zPlayers = g.readDb(dbContent, 'zPlayers');
    const sQualfinal = g.readDb(dbContent, 'sQualfinal');
    const sQualfinalPrize = g.readDb(dbContent, 'sQualfinalPrize');
    const sRandom = g.readDb(dbContent, 'sRandom');
    const sRobber = g.readDb(dbContent, 'sRobber');
    const zRobber = g.readDb(dbContent, 'zRobber');
    const sSpecial = g.readDb(dbContent, 'sSpecial');
    const zSpecial = g.readDb(dbContent, 'zSpecial');
    const sSpeed = g.readDb(dbContent, 'sSpeed');
    const sTables = g.readDb(dbContent, 'sTables');
    const sTradeMode = g.readDb(dbContent, 'sTradeMode');
    const sType = g.readDb(dbContent, 'sType');
    const sVp = g.readDb(dbContent, 'sVp');
    const zVp = g.readDb(dbContent, 'zVp');
    const sTeamsize = g.readDb(dbContent, 'sTeamsize');
    

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
            if (sType === 'Weekday')
            {
                extraMessage2 += `There is a Final for the Top ${sPlayers/sTeamsize} after this match. You might be in with a good performance.`
            }
            else if (sQualfinal === 'Yes')
            {
                extraMessage2 += `There is a Qual Final for the Top ${sPlayers/sTeamsize} after this match. You might be in with a good performance.`
                switch (sQualfinalPrize)
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

        case 'qualfinal':
        if (sType == 'Weekday')
        {
            return interaction.editReply(`Weekday tournaments don’t have a Qualfinal. Use ‘tablespam final’ instead.`).catch(console.error);
        }
        intro = 'Qual Final';
        //roomname = `CC${sType} Qualfinal`;
        switch (sQualfinalPrize)
        {
            case 'Cash Ticket':
            extraMessage2 += 'Win this match to win a free entry to a future Cash Tournament.';
            break;

            case 'Final Spot':
            extraMessage2 += 'Win this match to win a guaranteed spot in the final. :trophy:'
            break;
            
            case 'Nothing':
            extraMessage2 += 'This is your very last match in this qualifier. :slight_smile:';
            break;
        }
        tableEnd = 1;
        link = 'QF';
        message = 'Posted the Qual Final.';
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
        case 'CoastSingle':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Coastal Start’. Everyone has to place one of their initial buildings on at least one water tile. No exceptions!`;
        break;
        
        case 'CoastDouble':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Double Coastal Start’. Everyone has to place both of their initial buildings on at least one water tile. No exceptions!`;
        break;
        
        case 'CoastFirst':
        extraMessage2 += '\n\n:warning: Remember that this game is played with the special rule ‘First Settlement on Coast’. Everyone has to place their very first settlement on at least one water tile. No exceptions!';
        break;
        
        case 'Goon':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Goon’. Everyone has to place one of their initial buildings on only a single hex. The desert counts as a hex. No exceptions!`;
        break;
        
        case 'Ntnt':
        extraMessage2 += '\n\n:warning: Remember that this game is played with the special rule ‘NTNT’. No messages, no talking, no trades until the game officially ended. No exceptions!';
        break;
        
        case 'Port0':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Ports are for the weak’. For the entire game, you are not allowed to settle a port. No exceptions!`;
        break;
        
        case 'PortFirst':
        extraMessage2 += '\n\n:warning: Remember that this game is played with the special rule ‘First Settlement on Port’. Everyone has to place their very first settlement on a port. No exceptions!';
        break;
        
        case 'Resources3':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Three Resources’. Everyone has to place their initial buildings in a way such that you only produce a maximum of three different resources. No exceptions!`;
        break;
        
        case 'Resources4':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Four Resources’. Everyone has to place their initial buildings in a way such that you only produce a maximum of four different resources. No exceptions!`;
        break;
        
        case 'SBS':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Side-By-Side’. Your initial buildings must be two or three roads apart. No exceptions!`;
        break;
        
        case 'ASBS':
        extraMessage2 += `\n\n:warning: Remember that this game is played with the special rule ‘Anti-Side-By-Side’. Your initial buildings must be at least five roads apart. No exceptions!`;
        break;
        
        case 'Bingo':
        extraMessage2 += `\n\n:warning: Remember that this game is played with special ‘Bingo’ rules!`;
        break;
    }
    
    link = link.replace(/{sRound}/g, sRound);
    let platformLink, twoSheepData;
    switch (sPlatform)
    {
        case 'Colonist':
        platformLink = 'colonist.io/#';
        break;
        
        case 'TwoSheep':
        platformLink = 'twosheep.io/lobby/';
        let twoSheepMap; //gamemode aka map for TwoSheep;
        switch (sMap)
        {
            case 'Base': twoSheepMap = 0; break;
            case 'Base 5-6 Player': twoSheepMap = 1; break;
            case 'Base 7-8 Player': twoSheepMap = 3; break;
            case 'Base Random': twoSheepMap = 8; break;
            case 'Black Forest': twoSheepMap = -1; break;
            case 'Diamond', 'Diamond': twoSheepMap = -1; break;
            case 'Earth', 'Earth': twoSheepMap = -1; break;
            case 'Heading for New Shores', 'Heading for New Shores': twoSheepMap = 11; break;
            case 'Fog Islands', 'Fog Islands': twoSheepMap = 15; break;
            case 'Four Islands', 'Four Islands': twoSheepMap = 13; break;
            case 'Gear', 'Gear': twoSheepMap = -1; break;
            case 'Gold Rush', 'Gold Rush': twoSheepMap = -1; break;
            case 'Lakes', 'Lakes': twoSheepMap = -1; break;
            case 'New World', 'New World': twoSheepMap = 18; break;
            case 'Pond', 'Pond': twoSheepMap = -1; break;
            case 'UK & Ireland', 'UK & Ireland': twoSheepMap = -1; break;
            case 'USA', 'USA': twoSheepMap = -1; break;
            case 'Shuffle Board', 'Shuffle Board': twoSheepMap = -1; break;
            case 'Through the Desert', 'Through the Desert': twoSheepMap = 17; break;
            case 'Twirl', 'Twirl': twoSheepMap = -1; break;
            case 'Volcano', 'Volcano': twoSheepMap = -1; break;
        }
        if (twoSheepMap == -1) return interaction.editReply(`The map ${sMap} doesn’t exist on TwoSheep or was not implemented to this bot yet.`).catch(console.error);
        
        let twoSheepDice;
        switch (sDice)
        {
            case 'Random Dice': twoSheepDice = 0; break;
            case 'Balanced Dice': twoSheepDice = 1; break;
            case 'Uniform Dice': twoSheepDice = 2; break;
        }
        
        let twoSheepPlacements = sPlacements === 'Random';
        
        let twoSheepRobber;
        switch (sRobber)
        {
            case 'Normal': twoSheepRobber = 0; break;
            case 'Friendly': twoSheepRobber = 1; break;
            case 'Lazy': twoSheepRobber = 2; break;
            case 'Smelly': twoSheepRobber = 3; break;
            case 'Red': twoSheepRobber = 4; break;
            case 'Junior': twoSheepRobber = 5; break;
        }
        
        let twoSheepSpeed;
        switch (sSpeed)
        {
            case 'Very Slow': twoSheepSpeed = 5; break;
            case 'Slow': twoSheepSpeed = 1; break;
            case 'Normal': twoSheepSpeed = 2; break;
            case 'Fast': twoSheepSpeed = 3; break;
            case 'Very Fast': twoSheepSpeed = 4; break;
            case 'None': twoSheepSpeed = 0; break;
        }
        
        let id = '';
        if (sNumber > 0)
        {
            let modeTemp;
            switch (sMode)
            {
                case 'Base': modeTemp = 'Base'; break;
                case 'Seafarers': modeTemp = 'SF'; break;
                case 'Cities & Knights': modeTemp = 'CK'; break;
                case 'Seafarers + Cities & Knights': modeTemp = 'CKSF'; break;
            }
            if (modeTemp) id = `CC-${sType}-${sNumber}-${modeTemp}`;
        }
        
        let twoSheepChatMode;
        switch (sChatMode)
        {
            case 'Full': twoSheepChatMode = 0; break;
            case 'Canned': twoSheepChatMode = 1; break;
            case 'None': twoSheepChatMode = 2; break;
        }
        
        let twoSheepTradeMode;
        switch (sTradeMode)
        {
            case 'Full': twoSheepTradeMode = 0; break;
            case 'Bank': twoSheepTradeMode = 1; break;
            case 'None': twoSheepTradeMode = 2; break;
        }
        
        twoSheepData =
        {
            lobbyId: 'temp', //at the bottom because it isn’t the same for all tables
            apiKey: process.env.TWOSHEEPAPIKEY,
            tournament: true,
            tournamentId: id,
            mapKey: mapKey,
            options: 
            {
                ps : parseInt(sPlayers), //players
                gM : twoSheepMap, //gameMode
                //t : //theme
                mRBR : parseInt(sDiscard), //maxResourcesBeforeRobber
                wVPA : parseInt(sVp), //winVPAmount
                //sd : //seed
                //nR : //numRoads
                //nC : //numCities
                //nS : //numSettlements
                rM : twoSheepRobber, //robberMode
                fS : parseInt(sInitialType1), //firstSettle
                sS : parseInt(sInitialType2), //secondSettle,
                sf : sMode == 'Seafarers' || sMode == 'Seafarers + Cities & Knights', //seafarers
                ck : sMode == 'Cities & Knights' || sMode == 'Seafarers + Cities & Knights', //citiesAndKnights
                //nSh : //numShips
                //nW : //numWalls
                //nk : //numKnights
                //rTL : //restrictFoundingToLargestIsland
                //dCC : //devCardCounts
                dM : twoSheepDice, //diceMode
                fSM : parseInt(sInitialMode1), //firstSettleMode
                sSM : parseInt(sInitialMode2), //secondSettleMode
                //iV : //newIslandVPBonuses
                //oV : //overrideVPPerStructure
                //d : //countDesertAsWaterForIslandCalc
                //nd : //noDuplicateAdjacentNumbers
                //sR : //startingResourceCount
                //sC : //startingCommodityCount
                //iLR : //islandLockRobber
                //r : //robber
                //p : //pirate
                //h : //harborMaster
                //dh : //dynamicHex
                //BT : //firstBarbTimer
                //Bt : //barbarianTimer
                //KE : //ckKnightErrant
                //ES : //ckEasyStart
                //s : //shuffleMode
                //mPC : //maxProgressCards
                //bR : //bankResourceSetting
                //R : //randomizeMapMode
                RP : twoSheepPlacements, //randomizePlacementOrder
                gS : twoSheepSpeed,//gameSpeedMode
                cM : twoSheepChatMode, //chatMode
                tM : twoSheepTradeMode //tradeMode
            }
        };
    }
    
    let gameIDs = []; //links
    for (let i=tableStart; i<=tableEnd; i++)
    {
        let linkTemp = link;
        let randomLetters = '';
        if (sRandom === 'Yes')
        {
            for (let i=0; i<3; i++)
            {
                randomLetters += g.symbols[Math.floor(Math.random()*g.symbols.length)];
            }
        }
        let table = i;
        if (interaction.options.getSubcommand() === 'final')
        {
            if (i > sBrackets)
            {
                table = sBrackets * (sPlayers / sTeamsize - 1) + i;
                linkTemp = linkTemp.replace(/{X}/g, 'L');
            }
            else
            {
                linkTemp = linkTemp.replace(/{X}/g, 'F');
            }
        }
        linkTemp = linkTemp.replace(/{sTable}/g, table<10?'0'+table:table) + randomLetters;
        gameIDs.push(linkTemp);
        
        
        if (sPlatform == 'TwoSheep')
        {
            let twoSheepDataTemp = Object.assign({}, twoSheepData);
            twoSheepDataTemp.lobbyId = linkTemp;
            //console.log(twoSheepDataTemp);
            const response = await fetch
            (
                'https://twosheep.io/api/createLobby',
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(twoSheepDataTemp)
                }
            )
            .catch((error) => console.error('Error:', error));
            //console.log(response)
            //console.log(response.status)
            if (response.status != 200)
            {
                let m = `TwoSheep couldn’t create the lobby ${linkTemp} with reason ${response.status}.`;
                switch (response.status) //in case I will ever have a complete list of error codes
                {
                    case 409:
                    if (sRandom === 'No') m += ` A lobby with the link ‘${linkTemp}’ already exists. You might want to set ‘random=Yes’ and try again.`;
                    return interaction.editReply(m).catch(console.error);
                }
            }
        }
    }
    
    
    let botMessage = fs.readFileSync(`txt/blank${sPlatform}.txt`, 'utf8')
        .replace(/{intro}/g, intro)
        //.replace(/{link}/g, link)
        //.replace(/{roomname}/g, roomname)
        .replace(/{zRobber}/g, zRobber)
        .replace(/{sRobber}/g, sRobber)
        .replace(/{zMode}/g, zMode)
        .replace(/{sMode}/g, sMode)
        .replace(/{zMap}/g, mapKey && sPlatform == 'TwoSheep' ? '-' : zMap)
        .replace(/{sMap}/g, mapKey && sPlatform == 'TwoSheep' ? 'Custom' : sMap)
        .replace(/{zDice}/g, zDice)
        .replace(/{sDice}/g, sDice)
        .replace(/{zSpeed}/g, sSpeed===g.lobbyDefaults(sPlatform, 'Speed')?'+':'-')
        .replace(/{sSpeed}/g, g.displaySpeed(sPlatform, sSpeed))
        .replace(/{platformLink}/g, platformLink)
        .replace(/{zPlayers}/g, zPlayers)
        .replace(/{sPlayers}/g, sPlayers)
        .replace(/{zDiscard}/g, zDiscard)
        .replace(/{sDiscard}/g, sDiscard)
        .replace(/{zVp}/g, zVp)
        .replace(/{sVp}/g, sVp)
        .replace(/{zInitialMode1}/g, sInitialMode1==0?'+':'-')
        .replace(/{sInitialMode1}/g, g.initialModeToName(sInitialMode1))
        .replace(/{zInitialMode2}/g, sInitialMode2==0?'+':'-')
        .replace(/{sInitialMode2}/g, g.initialModeToName(sInitialMode2))
        .replace(/{zInitialType1}/g, sInitialType1==0?'+':'-')
        .replace(/{sInitialType1}/g, g.initialTypeToName(sInitialType1))
        .replace(/{zInitialType2}/g, (sInitialType2==1)==['Cities & Knights', 'Seafarers + Cities & Knights'].includes(sMode)?'+':'-')
        .replace(/{sInitialType2}/g, g.initialTypeToName(sInitialType2))
        .replace(/{sType}/g, sType)
        .replace(/{roundName}/g, roundName[sRound>=sRounds ? 0 : sRound])
        .replace(/{screenshotMessage}/g, screenshotMessage)
        .replace(/{extraMessage1}/g, extraMessage1)
        .replace(/{extraMessage2}/g, extraMessage2)
        .replace(/{screenshots}/g, interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
        //.replace(/{screenshots}/g, interaction.guild.channels.cache.get('894372076884992015'));
    //console.log(botMessage)
    
    
    let linkIndex = 0;
    for (let i=tableStart; i<=tableEnd; i++)
    {
        let table = i;
        if (interaction.options.getSubcommand() === 'final')
        {
            if (i > sBrackets)
            {
                table = sBrackets * (sPlayers / sTeamsize - 1) + i;
                botMessage = botMessage.replace(/{finalName}/g, 'Loserfinal');
            }
            else
            {
                botMessage = botMessage.replace(/{finalName}/g, 'Final');
            }
        }
        let channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `table-`+table);
        if (channelTarget)
        {
            channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            channelTarget.send(botMessage.replace(/{link}/g, gameIDs[linkIndex]));
        }
        if (sSpecial !== 'Ntnt') //don’t open voice channels in NTNT tournaments
        {
            channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `table `+table);
            if (channelTarget)
            {
                channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            }
        }
        linkIndex++;
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
    
    if (sType == 'Open')
    {
        switch (interaction.options.getSubcommand())
        {
            case 'qualifier': case 'qualfinal':

            let players = sTables * sPlayers;
            if (sTables < 3)
            {
                if (sQualfinal == 'Yes') interaction.channel.send(`:warning: Since we have less than three tables, there should be no Qualfinal. ${interaction.user}`);
            }
            else if (sTables < 6)
            {
                if (sQualfinal == 'No') interaction.channel.send(`:warning: Since we have at least three tables, there should be a Qualfinal which has no prize. ${interaction.user}`);
                else if (sQualfinalPrize != 'Nothing') interaction.channel.send(`:warning: Since we have less than six tables, the Qualfinal should not have a prize. ${interaction.user}`);
            }
            else
            {
                if (sQualfinal == 'No') interaction.channel.send(`:warning: Since we have at least three tables, there should be a Qualfinal which gives a Cash Ticket. ${interaction.user}`);
                else if (sQualfinalPrize != 'Cash Ticket') interaction.channel.send(`:warning: Since we have at least six tables, the Qualfinal should give a Cash Ticket. ${interaction.user}`);
            }
        }
    }
        
    
    //console.log(dbContent);
    dbMessage.edit(dbContent).catch(console.error);
    success = true;
}