exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
  let string = args.join(" ")
  if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
  try {
    client.distube.play(message, string)
  } catch (e) {
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
}

exports.help = {
  name: "play",
  description: "Plays music in a voice channel!",
  usage: "play [query]",
  category: "Music"
}

exports.aliases = ["p"]