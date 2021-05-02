const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot
const queue = new Map();

module.exports = {
    name: 'play',
    bot_command: ['skip', 'stop','play'], //This command in bot
    cooldown: 0,
    description: 'music bot',
    async execute(msg,args, command, client){

        console.log('START');
        //Check bot permissions
        const voice_channel = msg.member.voice.channel;
        if (!voice_channel) return msg.channel.send('เข้าห้องพูดก่อนใช้คำสั่งเกี่ยวกับเพลง');
        const permissions = voice_channel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) return msg.channel.send('คุณไม่มีใบอนุญาตทำสิ่งนี้');
        if (!permissions.has('SPEAK')) return msg.channel.send('คุณไม่มีใบอนุญาตทำสิ่งนี้');

        //This is our server queue.
        const server_queue = queue.get(msg.guild.id);

        //If the user has used the play command
        if (command === 'play'){
            if (!args.length) return msg.channel.send('กรุณาใส่ชื่อ/ลิ้งค์เพลงที่ต้องการเล่น!!');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     msg.channel.send('ไม่สามารถค้นหาวิดีโอได้.');
                }
            }

            //If the server queue does not exist.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: msg.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue.
                queue.set(msg.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(msg.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(msg.guild.id);
                    msg.channel.send('การเชื่อมต่อขาดหาย');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return msg.channel.send(`👍 **${song.title}** ถูกเพิ่มลงในคิวแล้ว!`);
            }
        }

        else if(command === 'skip') skip_song(msg, server_queue);
        else if(command === 'stop') stop_song(msg, server_queue);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 กำลังเล่น **${song.title}**`)
}

const skip_song = (msg, server_queue) => {
    if (!msg.member.voice.channel) return msg.channel.send('เข้าห้องพูดก่อน skip เพลงนะจ๊ะ');
    if(!server_queue){
        return msg.channel.send(`ไม่มีเพลงในคิว 😔`);
    }
    server_queue.connection.dispatcher.end();
    msg.channel.send('ข้ามไปเพลงถัดไป');
}

const stop_song = (msg, server_queue) => {
    if (!msg.member.voice.channel) return msg.channel.send('เข้าห้องพูดก่อนหยุดเพลงนะจ๊ะ');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    msg.channel.send('เพลงถูกหยุดเล่นแล้ว');
}