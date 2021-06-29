module.exports = (Discord, client) =>
{
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