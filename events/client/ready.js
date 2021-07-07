var interval = 100000;
var timeUntilEndOfTournament = 0;
const botDBChannel = '862422544652828713'
const botPresenceMessage = '862425269063254069';
var cl

//862425269063254069
module.exports = async (Discord, client) =>
{
    cl = client;
    client.setInterval(() => updatePresence(), 1000*interval)
    
    //client.channels.cache.get(botDBChannel).send('0');
    
    console.log('Bot is online');
}

function updatePresence()
{
    presence = await getPresence();
    
    if (timeUntilEndOfTournament > 0)
    {
        timeUntilEndOfTournament -= interval;
        if (timeUntilEndOfTournament <= 0)
        {
            presence = 4;
        }
    }
    if (presence == 0) return;
    
    let status;
    let name;
    switch (presence)
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
    setPresence(0);
    cl.user.setPresence
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

async function getPresence()
{
    let msg = await cl.channels.cache.get(botDBChannel).messages.fetch(botPresenceMessage);
    return parseInt(msg.content);
}

function setPresence(p)
{
    cl.channels.cache.get(botDBChannel).messages.fetch(botPresenceMessage).then(message => message.edit(p));
}