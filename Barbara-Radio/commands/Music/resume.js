exports.run = async (client, message, args) => {
        const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
if (client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is something playing!`)
        try {
            client.distube.resume(message)
            message.channel.send(`${client.emotes.play} | Resumed the current song`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
}

  exports.help = {
  name: "resume",
  description: "Resumes the current song.",
  usage: "resume",
  category: "Music"
}

exports.aliases = ["rs"]