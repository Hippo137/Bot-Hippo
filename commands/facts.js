const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

let repeats = new Array(30) //30 consecutive facts must be different from each other

module.exports = {
	data: new SlashCommandBuilder()
		.setName('facts')
		.setDescription('Returns a random fact'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}
    
function command(interaction)
{
    //if (!g.allowed(interaction, 0)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let facts = fs.readFileSync(`txt/facts.txt`, 'utf8').split('\n')
    let r;
    do
    {
        r = Math.floor(Math.random()*facts.length);
    }
    while (repeats.includes(r));
    repeats.shift();
    repeats.push(r);
    interaction.editReply(facts[r]).catch(console.error);
    
    success = true;
}