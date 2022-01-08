const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tablespam')
        .setDescription('Automate the table messages for tournaments')
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
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        let messages = await interaction.client.channels.cache.get('862422544652828713').messages;
        
        if (await readDb(messages, '906253957180051506') !== 'False') return await interaction.editReply('The tournament settings are corrupted. Please create a new tournament or fix the corruption.').catch(console.error);
        
        const tableStart = interaction.options.getInteger('tablestart') ?? 1;
        let tableEnd = interaction.options.getInteger('tableend');
        
        if (interaction.options.getSubcommand() === 'qualifier')
        {
            if (tableEnd != undefined) await writeDb(messages, '906261691610845195', `${tableEnd}`);
            else tableEnd = parseInt(await readDb(messages, '906261691610845195'));

            if (tableEnd === 0) return await interaction.editReply(`Set either ‘tables’ or ‘tableEnd’ to something higher than 0.`).catch(console.error);
            if (tableStart > tableEnd) return await interaction.editReply(`‘tablestart’ must not exceed ‘tableend’/‘tables’`).catch(console.error);
        }
        
        
        const sRounds = await readDb(messages, '905946342617141308');
        const sRound = await readDb(messages, '905946389748543488');
        if (interaction.options.getSubcommand() === 'qualifier' && parseInt(sRound) > parseInt(sRounds)) return await interaction.editReply(`‘round’ must not exceed ‘rounds’`).catch(console.error);
        const sType = await readDb(messages, '905945127900573747');
        const sMode = await readDb(messages, '905945387360202823');
        const zMode = await readDb(messages, '905945487390171146');
        const sMap = await readDb(messages, '905945543115669574');
        const zMap = await readDb(messages, '905945613114413076');
        const sPlayers = await readDb(messages, '905945688976818187');
        const zPlayers = await readDb(messages, '905945741216862229');
        const sSpeed = await readDb(messages, '905945792567722046');
        const zSpeed = await readDb(messages, '905945832971444244');
        const sDice = await readDb(messages, '905945929490763797');
        const zDice = await readDb(messages, '905945972914397245');
        const sRobber = await readDb(messages, '905946115566895176');
        const zRobber = await readDb(messages, '905946151008735293');
        const sBox = await readDb(messages, '905983214122840125');
        const sDayfinal = await readDb(messages, '906247072406175795');
        const sPrize = await readDb(messages, '906247110666625115');
        const sDiscard = await readDb(messages, '906250774105960448');
        const zDiscard = await readDb(messages, '906250873414492170');
        const sRandom = await readDb(messages, '906260752300666911');
        const sTables = await readDb(messages, '906261691610845195');
        const sVp = await readDb(messages, '905946023166353420')
        const zVp = await readDb(messages, '905946057194766366')
        const sLoserfinal = await readDb(messages, '906512049096503296')
        const sBrackets = await readDb(messages, '906512009649061888')
        
        if (interaction.options.getSubcommand() === 'settings')
        {
            let botMessage = fs.readFileSync(`txt/settings.txt`, 'utf8')
                .replace(/{zType}/g, sType==='Open'?'+':'-')
                .replace(/{sType}/g, sType)
                .replace(/{zTables}/g, sTables==0?'+':'-')
                .replace(/{sTables}/g, sTables)
                .replace(/{zRound}/g, sRound==1?'+':'-')
                .replace(/{sRound}/g, sRound)
                .replace(/{zRounds}/g, sRounds==3?'+':'-')
                .replace(/{sRounds}/g, sRounds)
                .replace(/{zDayfinal}/g, sDayfinal==='No'?'+':'-')
                .replace(/{sDayfinal}/g, sDayfinal)
                .replace(/{zPrize}/g, sPrize==='Cash Ticket'?'+':'-')
                .replace(/{sPrize}/g, sPrize)
                .replace(/{zBrackets}/g, sBrackets==4?'+':'-')
                .replace(/{sBrackets}/g, sBrackets)
                .replace(/{zLoserfinal}/g, sLoserfinal=='Yes'?'+':'-')
                .replace(/{sLoserfinal}/g, sLoserfinal)
                .replace(/{zRandom}/g, sRandom==='No'?'+':'-')
                .replace(/{sRandom}/g, sRandom)
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
                .replace(/{sVp}/g, sVp);
            
            
            return await interaction.editReply(botMessage);
        }
        
        
        
        const roundName = ['last', 'first', 'second', 'third', 'fourth'];
        const intNames = ['zero', 'one', 'two', 'three', 'four, five, six'];
        
        let screenshotMessage = '', extraMessage = '';
        let remainingRounds = sRounds - sRound;
        
        if (sBox > 1)
        {
            screenshotMessage = 'After each match, the winner posts a screenshot of the game end screen in';
            extraMessage = `You will play a total of ${intNames[sBox]} matches with the same opponent${sPlayers>2?'s':''} in this round. Use the ‘Rematch’ button after a match ends to create a new lobby.\n`;
        }
        else screenshotMessage = 'After the match, the winner posts a screenshot of the game end screen in';
        
        
        
        let intro, roomname, message, link;
        switch (interaction.options.getSubcommand())
        {
            case 'qualifier':
            intro = `${roundName[sRound>=sRounds ? 0 : sRound]} qualifying round`;
            roomname = `CC${sType} Round ${sRound} Table {sTable}`;
            if (remainingRounds == 0)
            {
                if (sDayfinal === 'Yes')
                {
                    extraMessage += 'There is a Day Final for the Top 4 after this match. You might be in with a good performance.'
                    if (sPrize == 'Cash Ticket') extraMessage += ' Don’t miss your chance to win a cash tournament ticket. :money_with_wings:'
                }
                else extraMessage += 'This is the last round in the qualifier.';
            }
            else extraMessage += `In this qualifier, everyone will play ${intNames[remainingRounds]} more ${remainingRounds>1?'rounds':'round'} after this round.`;
            message = `Posted Round ${sRound}.`;
            link = 'R{sRound}T{sTable}'
            break;
            
            case 'dayfinal':
            intro = 'Dayfinal';
            roomname = `CC${sType} Dayfinal`;
            if (sPrize === 'Cash Ticket') extraMessage += 'Win this match to win a free entry to a future Cash Tournament.';
            else extraMessage += 'This is your very last match in this qualifier. :smile:';
            tableEnd = 1;
            link = 'DF'
            message = 'Posted the Dayfinal.';
            break;
            
            case 'quarterfinal':
            intro = 'Quarterfinal';
            roomname = `CC${sType} Quarterfinal Table {sTable}`;
            extraMessage += 'Win this match to advance to the Semifinal.'
            if (!tableEnd) tableEnd = sBrackets * sPlayers * 2;
            link = 'QT{sTable}'
            message = 'Posted the Quarterfinal.';
            break;
            
            case 'semifinal':
            intro = 'Semifinal';
            roomname = `CC${type} Semifinal Table {sTable}`;
            if (sLoserfinal === 'Yes') extraMessage += 'Everyone plays one more match after this one.';
            else extraMessage += 'Win this match to advance to the Final.';
            if (!tableEnd) tableEnd = sBrackets * sPlayers;
            link = 'ST{sTable}';
            message = 'Posted the Semifinal.';
            break;
            
            case 'final':
            intro = '{finalName}';
            roomname = `CC${type} {finalName} Table {table}`;
            extraMessage += 'This is your last match in the tournament.'
            if (!tableEnd || sBrackets>1) tableEnd = sBrackets * (sLoserfinal === 'Yes' ? sPlayers : 1);
            link = '{X}T{sTable}';
            message = 'Posted the Final.';
            break;
        }
        let botMessage = fs.readFileSync(`txt/blank.txt`, 'utf8')
            .replace(/{intro}/g, intro)
            .replace(/{link}/g, link)
            .replace(/{roomname}/g, roomname)
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
            .replace(/{extraMessage}/g, extraMessage)
            .replace(/{screenshots}/g, await interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
            //.replace(/{screenshots}/g, interaction.guild.channels.cache.get('894372076884992015'));
        
        for (let i=tableStart; i<=tableEnd; i++)
        {
            let randomLetters = '';
            if (sRandom === 'Yes')
            {
                for (let i=0; i<3; i++)
                {
                    randomLetters += await symbols[Math.floor(Math.random()*symbols.length)];
                }
            }
            let table = i, botMessageTemp = botMessage;
            if (interaction.options.getSubcommand() === 'final')
            {
                if (i > brackets)
                {
                    table = brackets * (players-1) + i;
                    botMessageTemp = botMessage.replace(/{finalName}/g, 'Loserfinal').replace(/{X}/g, 'L');
                }
                else
                {
                    botMessageTemp = botMessage.replace(/{finalName}/g, 'Final').replace(/{X}/g, 'F');
                }
            }
            const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === `table-`+table);
            channelTarget.send(botMessageTemp.replace(/{sTable}/g, table<10?'0'+table:table).replace(/{random}/g, randomLetters));
        }
        
        /*if (interaction.guild.id != '894372075622526986')
        {
            await getTest(client);
            if (test == 0) return;
        }*/
        //setPresence(client, 2);
        if (interaction.options.getSubcommand() === 'qualifier') await writeDb(messages, '905946389748543488', `${parseInt(sRound)+1}`);
        await interaction.editReply(message).catch(console.error); //error handling in case the message was manually removed in the meantime
	},
}

async function writeDb(messages, id, newValue)
{
    await messages.fetch(id).then(message => message.edit(newValue));
}

async function readDb(messages, id)
{
    return await messages.fetch(id).then(message => message.content);
}