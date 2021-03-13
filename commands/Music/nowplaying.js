const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
  let queue = client.distube.getQueue(message);
  if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)

  const song = queue.songs[0];
  const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
  const left = song.duration - seek;

  let nowPlaying = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("▶️ Now Playing ▶️")
    .setThumbnail(song.thumbnail)
    .setDescription(`**[${song.name}](${song.url})**`)
    .addField("Views", `\`${song.views}\``, true)
    .addField("Likes :thumbsup:", `\`${song.likes}\``, true)
    .addField("Dislikes :thumbsdown:", `\`${song.dislikes}\``, true)
    .addField("Requested By", song.user, true)
    .addField("Volume", `\`${queue.volume}%\``, true)
    .addField("Repeat Mode", `\`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\``, true)
    .addField("Autoplay Mode", `\`${queue.autoplay ? "On" : "Off"}\``, true)
    .setTimestamp()

  if (song.duration > 0) {
    nowPlaying.addField(
      "Song Progress Bar",
      `\`${new Date(seek * 1000).toISOString().substr(11, 8)}\`` + 
      " [" +
      createBar(song.duration == 0 ? seek : song.duration, seek, 15)[0] +
      "] " +
      `\`${(song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8))}\``,
      false
    );
    nowPlaying.setFooter(client.footer, client.user.displayAvatarURL({format: "png"}))
  }

  return message.channel.send(nowPlaying);
}

exports.help = {
  name: "nowplaying",
  description: "Gets the data of the song that is currently playing!",
  usage: "nowplaying",
  category: "Music"
}

exports.aliases = ["np"]