require('dotenv').config();
const {Client, Collection, Intents} = require('discord.js');
const fs = require('fs');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const path = require('path');
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
    
    client.user.setPresence({ activities: [{ name: '/help', type: 'LISTENING' }], status: 'online' });
    
    client.channels.cache.get('960288981419962448').send(`Logged in as ${client.user.tag}`).catch(console.error);
    
    
    //fs.rmSync(path.join(__dirname, './txt/blank.txt'), {force: true});
    /*fs.rmSync(path.join(__dirname, './txt/helpTickets.txt'), {force: true});
    fs.rmSync(path.join(__dirname, './txt/helpReboot.txt'), {force: true});
    fs.rmSync(path.join(__dirname, './commands/ntnt.js'), {force: true});
    fs.rmSync(path.join(__dirname, './commands/tickets.js'), {force: true});
    fs.rmSync(path.join(__dirname, './commands/reboot.js'), {force: true});*/
    
    
    
    
    /*client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE).then(async dbMsg =>{
    dbMsg.edit(`Database


corrupted: False
sBox: 1
sBrackets: 4
sChatMode: Full
sDice: Random Dice
zDice: +
sDiscard: 7
zDiscard: +
sEndGameCondition: None
sInitialMode1: 0
sInitialMode2: 0
sInitialType1: 0
sInitialType2: 0
sLoserfinals: No
sMap: Base
zMap: +
sMode: Base
zMode: +
sNumber: -1
zNumber: +
sPlacements: Random
zPlacements: +
sPlatform: Colonist
zPlatform: +
sPlayers: 4
zPlayers: +
sQualfinal: Yes
sQualfinalPrize: Cash Ticket
sRandom: No
sRobber: Normal
zRobber: +
sRound: 1
sRounds: 3
sSpecial: None
zSpecial: +
sSpeed: Fast
zSpeed: -
sTables: 0
sTeamsize: 1
sTradeMode: Full
sType: Open
sVp: 10
zVp: +
`).catch(console.error)})*/
    
    
    

    });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('guildMemberAdd', member => {
    //const roleToAdd = member.guild.roles.cache.find(role => role.name === 'Community Tournaments');
    //member.roles.add(roleToAdd);
    if (member.guild.id === '545226514829017117') return; //Don’t add roles in Test Guild
    const rolesToAdd =
    [
        member.guild.roles.cache.find(role => role.name === 'Tournaments Base'),
        member.guild.roles.cache.find(role => role.name === 'Tournaments CK'),
        member.guild.roles.cache.find(role => role.name === 'Tournaments Cash'),
        member.guild.roles.cache.find(role => role.name === 'Updates')
    ];
    member.roles.add(rolesToAdd);
})

client.login(process.env.TOKEN);