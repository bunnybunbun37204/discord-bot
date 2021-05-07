import Play from './music.js'
import ReplyMSg from './text_reply.js';
import UserManagement from './user_management.js';

const music = new Play();
const botnaja_reply = new ReplyMSg();
const user_management = new UserManagement();
let isActive = false;

export default class Command {
    command(client, msg, PREFIX_COMMAND) {
        if (msg.content.startsWith(PREFIX_COMMAND)) {
            const [real_command, ...args] = msg.content
                .trim()
                .substring(PREFIX_COMMAND.length)
                .split(/\s+/);
            if (real_command === "help") {
                msg.reply(
                    `คำสั่ง ทั้งหมดมีดังนี้
        \n1. ***$help*** เพื่อดูคำสั่งทั้งหมด
        \n2. ***$play <music link or music name>*** เพื่อเล่นเพลงที่ต้องการ และเพิ่มเพลงในคิว 
        \n3. ***$stop*** เพือหยุดเพลง
        \n4. ***$skip*** เพื่อข้ามไปเล่นเพลงถัดไป
        \n5. ***สนใจพัฒนา BotNAJA*** สามารถกดลิ้งค https://github.com/stonksfarm-development/discord-bot`
                );
            }
            else if (real_command === 'play' || real_command === 'skip' || real_command === 'stop') {
                music.execute(msg, args, real_command, client);
            }
            else if (real_command === 'activeBotReply') {
                isActive = true;
                msg.channel.send(`ฟังก์ชันตอบโต้กับผู้ใช้งานทำงานแล้ว!!!\nสามารถใช้คำสั่ง ***$inactiveBotReply*** เพื่อหยุดการใช้งาน`);
            }
            else if (real_command === 'inactiveBotReply') {
                isActive = false;
                msg.channel.send('ฟังก์ชันตอบโต้กับผู้ใช้งานได้หยุดลง!');
            }
            else if (real_command === 'kick' || real_command === 'ban') {
                user_management.excute(msg, args);
            }
            else {
                msg.reply("สามารถพิมพ์ $help เพื่อดูคำสั่งทั้งหมด");
            }
        }
        else {
            botnaja_reply.replyMsg(msg, isActive);
        }
    }
}