exports.run = async (client, message, args) => {
    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    client.distube.stop(message);
    message.channel.send(`${client.emotes.success} | Stopped!`)
  }

exports.help = {
  name: "stop",
  description: "Makes me stop playing music and makes me leave the channel!",
  usage: "stop",
  category: "Music"
}

exports.aliases = ["dc", "disconnect", "fuckoff", "leave"]