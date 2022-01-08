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
            .setDescription('New=default if omitted, Update=ignored if omitted, restart=reset round to 1')
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
            option.setName('discardlimit')
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
            .setDescription('adds Loserfinals to the final round – defaults to YES if omitted')
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
            option.setName('rounds')
            .setDescription('total number of rounds – defaults to 3 if omitted')
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
            .setDescription('Number of tables')
            .setRequired(false)
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
            option.setName('vp2win')
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
        
        let messages = await interaction.client.channels.cache.get('862422544652828713').messages;
        
        const create = interaction.options.getString('create');
        
        if (create === 'Restart')
        {
            await writeDb(messages, '905946389748543488', '1');
            await writeDb(messages, '906261691610845195', '0');
            return await interaction.editReply(`Successfully restarted the tournament.`).catch(console.error);
        }
        let sType = interaction.options.getString('type');
        let sMode = interaction.options.getString('mode');
        let sMap = interaction.options.getString('map');
        let sPlayers = interaction.options.getInteger('players');
        let sSpeed = interaction.options.getString('speed');
        let sDice = interaction.options.getString('dice');
        let sVp = interaction.options.getInteger('vp2win');
        let sRobber = interaction.options.getString('friendlyrobber');
        let sRounds = interaction.options.getInteger('rounds');
        let sRound = interaction.options.getInteger('round');
        let sBox = interaction.options.getInteger('box');
        let sDayfinal = interaction.options.getString('dayfinal');
        let sPrize = interaction.options.getString('prize');
        let sDiscard = interaction.options.getInteger('discard');
        let sRandom = interaction.options.getString('random');
        let sTables = interaction.options.getInteger('tables');
        let sBrackets = interaction.options.getInteger('brackets');
        let sLoserfinal = interaction.options.getString('loserfinal');
        if (create === 'New')
        {
            sType = sType ?? 'Open';
            sMode = sMode ?? 'Base';
            sMap = sMap ?? 'Base';
            sPlayers = sPlayers ?? 4;
            sSpeed = sSpeed ?? 'Fast';
            sDice = sDice ?? 'Random Dice';
            //sVp = sVp;
            sRobber = sRobber ?? 'No';
            sRounds = sRounds ?? 3;
            sRound = sRound ?? 1;
            sBox = sBox ?? 1;
            sDayfinal = sDayfinal ?? 'No';
            sPrize = sPrize ?? 'Cash Ticket';
            sDiscard = sDiscard ?? 7;
            sRandom = sRandom ?? 'No';
            sTables = sTables ?? 0;
            sBrackets = sBrackets ?? 4;
            sLoserfinal = sLoserfinal ?? 'Yes';
        }
        if (sType != null) await writeDb(messages, '905945127900573747', sType);
        else sType = await readDb(messages, '905945127900573747');
        if (sMode != null)
        {
            await writeDb(messages, '905945387360202823', sMode);
            await writeDb(messages, '905945487390171146', sMode === 'Base' ? '+' : '-');
        }
        else sMode = await readDb(messages, '905945387360202823');
        if (sMap != null)
        {
            await writeDb(messages, '905945543115669574', sMap);
            await writeDb(messages, '905945613114413076', sMap === 'Base' ? '+' : '-');
        }
        else sMap = await readDb(messages, '905945543115669574');
        if (sPlayers != null)
        {
            await writeDb(messages, '905945688976818187', `${sPlayers}`);
            await writeDb(messages, '905945741216862229', `${sPlayers === 4 ? '+' : '-'}`);
        }
        else sPlayers = await readDb(messages, '905945688976818187');
        if (sSpeed != null)
        {
            await writeDb(messages, '905945792567722046', `${sSpeed}`);
            await writeDb(messages, '905945832971444244', `${sSpeed === 'Fast' ? '+' : '-'}`);
        }
        else sSpeed = await readDb(messages, '905945792567722046');
        if (sDice != null)
        {
            await writeDb(messages, '905945929490763797', `${sDice}`);
            await writeDb(messages, '905945972914397245', `${sDice === 'Random Dice' ? '+' : '-'}`);
        }
        else sDice = await readDb(messages, '905945929490763797');
        if (sRobber != null)
        {
            await writeDb(messages, '905946115566895176', `${sRobber}`);
            await writeDb(messages, '905946151008735293', `${sRobber === 'No' ? '+' : '-'}`);
        }
        else sRobber = await readDb(messages, '905946115566895176');
        if (sRounds != null) await writeDb(messages, '905946342617141308', `${sRounds}`);
        else sRounds = await readDb(messages, '905946342617141308');
        if (sRound != null) await writeDb(messages, '905946389748543488', `${sRound}`);
        else sRound = await readDb(messages, '905946389748543488');
        if (sBox != null) await writeDb(messages, '905983214122840125', `${sBox}`);
        else sBox = await readDb(messages, '905983214122840125');
        if (sDayfinal != null) await writeDb(messages, '906247072406175795', `${sDayfinal}`);
        else sDayfinal = await readDb(messages, '906247072406175795');
        if (sPrize != null) await writeDb(messages, '906247110666625115', `${sPrize}`);
        else sPrize = await readDb(messages, '906247110666625115');
        if (sDiscard != null)
        {
            await writeDb(messages, '906250774105960448', `${sDiscard}`);
            await writeDb(messages, '906250873414492170', `${sDiscard === 7 ? '+' : '-'}`);
        }
        else sDiscard = await readDb(messages, '906250774105960448');
        if (sRandom != null) await writeDb(messages, '906260752300666911', `${sRandom}`);
        else sRandom = await readDb(messages, '906260752300666911');
        if (sTables != null) await writeDb(messages, '906261691610845195', `${sTables}`);
        else sTables = await readDb(messages, '906261691610845195');
        if (sBrackets != null) await writeDb(messages, '906512009649061888', `${sBrackets}`);
        else sBrackets = await readDb(messages, '906512009649061888');
        if (sLoserfinal != null) await writeDb(messages, '906512049096503296', `${sLoserfinal}`);
        else sLoserfinal = await readDb(messages, '906512049096503296');
        
        let zVp;
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
            await writeDb(messages, '906253957180051506', 'True');
            return await interaction.editReply(`The map ‘${map}’ isn’t available in the game mode ‘${mode}’!`).catch(console.error);
        }
        await writeDb(messages, '905946023166353420', `${sVp}`);
        await writeDb(messages, '905946057194766366', `${zVp}`);
        await writeDb(messages, '906253957180051506', 'False');
        
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
            .replace(/{zPlayers}/g, sPlayers===4?'+':'-')
            .replace(/{sPlayers}/g, sPlayers)
            .replace(/{zDiscard}/g, sDiscard===7?'+':'-')
            .replace(/{sDiscard}/g, sDiscard)
            .replace(/{zVp}/g, zVp)
            .replace(/{sVp}/g, sVp);
        
        if (create === 'Update') botMessage += `\n\nSorry for that mess! :cry:`
        //await interaction.editReply(`Successfully ${create === 'New' ? 'created' : 'updated'} the tournament.`).catch(console.error); //error handling in case the message was manually removed in the meantime
        await interaction.editReply(`Successfully ${create === 'New' ? 'created' : 'updated'} the tournament.\n\n${botMessage}`).catch(console.error); //error handling in case the message was manually removed in the meantime
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