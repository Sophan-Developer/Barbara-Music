const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      
if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
  try {
    client.distube.seek(message, 0)
    message.channel.send(`${client.emotes.success} | Restarted the current song!`)
  } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
}

exports.help = {
  name: "restart",
  description: "Restarts the current song!",
  usage: "restart",
  category: "Music"
}

exports.aliases = []