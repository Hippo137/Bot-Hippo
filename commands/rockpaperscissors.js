const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

let opponentInteraction = null;
let introMessage = null;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rockpaperscissors')
		.setDescription('Play Rock Paper Scissors')
        .addStringOption
        (option =>
            option.setName('choice')
            .setDescription(`your choice`)
            .setRequired(true)
            .addChoice('rock', 'rock')
            .addChoice('paper', 'paper')
            .addChoice('scissors', 'scissors')
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
    let userChoice = interaction.options.getString('choice'), uChoice;
    switch (userChoice)
    {
        case 'rock': uChoice = 0; userChoice = ':fist:'; break;
        case 'paper': uChoice = 1; userChoice = ':hand_splayed:'; break;
        case 'scissors': uChoice = 2; userChoice = ':v:'; break;
    }
    let oppChoice;
    if (opponentInteraction === null)
    {
        opponentInteraction = interaction;
        interaction.editReply('Match started.');
        interaction.channel.send(`${interaction.member} started a Rock Paper Scissors Match. Use /${interaction.commandName} to join.`).then(message => introMessage = message);

        let introMessageCopy = introMessage;
        setTimeout(function()
        {
            if (introMessage == introMessageCopy)
            {
                introMessage.delete().catch(console.error);
                //introMessage = null;
                interaction.editReply('Match aborted. You can delete this message.').catch(console.error);
                //opponentInteraction = null;
            }
        }, 840000); //14 Minuten
        return;
    }
    else if (opponentInteraction.member === interaction.member)
    {
        return interaction.editReply('You can’t play against yourself. Nice try.');
    }
    else
    {
        interaction.editReply('Joined Match.');
        oppChoice = opponentInteraction.options.getString('choice');
        switch (oppChoice)
        {
            case 'rock': oChoice = 0; oppChoice = ':fist:'; break;
            case 'paper': oChoice = 1; oppChoice = ':hand_splayed:'; break;
            case 'scissors': oChoice = 2; oppChoice = ':v:'; break;
        }
    }

    let uWinner, oWinner;
    if (uChoice === oChoice) {uWinner = ':neutral_face:'; oWinner = ':neutral_face:';}
    else if (uChoice === (oChoice + 1) % 3) {uWinner = ':slight_smile:'; oWinner = ':slight_frown:';}
    else {uWinner = ':slight_frown:'; oWinner = ':slight_smile:';}

    opponentInteraction.editReply('Match ended. You can delete this message.').catch(console.error);
    introMessage.delete().then(() => introMessage = null)

    interaction.channel.send(`${oWinner} ${opponentInteraction.member} ${oppChoice} :crossed_swords: ${userChoice} ${interaction.member} ${uWinner}`).catch(console.error);
    opponentInteraction = null;

    success = true;
}