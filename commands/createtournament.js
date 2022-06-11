require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createtournament')
        .setDescription('Create a tournament')
        //.setDefaultPermission(false)
        .addStringOption
        (option =>
            option.setName('create')
            .setDescription('New=default if omitted, Update=ignored if omitted, restart=only resets round to 1 and tables to 0')
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
            .addChoice('Base Random', 'Base Random')
            .addChoice('Shuffle Board', 'Shuffle Board')
            .addChoice('Black Forest', 'Black Forest')
            .addChoice('Earth', 'Earth')
            .addChoice('Heading for New Shores', 'Heading for New Shores')
            .addChoice('Four Islands', 'Four Islands')
            .addChoice('Fog Islands', 'Fog Islands')
            .addChoice('Through the Desert', 'Through the Desert')
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
            option.setName('prize')
            .setDescription('What does winning the Day Final reward? – defaults to CASH TICKET if omitted')
            .setRequired(false)
            .addChoice('Cash Ticket', 'Cash Ticket')
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
        //interaction.channel.send('0');
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        //let messages = await interaction.client.channels.cache.get('862422544652828713').messages;
        let dbContent, dbMessage;
        await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE).then(async dbMsg =>
        {
            dbMessage = dbMsg;
            dbContent = dbMessage.content;
            
            const create = interaction.options.getString('create');

            if (create === 'Restart')
            {
                dbContent = writeDb(dbContent, 'sRound', '1'); //sRound
                dbContent = writeDb(dbContent, 'sTables', '0'); //sTables

                //log(interaction);
                return await interaction.editReply(`Successfully restarted the tournament.`).catch(console.error);
            }
            let sBox = interaction.options.getInteger('box');
            let sBrackets = interaction.options.getInteger('brackets');
            let sDayfinal = interaction.options.getString('dayfinal');
            let sDice = interaction.options.getString('dice');
            let sDiscard = interaction.options.getInteger('discard');
            let sLoserfinals = interaction.options.getString('loserfinal');
            let sMap = interaction.options.getString('map');
            let sMode = interaction.options.getString('mode');
            let sPlayers = interaction.options.getInteger('players');
            let sPrize = interaction.options.getString('prize');
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
                sDice = sDice ?? 'Random Dice';
                sDiscard = sDiscard ?? 7;
                //sLoserfinals = sLoserfinals ?? 'No'; //at the bottom because it depends on sType
                sMap = sMap ?? 'Base';
                sMode = sMode ?? 'Base';
                sPlayers = sPlayers ?? 4;
                sPrize = sPrize ?? 'Cash Ticket';
                sRandom = sRandom ?? 'No';
                sRobber = sRobber ?? 'No';
                sRound = sRound ?? 1;
                //sRounds = sRounds ?? 3; //at the bottom because it depends on the sMode
                sSpeed = sSpeed ?? 'Fast';
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
                dbContent = writeDb(dbContent, 'sPlayers', `${sPlayers}`);
                dbContent = writeDb(dbContent, 'zPlayers', `${sPlayers === 4 ? '+' : '-'}`);
            }
            else sPlayers = readDb(dbContent, 'sPlayers');

            if (sTeamsize != null) dbContent = writeDb(dbContent, 'sTeamsize', `${sTeamsize}`);
            else sTeamsize = readDb(dbContent, 'sTeamsize');

            if (sPlayers % sTeamsize != 0)
            {
                dbContent = writeDb(dbContent, 'corrupted', 'True');
                return await interaction.editReply(`The number of players per match must be divisible by the number of winners in a match.`).catch(console.error);
            }
            if (sPlayers <= sTeamsize)
            {
                dbContent = writeDb(dbContent, 'corrupted', 'True');
                return await interaction.editReply(`The number of players per match must be higher than the number of winners in a match.`).catch(console.error);
            }

            if (sBox != null) dbContent = writeDb(dbContent, 'sBox', `${sBox}`);
            else sBox = readDb(dbContent, 'sBox');

            if (sBrackets != null) dbContent = writeDb(dbContent, 'sBrackets', `${sBrackets}`);
            else sBrackets = readDb(dbContent, 'sBrackets');

            if (sDayfinal != null) dbContent = writeDb(dbContent, 'sDayfinal', `${sDayfinal}`);
            else sDayfinal = readDb(dbContent, 'sDayfinal');

            if (sDice != null)
            {
                dbContent = writeDb(dbContent, 'sDice', `${sDice}`);
                dbContent = writeDb(dbContent, 'zDice', `${sDice === 'Random Dice' ? '+' : '-'}`);
            }
            else sDice = readDb(dbContent, 'sDice');

            if (sDiscard != null)
            {
                dbContent = writeDb(dbContent, 'sDiscard', `${sDiscard}`);
                dbContent = writeDb(dbContent, 'zDiscard', `${sDiscard === 7 ? '+' : '-'}`);
            }
            else sDiscard = readDb(dbContent, 'sDiscard');

            if (sLoserfinals != null) dbContent = writeDb(dbContent, 'sLoserfinals', `${sLoserfinals}`);
            else sLoserfinals = readDb(dbContent, 'sLoserfinals');

            if (sMap != null)
            {
                dbContent = writeDb(dbContent, 'sMap', sMap);
                dbContent = writeDb(dbContent, 'zMap', sMap === 'Base' ? '+' : '-');
            }
            else sMap = readDb(dbContent, 'sMap');

            if (sMode != null)
            {
                dbContent = writeDb(dbContent, 'sMode', sMode);
                dbContent = writeDb(dbContent, 'zMode', sMode === 'Base' ? '+' : '-');
            }
            else sMode = readDb(dbContent, 'sMode');

            if (sPrize != null) dbContent = writeDb(dbContent, 'sPrize', `${sPrize}`);
            else sPrize = readDb(dbContent, 'sPrize');

            if (sRandom != null) dbContent = writeDb(dbContent, 'sRandom', `${sRandom}`);
            else sRandom = readDb(dbContent, 'sRandom');

            if (sRobber != null)
            {
                dbContent = writeDb(dbContent, 'sRobber', `${sRobber}`);
                dbContent = writeDb(dbContent, 'zRobber', `${sRobber === 'No' ? '+' : '-'}`);
            }
            else sRobber = readDb(dbContent, 'sRobber');

            if (sRound != null) dbContent = writeDb(dbContent, 'sRound', `${sRound}`);
            else sRound = readDb(dbContent, 'sRound');

            if (sRounds != null) dbContent = writeDb(dbContent, 'sRounds', `${sRounds}`);
            else sRounds = readDb(dbContent, 'sRounds');

            if (sSpeed != null)
            {
                dbContent = writeDb(dbContent, 'sSpeed', `${sSpeed}`);
                dbContent = writeDb(dbContent, 'zSpeed', `${sSpeed === 'Fast' ? '+' : '-'}`);
            }
            else sSpeed = readDb(dbContent, 'sSpeed');

            if (sTables != null) dbContent = writeDb(dbContent, 'sTables', `${sTables}`);
            else sTables = readDb(dbContent, 'sTables');
            
            if (sType != null) dbContent = writeDb(dbContent, 'sType', sType);
            else sType = readDb(dbContent, 'sType');

            let zVp;
            if (updateVP)
            {
                switch (sMode)
                {
                    case 'Base':
                    switch (sMap)
                    {
                        case 'Base': case 'Base Random': case 'Shuffle Board': case 'Black Forest': case 'Earth':
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
                        if (!sVp) sVp = 13;
                        zVp = sVp === 13 ? '+' : '-';
                        break;
                    }
                    break;

                    case 'Cities & Knights':
                    switch (sMap)
                    {
                        case 'Base': case 'Base Random': case 'Shuffle Board': case 'Black Forest': case 'Earth':
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
                    }
                    break;
                }

                if (!zVp)
                {
                    dbContent = writeDb(dbContent, 'corrupted', 'True');
                    return await interaction.editReply(`The map ‘${sMap}’ isn’t available in the game mode ‘${sMode}’!`).catch(console.error);
                }
                dbContent = writeDb(dbContent, 'sVp', `${sVp}`);
                dbContent = writeDb(dbContent, 'zVp', `${zVp}`);
                dbContent = writeDb(dbContent, 'corrupted', 'False');
            }
            else
            {
                sVp = readDb(dbContent, 'sVp');
                zVp = readDb(dbContent, 'zVp');
                if (readDb(dbContent, 'corrupted') == 'True') return await interaction.editReply(`The map ‘${sMap}’ isn’t available in the game mode ‘${sMode}’!`).catch(console.error);
            }

            let botMessage = fs.readFileSync(`txt/settings.txt`, 'utf8')
                .replace(/{zType}/g, sType==='Open'?'+':'-')
                .replace(/{sType}/g, sType)
                .replace(/{zTables}/g, sTables==0?'+':'-')
                .replace(/{sTables}/g, sTables)
                .replace(/{zRound}/g, sRound==1?'+':'-')
                .replace(/{sRound}/g, sRound)
                .replace(/{zRounds}/g, (sRounds==3)!=(sMode==='Cities & Knights'||sMode==='Seafarers + Cities & Knights')?'+':'-')
                .replace(/{sRounds}/g, sRounds)
                .replace(/{zDayfinal}/g, sDayfinal==='No'?'+':'-')
                .replace(/{sDayfinal}/g, sDayfinal)
                .replace(/{zPrize}/g, sPrize==='Cash Ticket'?'+':'-')
                .replace(/{sPrize}/g, sPrize)
                .replace(/{zBrackets}/g, sBrackets==4?'+':'-')
                .replace(/{sBrackets}/g, sBrackets)
                .replace(/{zLoserfinals}/g, (sLoserfinals==='No')!=(sType==='Cash')?'+':'-')
                .replace(/{sLoserfinals}/g, sLoserfinals)
                .replace(/{zTeamsize}/g, sTeamsize==1?'+':'-')
                .replace(/{sTeamsize}/g, sTeamsize)
                .replace(/{zRandom}/g, sRandom==='No'?'+':'-')
                .replace(/{sRandom}/g, sRandom)
                .replace(/{zRobber}/g, sRobber==='No'?'+':'-')
                .replace(/{sRobber}/g, sRobber)
                .replace(/{zMode}/g, sMode==='Base'?'+':'-')
                .replace(/{sMode}/g, sMode)
                .replace(/{zMap}/g, sMap==='Base'?'+':'-')
                .replace(/{sMap}/g, sMap)
                .replace(/{zDice}/g, sDice==='Random Dice'?'+':'-')
                .replace(/{sDice}/g, sDice)
                .replace(/{zSpeed}/g, sSpeed==='Fast'?'+':'-')
                .replace(/{sSpeed}/g, sSpeed)
                .replace(/{zPlayers}/g, sPlayers==4?'+':'-')
                .replace(/{sPlayers}/g, sPlayers)
                .replace(/{zDiscard}/g, sDiscard==7?'+':'-')
                .replace(/{sDiscard}/g, sDiscard)
                .replace(/{zVp}/g, zVp)
                .replace(/{sVp}/g, sVp)
                .replace(/{zWinner}/g, sTeamsize===1?'+':'-')
                .replace(/{sTeamsize}/g, sTeamsize)
                .replace(/{zBox}/g, sBox==1?'+':'-')
                .replace(/{sBox}/g, sBox);

            //await interaction.editReply(`Successfully ${create === 'New' ? 'created' : 'updated'} the tournament.`).catch(console.error); //error handling in case the message was manually removed in the meantime
            await interaction.editReply(`Successfully ${create === 'New' ? 'created' : 'updated'} the tournament.\n\n${botMessage}`).catch(console.error); //error handling in case the message was manually removed in the meantime
        });
        dbMessage.edit(dbContent).catch(console.error);
        log(interaction);
	}
}

function readDb(message, type)
{
    let title = `\n${type}:`;
    let index = message.indexOf(title);
    if (index == -1) return console.log(`Type ${type} not found in the database`);
    index += title.length + 1;
    let endIndex = message.indexOf(`\n`, index);
    if (endIndex == -1) return message.substring(index, message.length);
    else return message.substring(index, endIndex);
}

function writeDb(message, type, newValue)
{
    let title = `\n${type}:`;
    let index = message.indexOf(title);
    if (index == -1) return console.log(`Type ${type} not found in the database`);
    index += title.length + 1;
    let endIndex = message.indexOf(`\n`, index);
    if (endIndex == -1) return `${message.substring(0, index)}${newValue}`;
    else return `${message.substring(0, index)}${newValue}${message.substring(endIndex, message.length)}`;
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}