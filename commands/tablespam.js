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
            .addStringOption
            (option =>
                option.setName('type')
                .setDescription(`type of tournament`)
                .setRequired(true)
                .addChoice('Open', 'Open')
                .addChoice('Cash', 'Cash')
            )
            /*.addIntegerOption
            (option =>
                option.setName('tournament')
                .setDescription('Positive Integer')
                .setRequired(true)
            )*/
            .addIntegerOption
            (option =>
                option.setName('round')
                .setDescription('current round number')
                .setRequired(true)
                .addChoice('1', 1)
                .addChoice('2', 2)
                .addChoice('3', 3)
                .addChoice('4', 4)
                .addChoice('5', 5)
            )
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription('Last table channel which should be posted in')
                .setRequired(true)
            )
            .addIntegerOption
            (option =>
                option.setName('tablestart')
                .setDescription('First table channel which should be posted in – defaults to 1 if omitted')
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('rounds')
                .setDescription('total number of rounds – defaults to 3 if omitted')
                .setRequired(false)
                .addChoice('1', 1)
                .addChoice('2', 2)
                .addChoice('3', 3)
                .addChoice('4', 4)
                .addChoice('5', 5)
            )
            .addBooleanOption
            (option =>
                option.setName('dayfinal')
                .setDescription('TRUE if the qualifier has a Day Final – defaults to FALSE if omitted')
                .setRequired(false)
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
                option.setName('friendlyrobber')
                .setDescription('[setting]: Friendly Robber – defaults to NO if omitted')
                .setRequired(false)
                .addChoice('Yes', 'Yes')
                .addChoice('No', 'No')
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
                .addChoice('Check Announcement', '<Check Announcement>')
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
                .addChoice('Check Announcement', '<Check Announcement>')
            )
            .addStringOption
            (option =>
                option.setName('dice')
                .setDescription('[setting]: dice – defaults to RANDOM DICE if omitted')
                .setRequired(false)
                .addChoice('Random Dice', 'Random Dice')
                .addChoice('Balanced Dice', 'Balanced Dice')
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
                .addChoice('Check Announcement', '<Check Announcement>')
            )
            .addStringOption
            (option =>
                option.setName('players')
                .setDescription('[setting]: players per match – defaults to 4 if omitted')
                .setRequired(false)
                .addChoice('2', '2')
                .addChoice('3', '3')
                .addChoice('4', '4')
                .addChoice('5', '5')
                .addChoice('6', '6')
                .addChoice('7', '7')
                .addChoice('8', '8')
                .addChoice('Check Announcement', '<Check Announcement>')
            )
            .addStringOption
            (option =>
                option.setName('discardlimit')
                .setDescription('[setting]: discard limit – defaults to 7 if omitted')
                .setRequired(false)
                .addChoice('2', '2')
                .addChoice('3', '3')
                .addChoice('4', '4')
                .addChoice('5', '5')
                .addChoice('6', '6')
                .addChoice('7', '7')
                .addChoice('8', '8')
                .addChoice('9', '9')
                .addChoice('10', '10')
                .addChoice('11', '11')
                .addChoice('12', '12')
                .addChoice('Check Announcement', '<Check Announcement>')
            )
            .addStringOption
            (option =>
                option.setName('vp2win')
                .setDescription('[setting]: VP to win the game – defaults to Colonist’s default for the selected mode+map if omitted')
                .setRequired(false)
                .addChoice('2', '2')
                .addChoice('3', '3')
                .addChoice('4', '4')
                .addChoice('5', '5')
                .addChoice('6', '6')
                .addChoice('7', '7')
                .addChoice('8', '8')
                .addChoice('9', '9')
                .addChoice('10', '10')
                .addChoice('11', '11')
                .addChoice('12', '12')
                .addChoice('13', '13')
                .addChoice('14', '14')
                .addChoice('15', '15')
                .addChoice('16', '16')
                .addChoice('17', '17')
                .addChoice('18', '18')
                .addChoice('Check Announcement', '<Check Announcement>')
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
            .addBooleanOption
            (option =>
                option.setName('random')
                .setDescription('adds random letters to the game link – defaults to FALSE if omitted')
                .setRequired(false)
            )
        )
        /*.addSubcommand(subcommand =>
        subcommand
            .setName('semifinal')
            .setDescription('Use this for the semifinals')
        )*/,
            
	async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        const tableEnd = interaction.options.getInteger('tableend');
        const tableStart = interaction.options.getInteger('tablestart') ?? 1;
        if (tableStart > tableEnd) return await interaction.editReply(`'tablestart' must not exceed 'tableend'`).catch(console.error);
        
        const round = interaction.options.getInteger('round');
        const rounds = interaction.options.getInteger('rounds') ?? 3;
        if (round > rounds) return await interaction.editReply(`'round' must not exceed 'rounds'`).catch(console.error);
        
        const type = interaction.options.getString('type') ?? 'Open';
        
        //const tournament = interaction.options.getInteger('tournament');
        
        const dayFinal = interaction.options.getBoolean('dayfinal') ?? false;
        const prize = interaction.options.getString('prize') ?? 'Cash Ticket';
        
        const robber = interaction.options.getString('friendlyrobber') ?? 'No';
        const zRobber = robber === 'No' ? '+' : '-';
        
        const mode = interaction.options.getString('mode') ?? 'Base';
        const zMode = mode === 'Base' ? '+' : '-';
        
        const map = interaction.options.getString('map') ?? 'Base';
        const zMap = map === 'Base' ? '+' : '-';
        
        const dice = interaction.options.getString('dice') ?? 'Random Dice';
        const zDice = dice === 'Random Dice' ? '+' : '-';
        
        const speed = interaction.options.getString('speed') ?? 'Fast';
        const zSpeed = speed === 'Normal' ? '+' : '-';
        
        const players = interaction.options.getString('players') ?? '4';
        const zPlayers = players === '4' ? '+' : '-';
        
        const discard = interaction.options.getString('discardlimit') ?? '7';
        const zDiscard = discard === '7' ? '+' : '-';
        
        let vp = interaction.options.getString('vp2win');
        let zVp;
        
        const randomLetters = interaction.options.getBoolean('random') ?? false;
        
        const box = interaction.options.getInteger('box') ?? 1;
        
        switch (mode)
        {
            case 'Base':
            switch (map)
            {
                case 'Base': case 'Base Random': case 'Shuffle Board': case 'Black Forest': case 'Earth':
                if (!vp) {vp = '10'; zVp = '+';}
                else zVp = vp === '10' ? '+' : '-';
                break;
                
                default:
                return await interaction.editReply(`The map ‘${map}’ isn’t available in the game mode ‘${mode}’!`).catch(console.error);
            }
            break;
            
            case 'Seafarers':
            switch (map)
            {
                case 'Heading for New Shores':
                if (!vp) {vp = '14'; zVp = '+';}
                else zVp = vp === '14' ? '+' : '-';
                break;
                
                case 'Four Islands':
                if (!vp) {vp = '13'; zVp = '+';}
                else zVp = vp === '13' ? '+' : '-';
                break;
                
                case 'Fog Islands':
                if (!vp) {vp = '12'; zVp = '+';}
                else zVp = vp === '12' ? '+' : '-';
                break;
                
                case 'Through the Desert':
                if (!vp) {vp = '14'; zVp = '+';}
                else zVp = vp === '14' ? '+' : '-';
                break;
                
                case 'Earth': //not sure
                if (!vp) {vp = '13'; zVp = '+';}
                else zVp = vp === '13' ? '+' : '-';
                break;
                
                default:
                return await interaction.editReply(`The map ‘${map}’ isn’t available in the game mode ‘${mode}’!`).catch(console.error);
            }
            break;
            
            case 'Cities & Knights':
            switch (map)
            {
                case 'Base': case 'Base Random': case 'Shuffle Board': case 'Black Forest': case 'Earth':
                if (!vp) {vp = '13'; zVp = '+';}
                else zVp = vp === '13' ? '+' : '-';
                break;
                
                default:
                return await interaction.editReply(`The map ‘${map}’ isn’t available in the game mode ‘${mode}’!`).catch(console.error);
            }
            break;
            
            case 'Seafarers + Cities & Knights':
            switch (map)
            {
                case 'Heading for New Shores':
                if (!vp) {vp = '16'; zVp = '+';}
                else zVp = vp === '16' ? '+' : '-';
                break;
                
                case 'Four Islands':
                if (!vp) {vp = '15'; zVp = '+';}
                else zVp = vp === '15' ? '+' : '-';
                break;
                
                case 'Fog Islands':
                if (!vp) {vp = '14'; zVp = '+';}
                else zVp = vp === '14' ? '+' : '-';
                break;
                
                case 'Through the Desert':
                if (!vp) {vp = '16'; zVp = '+';}
                else zVp = vp === '16' ? '+' : '-';
                break;
                
                case 'Earth':
                if (!vp) {vp = '16'; zVp = '+';}
                else zVp = vp === '16' ? '+' : '-';
                break;
                
                default:
                return await interaction.editReply(`The map ‘${map}’ isn’t available in the game mode ‘${mode}’!`).catch(console.error);
            }
            break;
        }
        
        const roundName = ['last', 'first', 'second', 'third', 'fourth'];
        const intNames = ['zero', 'one', 'two', 'three', 'four, five, six'];
        
        let screenshotMessage = '', extraMessage = '';
        let remainingRounds = rounds - round;
        
        if (box > 1)
        {
            screenshotMessage = 'After each match, the winner posts a screenshot of the game end screen in';
            extraMessage = `You will play a total of ${intNames[box]} matches with the same opponent${players>2?'s':''} in this round. Use the ‘Rematch’ button after a match ends to create a new lobby.\n`;
        }
        else screenshotMessage = 'After the match, the winner posts a screenshot of the game end screen in';
        
        if (remainingRounds == 0)
        {
            if (dayFinal)
            {
                extraMessage += 'There is a Day Final for the Top 4 after this match. You might be in with a good performance.'
                if (prize == 'Cash Ticket') extraMessage += ' Don’t miss your chance to win a cash tournament ticket. :money_with_wings:'
            }
            else extraMessage += 'This is the last round in the qualifier.';
        }
        else extraMessage += `In this qualifier, everyone will play ${intNames[remainingRounds]} more ${remainingRounds>1?'rounds':'round'} after this round.`;
        
        let botMessage = fs.readFileSync(`txt/blank.txt`, 'utf8')
            .replace(/{intro}/g, `${roundName[round>=rounds ? 0 : round]} qualifying round`)
            //.replace(/{roomname}/g, `CC${type} {tournament} Round ${round} Table {table}`)
            .replace(/{roomname}/g, `CC${type} Round ${round} Table {table}`)
            .replace(/{zRobber}/g, zRobber)
            .replace(/{robber}/g, robber)
            .replace(/{zMode}/g, zMode)
            .replace(/{mode}/g, mode)
            .replace(/{zMap}/g, zMap)
            .replace(/{map}/g, map)
            .replace(/{zDice}/g, zDice)
            .replace(/{dice}/g, dice)
            .replace(/{zSpeed}/g, zSpeed)
            .replace(/{speed}/g, speed)
            .replace(/{zPlayers}/g, zPlayers)
            .replace(/{players}/g, players)
            .replace(/{zDiscard}/g, zDiscard)
            .replace(/{discard}/g, discard)
            .replace(/{zVp}/g, zVp)
            .replace(/{vp}/g, vp)
            //.replace(/{tournament}/g, tournament)
            .replace(/{round}/g, round)
            .replace(/{type}/g, type)
            .replace(/{roundName}/g, roundName[round>=rounds ? 0 : round])
            .replace(/{screenshotMessage}/g, screenshotMessage)
            .replace(/{extraMessage}/g, extraMessage)
            .replace(/{screenshots}/g, await interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
            //.replace(/{screenshots}/g, interaction.guild.channels.cache.get('894372076884992015'));
        
        for (let i=tableStart; i<=tableEnd; i++)
        {
            let random = '';
            if (randomLetters)
            {
                for (let i=0; i<3; i++)
                {
                    random += await symbols[Math.floor(Math.random()*symbols.length)];
                }
            }
            const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(botMessage.replace(/{table}/g, i<10?'0'+i:i).replace(/{random}/g, random));
        }
        
        /*if (interaction.guild.id != '894372075622526986')
        {
            await getTest(client);
            if (test == 0) return;
        }*/
        //setPresence(client, 2);
        const numMsg = 1+tableEnd-tableStart;
        await interaction.editReply(`Posted ${numMsg} message${numMsg==1?'':'s'}.`).catch(console.error); //error handling in case the message was manually removed in the meantime
	},
};