exports.run = async (client, message, args) => {
        const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
let queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue!`)
        try {
            client.distube.shuffle(message)
            message.channel.send(`${client.emotes.repeat} | Shuffled the server queue!`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
}

  exports.help = {
  name: "shuffle",
  description: "Shuffles the server queue!",
  usage: "shuffle",
  category: "Music"
}

exports.aliases = []