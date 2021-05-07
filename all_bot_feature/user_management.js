export default class UserManagement {
    kickUser(msg, args) {
        if (!msg.member.hasPermission('KICK_MEMBERS'))
            return msg.reply('You do not have permissions to use that command');
        if (args.length === 0)
            return msg.reply('Please provide an ID');
        let member = msg.guild.members.cache.get(args[0]);
        if (member) {
            member
                .kick()
                .then((member) => msg.channel.send(`${member} was kicked.`))
                .catch((err) => msg.channel.send('I cannot kick that user :('));
        } else {
            msg.channel.send('That member was not found');
        }
    }
    async banUser(msg, args) {
        if (!msg.member.hasPermission('BAN_MEMBERS'))
            return msg.reply("You do not have permissions to use that command");
        if (args.length === 0) return msg.reply("Please provide an ID");
        try {
            const user = await msg.guild.members.ban(args[0]);
            msg.channel.send('User was banned successfully');
        } catch (err) {
            console.log(err);
            msg.channel.send('An error occured. Either I do not have permissions or the user was not found');
        }
    }

}