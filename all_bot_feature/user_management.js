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
}