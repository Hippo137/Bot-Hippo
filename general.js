module.exports =
{
    allowed:
    function (interaction, level) //level 0=everyone, 1=Tournament Team, 2=CC-Team, 3=Transition Team, 4=Hippo
    {
        switch (level)  //There are no breaks in the switch cases. This is not an accident. You don’t need the exact level, you need at least this level
        {
            case 0: return true;
            case 1: if (interaction.member.roles.cache.find(role => role.name === 'Tournament Team')) return true;
            case 2: if (interaction.member.roles.cache.find(role => role.name === 'CC Team')) return true;
            case 3: if (interaction.member.roles.cache.find(role => role.name === 'Server Lead')) return true;
            case 4: if (interaction.member.id === '383011975057113088') return true;
            //if (interaction.member.id === '383011975057113088' || interaction.member.id === '512608910914617366') return true; //currently Hippo and Athanais
        }
        return false;
    },
    
    readDb:
    function (message, type)
    {
        let title = `\n${type}:`;
        let index = message.indexOf(title);
        if (index == -1) return console.log(`Type ${type} not found in the database`);
        index += title.length + 1;
        let endIndex = message.indexOf(`\n`, index);
        if (endIndex == -1) return message.substring(index, message.length);
        else return message.substring(index, endIndex);
    },

    writeDb:
    function (message, type, newValue)
    {
        let title = `\n${type}:`;
        let index = message.indexOf(title);
        if (index == -1) return console.log(`Type ${type} not found in the database`);
        index += title.length + 1;
        let endIndex = message.indexOf(`\n`, index);
        if (endIndex == -1) return `${message.substring(0, index)}${newValue}`;
        else return `${message.substring(0, index)}${newValue}${message.substring(endIndex, message.length)}`;
    },
    
    log:
    async function (interaction, success)
    {
        if (interaction.guildId === '545226514829017117') return;
        
        const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
        botLogChannel.send(`${success?':white_check_mark:':':negative_squared_cross_mark:'} ${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}${interaction.user.discriminator > 0 ? `#${interaction.user.discriminator}` : ``}, id=${interaction.user.id}, https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
    },
    
    symbols:
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    
        
    lobbyDefaults:
    function (platform, type)
    {
        switch (type)
        {
            case 'Robber': return 'Normal'; break;
            case 'Dice': return 'Random Dice'; break;
            case 'Speed': return platform == 'Colonist' ? 'Normal' : 'Rapid'; break;
        }
    },
    
    tournamentDefaults:
    function (platform, type) //currently platform doesn’t matter. Speed name isn’t changed in the database based on platform, only when displaying it in the tables
    {
        switch (type)
        {
            case 'Robber': return 'Normal'; break;
            case 'Dice': return 'Random Dice'; break;
            case 'Speed': return 'Fast'; break;
        }
    },
    
    initialModeToName:
    function (mode)
    {
        switch (parseInt(mode))
        {
            case 0: return 'Normal';
            case 1: return 'Coastal';
            case 2: return 'Inland';
            case 3: return 'Port';
            case 4: return 'Blind Terrain';
            case 5: return 'Blind Number';
            case 6: return 'Blind All';
            case 7: return 'Adverse Pick';
            case 8: return 'Highest Production';
            case 9: return 'Skip';
            case 10: return 'Sahel';
            case 11: return 'Different Island';
        }
    },
    
    initialTypeToName:
    function (type)
    {
        switch (parseInt(type))
        {
            case 0: return 'Settlement';
            case 1: return 'City';
        }
    },
    
    displaySpeed:
    function (platform, speed)
    {
        if (platform === 'Colonist') return speed;
        
        switch (speed)
        {
            case 'Very Slow': return 'Relaxed';
            case 'Slow': return 'Classic';
            case 'Normal': return 'Rapid';
            case 'Fast': return 'Blitz';
            case 'Very Fast': return 'Bullet';
            case 'None': return 'None';
        }
    }
};
