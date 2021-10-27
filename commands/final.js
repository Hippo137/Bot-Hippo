const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('final')
        .setDescription('Last round'),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'Inner Circle')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        
        let botMessage = fs.readFileSync(`txt/of.txt`, 'utf8')
            .replace(/{screenshots}/g, await interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
        
        for (let i=1; i<=16; i++)
        {
            let finalName = '';
            let finalNameShort = '';
            if (i<5)
            {
                finalNameShort = 'F';
                finalName = 'Final';
            }
            else
            {
                finalNameShort = 'L';
                finalName = 'Loser Final';
            }
            
            const number = i<5 ? i : i-4;
            const table = i<5 ? i : i+12;
            const topX = i<5 ? i-1 : Math.floor((i-5)/3);
            const bracket = /*i==1 ? 'Grand' :*/ `${16*topX+1}–${16*(topX+1)}`;
            
            const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(botMessage.replace(/{bracket}/g, bracket).replace(/{number}/g, number<10?'0'+number:number).replace(/{table}/g, table<10?'0'+table:table).replace(/{finalName}/g, finalName).replace(/{finalNameShort}/g, finalNameShort));
        }
        
        await interaction.editReply(`Successfully posted Finals`).catch(console.error); //error handling in case the message was manually removed in the meantime
	},
};