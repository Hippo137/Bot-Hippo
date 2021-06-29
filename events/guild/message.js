module.exports = (Discord, client, message) =>
{
    if (message.author.id != 848599387403059200 && message.author.id != 383011975057113088) //not written by the bot or myself
    {
        if (message.guild == null) //DM
        {
            client.users.cache.get('383011975057113088').send(`${message.author} via DM:\n${message.cleanContent}`);
        }
        else if (message.mentions.has(client.user)) //mentioned the bot on a server
        {
            client.users.cache.get('383011975057113088').send(`${message.author}:\n${message.cleanContent}\n${message.url}`);
        }
    }
    
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.id != 383011975057113088/*|| message.author.bot || !message.member.roles.cache.has('848612682781163622')*/) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    const command = client.commands.get(cmd);
    
    if (command) command.execute(client, message, args, Discord);
}