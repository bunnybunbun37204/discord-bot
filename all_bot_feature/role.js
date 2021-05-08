export default class RoleManager {
    permission = "ADMINISTRATOR";
    excute(msg,command, args){
        if(command === 'giverole'){
            this.giveRole(msg,args);
        }
        else if(command === 'removerole'){
            //
        }
    }
    giveRole(msg, args) {
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
        if(!role){
            msg.reply(`there is no role with the name "${roleName}"`);
            return;
        }
        console.log('Made it this far');
    }
}