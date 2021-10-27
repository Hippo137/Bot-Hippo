const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('semi')
        .setDescription('Second last round'),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'Inner Circle')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        
        let botMessage = fs.readFileSync(`txt/os.txt`, 'utf8')
            .replace(/{screenshots}/g, await interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
        
        
        for (let i=1; i<=16; i++)
        {
            const number = 1+((i-1)%4);
            const topX = Math.floor((i-1)/4);
            const bracket = `${16*topX+1}–${16*(topX+1)}`
            
            const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(botMessage.replace(/{bracket}/g, bracket).replace(/{number}/g, number).replace(/{table}/g, i<10?'0'+i:i));
        }
        await interaction.editReply(`Successfully posted Semis`).catch(console.error); //error handling in case the message was manually removed in the meantime
	},
};