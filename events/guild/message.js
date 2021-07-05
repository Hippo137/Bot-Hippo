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
            client.users.cache.get(myID).send(`${message.author}:\n${message.cleanContent}\n${message.url}`);
        }
    }
    
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.id != myID && !message.member.roles.cache.some(role => role.name === 'Host')) return; //only I and Hosts can use commands
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    const command = client.commands.get(cmd);
    
    if (command) command.execute(client, message, args, Discord);
}