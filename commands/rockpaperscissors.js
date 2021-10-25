const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rockpaperscissors')
		.setDescription('Play Rock Paper Scissors with the bot')
        .addStringOption
        (option =>
            option.setName('choice')
            .setDescription(`your choice`)
            .setRequired(true)
            .addChoice('rock', 'rock')
            .addChoice('paper', 'paper')
            .addChoice('scissors', 'scissors')
        ),
	async execute(interaction) {
        let userChoice = interaction.options.getString('choice');
        let botChoice = Math.floor(Math.random()*3);
        
        switch (userChoice)
        {
            case 'rock': choice = 0; userChoice = ':fist:'; break;
            case 'paper': choice = 1; userChoice = ':hand_splayed:'; break;
            case 'scissors': choice = 2; userChoice = ':v:'; break;
        }
        
        let winner;
        if (choice === botChoice) winner = ':neutral_face:';
        else if (choice === (botChoice + 1) % 3) winner = ':slight_smile:';
        else winner = ':slight_frown:';

        switch (botChoice)
        {
            case 0: botChoice = ':fist:'; break;
            case 1: botChoice = ':hand_splayed:'; break;
            case 2: botChoice = ':v:'; break;
        }
        await interaction.reply(`:person_in_lotus_position: ${userChoice} :crossed_swords: ${botChoice} :robot: ${winner}`).catch(console.error);
		
	},
};