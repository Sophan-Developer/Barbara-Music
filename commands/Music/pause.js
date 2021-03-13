exports.run = async (client, message, args) => {
        const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        try {
            client.distube.pause(message)
            message.channel.send(`${client.emotes.pause} | Paused the current song`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
}

exports.help = {
  name: "pause",
  description: "Pauses the music in a voice channel!",
  usage: "pause",
  category: "Music"
}

exports.aliases = []