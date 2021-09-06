module.exports = async (Discord, client, message) =>
{
    if (message.author != client.user && message.author.id != 383011975057113088) //not written by the bot or myself
    {
        if (message.guild == null) //DM
        {
            
            //client.users.cache.get('383011975057113088').send(`${message.author} via DM:\n${message.content}`);
            client.users.fetch('383011975057113088').then((user) => user.send(`${message.author} via DM:\n${message.content}`));
        }
        else if ((message.mentions.has(client.user) || message.mentions.has('848653342342774785') || message.mentions.has('849809423178268704')) && !(message.mentions.has('383011975057113088') || message.mentions.has('848612682781163622') || message.mentions.has('861750799821832223') || message.mentions.has('827244724091748363') || message.mentions.has('747216338833113149') || message.mentions.has('747217237034926081'))) //mentioned the bot on a server and not myself
        {
            //client.users.cache.get('383011975057113088').send(`${message.author}:\n\n${message.content}\n\n${message.url}`);
            client.users.fetch('383011975057113088').then((user) => user.send(`${message.author}:\n\n${message.content}\n\n${message.url}`));
        }
    }
    
    //if (message.channel.id === '802909358132035625' && message.author.id === '383011975057113088')
    if (message.channel.id === '759563162063601664' && message.author.id === '204255221017214977')
    {
        setPresence(client, 1);
    }
    
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.id != '383011975057113088' && !message.member.roles.cache.some(role => role.name === 'Host') && !message.member.roles.cache.some(role => role.name === 'Admin')) return; //only I, Hosts and Admins can use commands
    
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