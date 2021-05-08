export default class RoleManager {
    permission = "ADMINISTRATOR";
    excute(msg, command, args) {
        const user = msg.mentions.users.first();
        if (!user) {
            msg.reply('Plz specify someone to give a role');
            return;
        }
        args.shift();
        const roleName = args.join(' ');
        const { guild } = msg;
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName;
        });
        if (!role) {
            msg.reply(`there is no role with the name "${roleName}"`);
            return;
        }
        const member = guild.members.cache.get(user.id);
        if (command === 'giverole') {
            member.roles.add(role);
            msg.reply(`that's now user have a "${roleName} role"`);
        }
        else if (command === 'removerole') {
            if(member.roles.cache.get(role.id)){
                member.roles.remove(role);
                msg.reply(`the user has no "${roleName} role"`);
            }
            else{
                msg.reply(`the user does not have "${roleName}" role`);
            }
        }
    }
}