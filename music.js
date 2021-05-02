const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'], //This command in bot
    cooldown: 0,
    description: 'music bot',
    async execute(message,args, cmd, client){

        console.log('START');
        //Check bot permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('เข้าห้องพูดก่อนใช้คำสั่งนี้');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('คุณไม่มีใบอนุญาตทำสิ่งนี้');
        if (!permissions.has('SPEAK')) return message.channel.send('คุณไม่มีใบอนุญาตทำสิ่งนี้');

        //This is our server queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play'){
            if (!args.length) return message.channel.send('กรุณาใส่ชื่อ/ลิ้งค์เพลงที่ต้องการเล่น!!');
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
                     message.channel.send('ไม่สามารถค้นหาวิดีโอได้.');
                }
            }

            //If the server queue does not exist.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('การเชื่อมต่อขาดหาย');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** ถูกเพิ่มลงในคิวแล้ว!`);
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
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

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('เข้าห้องพูดก่อน skip เพลงนะจ๊ะ');
    if(!server_queue){
        return message.channel.send(`ไม่มีเพลงในคิว 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('เข้าห้องพูดก่อนหยุดเพลงนะจ๊ะ');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}