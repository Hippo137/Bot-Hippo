require('dotenv').config();
const {Client, Collection, Intents} = require('discord.js');
const fs = require('fs');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]});
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
    /*try
    {
    // change the path to your file
    await fs.unlink(path.join(__dirname, './txt/wacky10.txt'), () => {});
    } catch (error) {
      console.log(error);
    }*/
    /*
    try
    {
    // change the path to your file
    await fs.unlink(path.join(__dirname, './commands/rolecount.js'), () => {});
    } catch (error) {
      console.log(error);
    }*/
    
    /*client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE).then(async dbMsg =>{
    dbMsg.edit(`Database


corrupted: False
sBox: 1
sBrackets: 4
sDayfinal: No
sDayfinalPrize: Cash Ticket
sDice: Random Dice
zDice: +
sDiscard: 7
zDiscard: +
sLoserfinals: No
sMap: Base
zMap: +
sMode: Base
zMode: +
sSpecial: No
zSpecial: +
sPlayers: 4
zPlayers: +
sSpeed: Fast
zSpeed: +
sTables: 0
sTeamsize: 1
sType: Open
sRandom: No
sRobber: No
zRobber: +
sRound: 1
sRounds: 3
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
    const roleToAdd = member.guild.roles.cache.find(role => role.name === 'Community Tournaments');
    member.roles.add(roleToAdd);
})

client.login(process.env.TOKEN);