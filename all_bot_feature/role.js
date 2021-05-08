export default class RoleManager {
    permission = "ADMINISTRATOR";
    callback(msg, args) {
        const user = msg.mentions.user.first();
        if (!user) {
            msg.reply('Plz specify someone to give a role');
            return;
        }
        args.shift();
        const roleName = args.join(' ');
        const { guild } = msg;
        const role = guild.role.cache.find((role) => {
            return role.name === roleName;
        });
        if(!role){
            msg.reply(`there is no role with the name "${roleName}"`);
            return;
        }
        console.log('Made it this far');
    }
}