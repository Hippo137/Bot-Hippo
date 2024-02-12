const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolelist')
        .setDescription('Receive a list of members of a given role')
        .addRoleOption
        (option =>
            option.setName('role')
            .setDescription('Select a role')
            .setRequired(true)
        )
        .addIntegerOption
        (option =>
            option.setName('nameid')
            .setDescription('Select how the output should look like – defaults to ‘NAME’ if omitted')
            .setRequired(false)
            .addChoice('Name', 1)
            .addChoice('ID', 2)
            .addChoice('Both', 3)
            .addChoice('None', 0)
        ),
        
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}

async function command(interaction, dbMessage)
{
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    await interaction.guild.members.fetch();
    
    const roleToSearch = interaction.options.getRole('role');

    let membersWithRole = roleToSearch.members; //saved in case the role is deleted before the members are transferred...

    interaction.editReply(`${membersWithRole.size} Member${membersWithRole.size==1?'':'s'} with the role: ${roleToSearch.name}`);
    let messageToWrite = '';
    
    const nameID = interaction.options.getInteger('nameid') ?? 1;
    if (nameID > 0)
    {
        const name = nameID % 2 == 1;
        const id = nameID > 1;

        membersWithRole.forEach(member =>
        {
            if (messageToWrite.length + member.user.tag.length + member.user.id.length > 1950)
            {
                interaction.channel.send(`\`${messageToWrite}\``);
                messageToWrite = '';
            }
            if (name) messageToWrite += `${member.user.tag}`
            if (name && id) messageToWrite += ';'
            if (id) messageToWrite += `${member.user.id}`;
            messageToWrite += '\n';
        });

        if (messageToWrite.length > 0) interaction.channel.send(`\`${messageToWrite}\``);
    }
    
    success = true;
}