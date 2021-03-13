exports.run = async (client, message, args) => {
    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    let volume = parseInt(args[0]);
    if(volume < 0 || volume > 500) return message.channel.send(`${client.emotes.error} | You cannot set the volume to that! You can only change the volume from 0-500.`)
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
    client.distube.setVolume(message, volume);
    message.channel.send(`${client.emotes.success} | Volume set to \`${volume}\``)
  }

exports.help = {
  name: "volume",
  description: "Allows you to toggle the volume of the music that is playing!",
  usage: "volume",
  category: "Music"
}

exports.aliases = ["vol"]