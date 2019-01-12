const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const ms = require("ms");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    bot.user.setActivity(`Watching ${bot.guilds.size} servers// Watching over ${bot.user.size}// type ,help for more!`, {type: "WATCHING" })
});
bot.on("ready", () =>{
        console.log(`${bot.user.username} is online! in ${bot.guilds.size}`)
    bot.user.setPresence({
        game: {
            name : `Watching over ${bot.guilds.size} servers // watching over ${bot.users.size} Server Members/Users! // type ,help for more!`,
            type : 'Playing'
        },
        status : 'dnd',
    })
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}serverinfo`){
        
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined On", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount)

        return message.channel.send(serverembed)
    }

    if(cmd === `${prefix}botinfo`){
        
        let duration = bot.user.uptime;
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f13")
        .setThumbnail(bicon)
        .setFooter(`${prefix}help || Made By: Hunter L. #3037`, `${bicon}` + (Date.now() - message.createdTimestamp))
        .addField("Bot Name", bot.user.username, true)
        .addField("Bot Was Created On:", bot.user.createdAt, false)
        .addField("Bots Prefix", `${prefix}help`, true)
        .addField("Bot is in:", `**${bot.guilds.size} servers**`, false)
        .addField("Bot is watching over", `${bot.users.size} total users!`, true)
        .addField("Bot is being controlled in", `A total of ${bot.channels.size} channels!`, false)
        .addField("• Uptime ", `${duration}`, true);
        return message.channel.send(botembed);
    }
    if(cmd === `${prefix}servercounts`){
        let bicon = bot.user.displayAvatarURL;
        let servercount = new Discord.RichEmbed()
        .setDescription("Server Count // Server Names:")
        .setColor("#FFD700")
        .setThumbnail(bicon)
        .setFooter(`${prefix}help for more // Message By: ${bot.user.username}`, `${bicon}` + (Date.now() - message.createdTimestamp))
        .addField("Server Count:", `${bot.guilds.size} total servers`, true)
        .addField("Vist", "[Our Website](<https://sites.google.com/view/moderndayrpand-serversolutions>) for more details on our products", false);
        return message.channel.send(servercount)
    }
    if(cmd === `${prefix}test`){
        const localFileAttachment = new Discord.Attachment('./Company_Logo.png')
        return message.channel.send(localFileAttachment);
    }
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}report`){

        //!report @user this is the reason

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't Find A User!");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User:", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By:", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel:", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);


        return;
    }
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}kick`){
        

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(!kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be Kicked!");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setAuthor(bot.user.username)
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
        .addField("Kicked By:", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", kReason);

        let kickChannel = message.guild.channels.find(`name`, "log-chat");
        if(!kickChannel) return message.channel.send("Can't find log-chat channel.");

        message.guild.member(kUser).kick(kReason)
        kickChannel.send(kickEmbed);

        return;
    }

    if(cmd === `${prefix}ban`){
        
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(!kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be Kicked!");

        let sicon = message.guild.iconURL;
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Banned~")
        .setAuthor(bot.user.username)
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By:", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", bReason);

        let banChannel = message.guild.channels.find(`name`, "log-chat");
        if(!banChannel) return message.channel.send("Can't find log-chat channel.");

        message.guild.member(bUser).ban(bReason)
        banChannel.send(kickEmbed);

        return;
    }
});
 bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}help`){
        
        let bicon = bot.user.displayAvatarURL;
        let sicon = message.guild.iconURL;
        let helpEmbed = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("Help")
        .setDescription("Gives you this message")
        .setColor("#FFD700")
        .setThumbnail(sicon)
        .addField(`${prefix}report:`, "```allows you to report a user```", true)
        .addField(`${prefix}serverinfo`, "```gives you information about the server```")
        .addField(`${prefix}botinfo`, "```gives you information about the bot```")
        .addField(`${prefix}kick`, "```kicks a user only works for admins```")
        .addField( `${prefix}ban`, "```bans a user only works for admins```", false)
        .addField(`${prefix}servercounts`, "gives you a count of all the servers I am in")
        .addField(`${prefix}test`, "sends you a company logo for [Infusion Productions LLC](<https://infusion-productions.bubbleapps.io>)");

        return message.channel.send(helpEmbed)
    }
 });
bot.login(botconfig.token);
