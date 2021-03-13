const db = require('quick.db')
var cooldown = new db.table("cooldown")
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  let user = message.author

  let timeout = 120000;

  let daily = await cooldown.fetch(`cooldown_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

  message.channel.send(`${client.emotes.error} | Traveler, I'm tired from the last time you made me play these songs! I'll be available to play again in **${time.minutes}m** and **${time.seconds}s**.`)

  } else {

  let songs = "https://youtu.be/d5MrlIKlDno?list=OLAK5uy_lhaX2hxyuY9K7hQzfjnZwttsNuoQKH0Hg"
  try {
    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
    client.distube.play(message, songs)
    cooldown.set(`cooldown_${user.id}`, Date.now())
  } catch (e) {
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
  }
}

exports.help = {
  name: "jade",
  description: "Loads the Jade Moon over a Sea of Clouds playlist!",
  usage: "jade",
  category: "Playlists"
}

exports.aliases = []