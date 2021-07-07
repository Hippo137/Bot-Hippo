var interval = 10;
var timeUntilEndOfTournament = 0;
var botPresence = 0;

module.exports = (Discord, client) =>
{
    client.setInterval(() => updatePresence(), 1000*interval)
    
    client.channels.cache.get('862422544652828713').send('0');
    
    client.user.setPresence
    (
        {
            status: 'dnd',
            activity:
            {
                name: 'table spam',
            }
        }
    )
    console.log('Bot is online');
}

function updatePresence()
{
    if (timeUntilEndOfTournament > 0)
    {
        timeUntilEndOfTournament -= interval;
        if (timeUntilEndOfTournament <= 0)
        {
            botPresence = 4;
        }
    }
    if (botPresence == 0) return;
    
    let status;
    let name;
    switch (botPresence)
    {
        case 1: //check-in started
        status = 'idle';
        name = ':Hype:';
        break;
        
        case 2: //tournament started
        status = 'online';
        name = 'good luck to everyone :slight_smile:';
        timeUntilEndOfTournament = 100*60;
        break;
        
        case 3: //tournament final started
        status = 'online';
        name = 'good luck to everyone :slight_smile:';
        timeUntilEndOfTournament = 1*60;
        break;
        
        case 4: //tournament is over
        status = 'dnd';
        name = 'after the tournament is before the tournament';
    }
    botPresence = 0;
    client.user.setPresence
    (
        {
            status: status,
            activity:
            {
                name: name,
            }
        }
    )
}