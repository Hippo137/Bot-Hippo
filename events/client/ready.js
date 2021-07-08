var interval = 100000;
var timeUntilEndOfTournament = 0;
var cl
var presence = 0;

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
    await getPresence();
    console.log(`1: ${presence}`);
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
        name = 'Hype 🙂';
        timeUntilEndOfTournament = 0;
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
        
        case 4: //tournament is over
        status = 'dnd';
        name = 'after the tournament is before the tournament';
        timeUntilEndOfTournament = 0;
    }
    console.log(`2: ${status} ${name}`);
    setPresence(0);
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
    let msg = await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069');
    console.log(msg);
    console.log(msg.content);
    presence = parseInt(msg.content);
}

async function setPresence(p)
{
    //await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(p));
    let msg = await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069');
    msg.edit(p);
}