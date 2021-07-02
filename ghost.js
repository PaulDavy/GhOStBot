const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');


// connect and show time on the log
client.on('ready', () => {
    let currentTime = new Date();
    console.log('Gh05t bot is  Online started at ' + currentTime);
});

// welcomes the new member and adds the to the correct role

client.on("guildMemberAdd", member =>{
  let guild = member.guild;
  let playRole = member.guild.roles.find('name', 'New members');
  console.log(`New user ${member.user} has joined the server and role has been assigned.`);
  member.addRole(playRole);
})


client.on('message', message => {

    let args = message.content.split(' ').slice(1);
    let argresult = args.join(' ');

    if (message.content.startsWith(settings.prefix))
        if (message.author.bot) return;
    let command = message.content.split(' ')[0];
    command = command.slice(settings.prefix.length);

    if (command === "ghost") {
        message.delete(5000);
        message.channel.sendMessage(`Yes i am active.`).then(msg => msg.delete(5000)); // 5 second delay on delete
    } else //test bot is awake

    if (command === "logout") {
        message.delete();
        if (message.author.id !== myid) {
            return message.reply("You dont have permissions to do this action");
        } else {
            client.destroy();
        }
    };

    //delete messages
    if (command === "delete") {
        let modRole = message.guild.roles.find("name", "Admin");
        if (!message.member.roles.has(modRole.id)) {
            return message.channel.sendMessage("You dont have permissions to do this action you are no an admin to this server.").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        if (args.length >= 3) {
            return message.channel.sendMessage(`you defined too many arguments. Usage: !delete (number of messages)`).then(msg => msg.delete(10000)); // 10 second delay on delete
        } else {
            var msg;
            if (args.length === 0) {
                msg = 2;
            } else {
                msg = parseInt(args[0]) + 1;
            }
            if (!isNaN(msg)) return message.channel.fetchMessages({
                limit: msg
            }).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        }
    } //delete messages ends

    //kick command
    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Admin");
        if (!message.member.roles.has(modRole.id)) {
            return message.channel.sendMessage("You dont have permissions to do this action you are no an admin to this server.").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        if (message.mentions.users.size === 0) {
            return message.channel.sendMessage("Please mention a user to kick!").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            return message.channel.sendMessage("That user doe not seem valid.").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.sendMessage("I Don't have the premissions to do this").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        client.users.get(message.guild.member(message.mentions.users.first()).sendMessage("You have been kicked from the server because you have shown little respect, if or when you come back please refrane from these actions.").catch(error => {
            if (error.response.body.message === 'Cannot send messages to this user') {
                message.channel.sendMessage(`I cannot send you that message ${user}, as it appears you have **Direct Messages's** disabled.`).catch(error => console.error(error));
            } else {
                console.error(error);
            }
        }));
        message.delete();
        kickMember.kick().catch(console.error);
    } // kick command ends

    //ban commands
    if (command === "ban") {
        let modRole = message.guild.roles.find("name", "Admin");
        if (!message.member.roles.has(modRole.id)) {
            return message.channel.sendMessage("You dont have permissions to do this action you are no an admin to this server.").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        if (message.mentions.users.size === 0) {
            return message.channel.sendMessage("Please mention a user to ban hammer!").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        let banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) {
            return message.channel.sendMessage("That user doe not seem valid.").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.sendMessage("I Don't have the premissions to do this").then(msg => msg.delete(10000)); // 10 second delay on delete
        }
        client.users.get(message.guild.member(message.mentions.users.first()).sendMessage("You have been banned from the server, next time please show a little more repsect to other users.").catch(error => {
            if (error.response.body.message === 'Cannot send messages to this user') {
                message.channel.sendMessage(`I cannot send you that message ${user}, as it appears you have **Direct Messages's** disabled.`).catch(error => console.error(error));
            } else {
                console.error(error);
            }
        }));
        message.delete();
        banMember.kick().then(member => {

        }).catch(E => {
            console.error(e);
        });
    }
});

client.login(settings.token);
