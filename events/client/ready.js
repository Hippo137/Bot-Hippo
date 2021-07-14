var interval = 10;
var timeUntilEndOfTournament = 0;
var presence = -1;

module.exports = async (Discord, client) =>
{
    client.setInterval(() => updatePresence(client), 1000*interval)
    
    //client.channels.cache.get('862422544652828713').send('0');
    await updatePresence(client);
    console.log('Bot is online');
}

async function updatePresence(client)
{
    if (timeUntilEndOfTournament > 0)
    {
        timeUntilEndOfTournament -= interval;
        if (timeUntilEndOfTournament <= 0)
        {
            setPresence(client, 0);
        }
    }
    let currentPresence = presence;
    await getPresence(client);
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
        timeUntilEndOfTournament = 120*60;
        break;
        
        case 3: //tournament final started
        status = 'online';
        name = 'good luck to everyone';
        timeUntilEndOfTournament = 60*60;
        break;
    }
    client.user.setPresence
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

async function getPresence(client)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => presence = parseInt(message.content));
}

async function setPresence(client, newPresence)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(newPresence));
}