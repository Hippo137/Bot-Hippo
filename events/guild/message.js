var myID = 383011975057113088
var botID = 848599387403059200

module.exports = (Discord, client, message) =>
{
    if (message.author.id != botID && message.author.id != myID) //not written by the bot or myself
    {
        if (message.guild == null) //DM
        {
            client.users.cache.get(myID).send(`${message.author} via DM:\n${message.cleanContent}`);
        }
        else if (message.mentions.has(client.user) && !message.mentions.has(client.users.cache.get(myID))) //mentioned the bot on a server and not myself
        {
            client.users.cache.get(myID).send(`${message.author}:\n\n${message.cleanContent}\n\n${message.url}`);
        }
    }
    
    if (message.channel.id === '802909358132035625' && message.author.id === '383011975057113088')
    {
        setPresence(client, 1);
    }
    
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.id != myID && !message.member.roles.cache.some(role => role.name === 'Host')) return; //only I and Hosts can use commands
    
    const args = message.content.slice(prefix.length).split(/ +/); //removes the prefix and create a string array with each element separated by a space in the message
    const cmd = args.shift().toLowerCase(); //cmd is the first element in the list and is removed from the message. It is also changed to lowercase
    
    const command = client.commands.get(cmd);
    
    if (command) command.execute(client, message, args, Discord); //execute the command if the command exists
    else message.reply(`Use “${prefix}commandName parameter1 parameter2 ...” with an existing commandName. Use “${prefix}help” for additional help.`);
}

async function setPresence(client, newPresence)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(newPresence));
}