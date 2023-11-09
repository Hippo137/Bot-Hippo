const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scheduler')
		.setDescription('Creates messages for dates and times to vote for (all times in UTC).')
        .addIntegerOption
        (option =>
            option.setName('month')
            .setDescription(`The month of the start time – defaults to the next possible option if omitted`)
            .setRequired(false)
            .addChoice('01 January', 0)
            .addChoice('02 February', 1)
            .addChoice('03 March', 2)
            .addChoice('04 April', 3)
            .addChoice('05 May', 4)
            .addChoice('06 June', 5)
            .addChoice('07 July', 6)
            .addChoice('08 August', 7)
            .addChoice('09 September', 8)
            .addChoice('10 October', 9)
            .addChoice('11 November', 10)
            .addChoice('12 December', 11)
        )
        .addIntegerOption
        (option =>
            option.setName('day')
            .setDescription(`The day of the start time (1..31) – defaults to the next possible option if omitted`)
            .setRequired(false)
        )
        .addIntegerOption
        (option =>
            option.setName('hour')
            .setDescription(`The hour of the start time (0..23) – defaults to the next possible option if omitted`)
            .setRequired(false)
            .addChoice('0', 0)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
            .addChoice('7', 7)
            .addChoice('8', 8)
            .addChoice('9', 9)
            .addChoice('10', 10)
            .addChoice('11', 11)
            .addChoice('12', 12)
            .addChoice('13', 13)
            .addChoice('14', 14)
            .addChoice('15', 15)
            .addChoice('16', 16)
            .addChoice('17', 17)
            .addChoice('18', 18)
            .addChoice('19', 19)
            .addChoice('20', 20)
            .addChoice('21', 21)
            .addChoice('22', 22)
            .addChoice('23', 23)
        )
        .addIntegerOption
        (option =>
            option.setName('minute')
            .setDescription(`The minute of the start time (0..59) – defaults to 0 if omitted`)
            .setRequired(false)
            .addChoice('0', 0)
            .addChoice('5', 5)
            .addChoice('10', 10)
            .addChoice('15', 15)
            .addChoice('20', 20)
            .addChoice('25', 25)
            .addChoice('30', 30)
            .addChoice('35', 35)
            .addChoice('40', 40)
            .addChoice('45', 45)
            .addChoice('50', 50)
            .addChoice('55', 55)
        )
        .addIntegerOption
        (option =>
            option.setName('interval')
            .setDescription(`Time span between each suggested time in minutes – defaults to 60 if omitted`)
            .setRequired(false)
        )
        .addIntegerOption
        (option =>
            option.setName('suggestions')
            .setDescription(`Number of suggestions including the start time – defaults to 1 if omitted`)
            .setRequired(false)
            .addChoice('1', 1)
            .addChoice('2', 2)
            .addChoice('3', 3)
            .addChoice('4', 4)
            .addChoice('5', 5)
            .addChoice('6', 6)
            .addChoice('7', 7)
            .addChoice('8', 8)
            .addChoice('9', 9)
            .addChoice('10', 10)
        ),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}
    
async function command(interaction)
{
    //if (!g.allowed(interaction, 0)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth();
    const currentDay = d.getDate();
    const currentHour = d.getHours();
    const currentMinute = d.getMinutes();
    
    let startYear, startMonth, startDay, startHour, startMinute;
    //console.log(`00, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    startYear = currentYear;
    startMonth = interaction.options.getInteger('month') ?? startMonth;
    if (startMonth !== undefined && startMonth != currentMonth)
    {
        //console.log(`01, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
        startDay = 1;
        startHour = 0;
        startMinute = 0;
        if (startMonth<currentMonth)
        {
            startYear++;
        }
        //console.log(`02, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    }
    else startMonth = currentMonth;
    //console.log(`03, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    startDay = interaction.options.getInteger('day') ?? startDay;
    if (startDay !== undefined && startDay != currentDay)
    {
        //console.log(`04, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
        startHour = 0;
        startMinute = 0;
        if (startDay<currentDay && startMonth==currentMonth)
        {
            startMonth++;
        }
        //console.log(`05, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    }
    else startDay = currentDay;
    //console.log(`06, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    startHour = interaction.options.getInteger('hour') ?? startHour;
    if (startHour !== undefined && startHour != currentHour)
    {
        //console.log(`07, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
        startMinute = 0;
        if (startHour<currentHour && startDay==currentDay && startMonth==currentMonth)
        {
            startDay++;
        }
        //console.log(`08, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    }
    else startHour = currentHour;
    //console.log(`09, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    startMinute = interaction.options.getInteger('minute') ?? startMinute;
    if (startMinute !== undefined && startMinute != currentMinute)
    {
        //console.log(`10, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
        if (startMinute<currentMinute && startHour==currentHour && startDay==currentDay && startMonth==currentMonth)
        {
            startHour++;
        }
        //console.log(`11, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    }
    else
    {
        //console.log(`12, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
        startMinute = 0;
        if (currentMinute>0 && startHour==currentHour && startDay==currentDay && startMonth==currentMonth)
        {
            startHour++;
        }
        //console.log(`13, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    }
    //console.log(`14, ${startYear}, ${startMonth}, ${startDay}, ${startHour}, ${startMinute}`)
    let currentTime = Date.UTC(currentYear, currentMonth, currentDay, currentHour, currentMinute) / 1000;
    let startTime = Date.UTC(startYear, startMonth, startDay, startHour, startMinute) / 1000;
    const interval = 60*(interaction.options.getInteger('interval') ?? 60);
    const suggestions = interaction.options.getInteger('suggestions') ?? 1;
    
    const replies = [];
    
    replies.push(await interaction.editReply(`<t:${startTime}:F>`).catch(console.error));
    replies[0].react('👍').catch(console.error);
    replies[0].react('👎').catch(console.error);
    
    for (let i=1; i<suggestions; i++)
    {
        replies.push(await interaction.channel.send(`<t:${startTime+i*interval}:F>`).catch(console.error));
        replies[i].react('👍').catch(console.error);
        replies[i].react('👎').catch(console.error);
    }
    
    for (let r=0; r<replies.length; r++)
    {
        const collectorFilter = (reaction, user) =>
        {
            return reaction.emoji.name == '👎' && user.id === interaction.user.id;
        };
        const collector = replies[r].createReactionCollector({filter: collectorFilter, time: 3600000});

        collector.on('collect', (reaction, user) =>
        {
            //console.log(`Removed ${r}`);
            replies[r].delete();
            collector.stop();
        });

        collector.on('end', collected =>
        {
            //console.log(`Ended ${r}`);
        });
    }
    success = true;
}