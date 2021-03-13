exports.run = async (client, message, args) => {
    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
    if(!args[0]) return message.channel.send(`${client.emotes.error} You must specify a mode to set!`)
    let mode = client.distube.toggleAutoplay(message);
        message.channel.send(`${client.emotes.success} | Set autoplay mode to \`${(mode ? "On" : "Off")}\`!`)
  }

  exports.help = {
  name: "autoplay",
  description: "Sets the autoplay mode!",
  usage: "autoplay [on/off]",
  category: "Music"
}

exports.aliases = ["ap"]