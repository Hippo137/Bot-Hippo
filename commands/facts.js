const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

let repeats = new Array(20) //20 consecutive facts must be different from each other

module.exports = {
	data: new SlashCommandBuilder()
		.setName('facts')
		.setDescription('Returns a random fact'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        
        g.log(interaction, command(interaction));
	}
}
    
function command(interaction)
{
    let facts = fs.readFileSync(`txt/facts.txt`, 'utf8').split('\n')
    let r
    do
    {
        r = Math.floor(Math.random()*facts.length);
    }
    while (repeats.includes(r));
    repeats.shift();
    repeats.push(r);
    interaction.editReply(facts[r]).catch(console.error);
    
    return true;
}