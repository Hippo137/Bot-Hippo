const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows how to use the bot')
        //.setDefaultPermission(false)
        .addStringOption
        (option =>
            option.setName('topic')
            .setDescription('Command to get help for. Omitting this gives a general overview over all commands. * = CC Team only')
            .setRequired(false)
            .addChoice('backuprefresh*', 'Backuprefresh')
            .addChoice('clear*', 'Clear')
            .addChoice('createtournament*', 'Createtournament')
            .addChoice('facts', 'Facts')
            .addChoice('help', 'Help')
            .addChoice('ntnt', 'Ntnt')
            .addChoice('ping', 'Ping')
            .addChoice('reboot*', 'Reboot')
            .addChoice('rockpaperscissors', 'Rockpaperscissors')
            .addChoice('roleadd*', 'Roleadd')
            .addChoice('rolecolor*', 'Rolecolor')
            .addChoice('rolecount', 'Rolecount')
            .addChoice('rolelist*', 'Rolelist')
            .addChoice('roletransfer*', 'Roletransfer')
            .addChoice('tablehide*', 'Tablehide')
            .addChoice('tablemessage*', 'Tablemessage')
            .addChoice('tablespam*', 'Tablespam')
        ),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        
        await interaction.editReply(fs.readFileSync(`txt/help${interaction.options.getString('topic') ?? 'General'}.txt`, 'utf8')).catch(console.error); //error handling in case the message was manually removed in the meantime
        
        log(interaction);
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}