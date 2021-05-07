export default class UserManagement {
    excute(msg, command, args) {
        if (command === 'kick') {
            this.kickUser(msg, args);
        }
        else if (command === 'band') {
            this.banUser(msg, args);
        }
    }
    kickUser(msg, args) {
        if (!msg.member.hasPermission('KICK_MEMBERS'))
            return msg.reply('คุณไม่ได้รับการอนุญาตให้ใช้คำสั่งนี้');
        if (args.length === 0)
            return msg.reply('กรุณาใส่ ID');
        let member = msg.guild.members.cache.get(args[0]);
        if (member) {
            member
                .kick()
                .then((member) => msg.channel.send(`${member} ถูกเตะออก.`))
                .catch((err) => msg.channel.send('บอทไม่สามารถเตะสมาชิกคนนี้ได้ :('));
        } else {
            msg.channel.send('ไม่พบสมาชิก');
        }
    }
    async banUser(msg, args) {
        if (!msg.member.hasPermission('BAN_MEMBERS'))
            return msg.reply("คุณไม่ได้รับการอนุญาตให้ใช้คำสั่งนี้");
        if (args.length === 0) return msg.reply("กรุณาใส่ ID");
        try {
            const user = await msg.guild.members.ban(args[0]);
            msg.channel.send('ผู้ใช้งานรายนี้ถูกแบนแล้ว');
        } catch (err) {
            console.log(err);
            msg.channel.send('เกิดข้อผิดพลาดในการแบนผู้ใช้งาน');
        }
    }

}