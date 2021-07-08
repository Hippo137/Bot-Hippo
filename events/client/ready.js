var interval = 10;
var timeUntilEndOfTournament = 0;
var cl
var presence = -1;

//862425269063254069
module.exports = async (Discord, client) =>
{
    cl = client;
    client.setInterval(() => updatePresence(), 1000*interval)
    
    //client.channels.cache.get('').send('0');
    await updatePresence();
    console.log('Bot is online');
}

async function updatePresence()
{
    if (timeUntilEndOfTournament > 0)
    {
        timeUntilEndOfTournament -= interval;
        if (timeUntilEndOfTournament <= 0)
        {
            setPresence(0);
        }
    }
    let currentPresence = presence;
    await getPresence();
    if (currentPresence == presence) return;
    
    let status;
    let name;
    switch (presence)
    {
        case 0: //tournament is over
        status = 'idle';
        name = 'after the tournament is before the tournament';
        timeUntilEndOfTournament = 0;
        break;
        
        case 1: //check-in started
        status = 'online';
        name = '🙂 Hype 🙂';
        timeUntilEndOfTournament = 200*60;
        break;
        
        case 2: //tournament started
        status = 'online';
        name = 'good luck to everyone';
        timeUntilEndOfTournament = 100*60;
        break;
        
        case 3: //tournament final started
        status = 'online';
        name = 'good luck to everyone';
        timeUntilEndOfTournament = 1*60;
        break;
    }
    cl.user.setPresence
    (
        {
            status: status,
            activity:
            {
                name: name
            }
        }
    )
}

async function getPresence()
{
    await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => presence = parseInt(message.content));
}

async function setPresence(p)
{
    await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(p));
}