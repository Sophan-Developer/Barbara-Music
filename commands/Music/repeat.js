exports.run = async (client, message, args) => {
    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    let mode = null;
    switch (args[0]) {
      case "off":
        mode = 0
        break
      case "song":
        mode = 1
        break
      case "queue":
        mode = 2
        break
    }
    mode = client.distube.setRepeatMode(message, mode);
    mode = mode ? mode == 2 ? "All Queue" : "This Song" : "Off";
    message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``);
  }

  exports.help = {
  name: "repeat",
  description: "Repeats the current queue or the current song.",
  usage: "repeat [song/queue/off]",
  category: "Music"
}

exports.aliases = ["loop", "rp"]