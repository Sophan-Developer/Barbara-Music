exports.run = async (client, message, args) => {
        const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
        let queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue!`)
if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        try {
            client.distube.jump(message, parseInt(args[0]))
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
}

exports.help = {
  name: "jump",
  description: "Jumps to a certain song in the queue!",
  usage: "jump [song number]",
  category: "Music"
}

exports.aliases = ["skipto"]