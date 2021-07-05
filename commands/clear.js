var botID = 848599387403059200

module.exports = {
    name: 'clear',
    description: 'Clear x messages',
    async execute(client, message, args)
    {
        if (message.guild !== null && !message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I don’t have the permission to delete messages.');
        let amount 
        if (!args[0])
        {
            amount = 100;
        }
        else
        {
            amount = parseInt(args[0]);
            if (isNaN(amount)) return message.reply('Please enter a number as the argument');
            if (amount>100) return message.reply('The maximum number of messages to remove is 100');
            if (amount<1) return message.reply('Please enter a positive number');
        }
        if (message.guild !== null) await message.channel.bulkDelete(amount);
        else
        {
            message.channel.messages.fetch({limit: amount})
                .then(messages =>
                {
                    messages = messages.filter(m => m.author.id === botID);
                    messages.forEach(msg =>
                    {
                        msg.delete();
                    });//.catch(console.error);    //gives an error, but works anyway
                })
                .catch(console.error);
        }
    }
};