exports.run = async (client, message, args) => {
    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    let meow = client.distube.getQueue(message);
    if (!meow) return message.channel.send(`${client.emotes.error} | There is nothing in the queue to skip to!`)
    let queue = client.distube.skip(message);
    message.channel.send(`${client.emotes.success} | Skipped the current song!`)
  }

exports.help = {
  name: "skip",
  description: "Skips the current song.",
  usage: "skip",
  category: "Music"
}

exports.aliases = ["sk"]