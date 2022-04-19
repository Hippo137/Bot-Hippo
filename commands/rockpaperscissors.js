const { SlashCommandBuilder } = require('@discordjs/builders');
let opponentInteraction = null;
let introMessage = null;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rockpaperscissors')
		.setDescription('Play Rock Paper Scissors')
        .addStringOption
        (option =>
            option.setName('opponent')
            .setDescription(`Play against another human or practice with the bot`)
            .setRequired(true)
            .addChoice('bot', 'bot')
            .addChoice('human', 'human')
        )
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
        //await interaction.reply(`Sorry, the command is currently unavailable.`).catch(console.error);
        
        //await interaction.deferReply();
        
        let userChoice = interaction.options.getString('choice'), uChoice, opponent = interaction.options.getString('opponent');
        switch (userChoice)
        {
            case 'rock': uChoice = 0; userChoice = ':fist:'; break;
            case 'paper': uChoice = 1; userChoice = ':hand_splayed:'; break;
            case 'scissors': uChoice = 2; userChoice = ':v:'; break;
        }
        let oppChoice;
        if (opponent === 'human')
        {
            if (opponentInteraction === null)
            {
                opponentInteraction = interaction;
                //await interaction.deferReply({ephemeral: true});
                await interaction.reply({content: 'Match started.', ephemeral: true});
                await interaction.channel.send(`${interaction.member} started a Rock Paper Scissors Match. Use /${interaction.commandName} to join.`).then(message => introMessage = message);
                let introMessageCopy = introMessage;
                setTimeout(async function()
                {
                    if (introMessage == introMessageCopy)
                    {
                        await introMessage.delete().catch(console.error);
                        //introMessage = null;
                        await interaction.editReply('Match aborted. You can delete this message.').catch(console.error);
                        //opponentInteraction = null;
                    }
                }, 840000); //14 Minuten
                return;
            }
            else if (opponentInteraction.member === interaction.member)
            {
                await interaction.deferReply( {ephemeral: true} );
                return await interaction.editReply('You can’t play against yourself. Nice try.')
            }
            else
            {
                await interaction.deferReply();
                oppChoice = opponentInteraction.options.getString('choice');
                switch (oppChoice)
                {
                    case 'rock': oChoice = 0; oppChoice = ':fist:'; break;
                    case 'paper': oChoice = 1; oppChoice = ':hand_splayed:'; break;
                    case 'scissors': oChoice = 2; oppChoice = ':v:'; break;
                }
            }
        }
        else
        {
            await interaction.deferReply();
            oChoice = Math.floor(Math.random()*3);
            switch (oChoice)
            {
                case 0: oppChoice = ':fist:'; break;
                case 1: oppChoice = ':hand_splayed:'; break;
                case 2: oppChoice = ':v:'; break;
            }
        }
        
        let uWinner, oWinner;
        if (uChoice === oChoice) {uWinner = ':neutral_face:'; oWinner = ':neutral_face:';}
        else if (uChoice === (oChoice + 1) % 3) {uWinner = ':slight_smile:'; oWinner = ':slight_frown:';}
        else {uWinner = ':slight_frown:'; oWinner = ':slight_smile:';}
        
        if (opponent === 'human')
        {
            await opponentInteraction.editReply('Match ended. You can delete this message.').catch(console.error);
            await introMessage.delete()
            introMessage = null;
            await interaction.editReply(`${oWinner} ${opponentInteraction.member} ${oppChoice} :crossed_swords: ${userChoice} ${interaction.member} ${uWinner}`).catch(console.error);
            opponentInteraction = null;
        }
        else await interaction.editReply(`${uWinner} :person_in_lotus_position: ${userChoice} :crossed_swords: ${oppChoice} :hippopotamus: ${oWinner}`).catch(console.error);
		
        log(interaction);
	}
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}
    https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}