const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

let repeats = new Array(4) //4 consecutive settings must be different from each other

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wacky')
		.setDescription('Returns a set of rules to spice up your game')
        .addStringOption
        (option =>
            option.setName('mode')
            .setDescription(`Desired game mode for the game`)
            .setRequired(true)
            .addChoice('Base', 'Base')
            .addChoice('Cities & Knights', 'Cities & Knights')
        ),
    
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
    let sMode = interaction.options.getString('mode');
    let mode = '';
    switch (sMode)
    {
        case 'Base': mode = 'Base'; break;
        case 'Cities & Knight': mode = 'CK'; break;
    }
    let message = '';
    do
    {
        let r;
        do
        {
            r = Math.floor(Math.random()*10);
        }
        while (repeats.includes(r));
        let filename = `txt/wacky${r}.txt`;
        if (!fs.existsSync(filename)) //if the file doesn’t exist, it means that there might be separate files for the different modes
        {
            filename = `txt/wacky${r}${mode}.txt`
            if (!fs.existsSync(filename)) continue;
        }
        message = fs.readFileSync(filename, 'utf8')
            .replace(/{sMode}/g, sMode)
            .replace(/{zMode}/g, sMode=='Base'?'+':'-')
            .replace(/{sVp}/g, sMode=='Base'?'10':'13');
        repeats.shift();
        repeats.push(r);
        break;
    } while (true)
    interaction.editReply(message).catch(console.error);
    
    success = true;
}