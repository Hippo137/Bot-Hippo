const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raffledonator')
        .setDescription('Receive a list of donators without spaces'),
        
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
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    }
    
    await interaction.guild.members.fetch();
    
    const roleToSearch = interaction.guild.roles.cache.find(role => role.name === 'Donator');

    let membersWithRole = roleToSearch.members; //saved in case the role is deleted before the members are transferred...

    interaction.editReply(`${membersWithRole.size} Member${membersWithRole.size==1?'':'s'} with the role: ${roleToSearch.name}`);
    let messageToWrite = '';

    membersWithRole.forEach(member =>
    {
        if (messageToWrite.length + member.user.tag.length > 1950)
        {
            interaction.channel.send(`\`${messageToWrite}\``);
            messageToWrite = `${member.user.tag.replace(/\s+/g, '')}\n`;
        }
        else messageToWrite += `${member.user.tag.replace(/\s+/g, '')}\n`

    });

    if (messageToWrite.length > 0) interaction.channel.send(`\`${messageToWrite}\``);
    
    success = true;
}