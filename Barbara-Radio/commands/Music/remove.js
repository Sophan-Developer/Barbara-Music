exports.run = (client, message, args) => {
   const queue = client.distube.getQueue(message);

   const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue!`)

    if (!args.length) return message.channel.send(`${client.emotes.error} | You must specify a queue number!`);
    if (isNaN(args[0])) return message.channel.send(`${client.emotes.error} | That is not a number!`);
    if (args[0] > queue.songs.length - 1) return message.channel.send(`${client.emotes.error} | Invalid queue number!`)

    const song = queue.songs.splice(args[0], 1);
    message.channel.send(`${client.emotes.success} |  Removed the song from the queue!`);
}

  exports.help = {
  name: "remove",
  description: "Removes a song from the queue!",
  usage: "remove [number]",
  category: "Music"
}

exports.aliases = []