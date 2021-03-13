const db = require('quick.db')
var cooldown = new db.table("cooldown")
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  let user = message.author

  let timeout = 10000;

  let daily = await cooldown.fetch(`cooldown_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

  message.channel.send(`${client.emotes.error} | You are on a cooldown! You can use this command again in **${time.seconds}s**.`)

  } else {

    const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`${client.emotes.error} | Please join a voice channel, Traveler!`)
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Please join my voice channel, Traveler!`)
      if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)

    const queue = client.distube.getQueue(message)
    if(!args[0]) return message.channel.send(`${client.emotes.error} | The available filters are: Clear, Bassboost, 8D, Vaporwave, Nightcore, Phaser, Tremolo, Vibrato, Reverse, Treble, Normalizer, Surrounding, Pulsator, Subboost, Karaoke, Flanger, Gate, Haas, Mcompand, Double, Half, and **Cursed.**`)
    let choice = args[0].toLowerCase()
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    if(choice === "8d"){
      client.distube.setFilter(message, "8D")
      message.channel.send(`${client.emotes.success} | Set the filter as: \`8D\``)
    } else {
    if ((choice === "off") && queue.filter) client.distube.setFilter(message, queue.filter)
    else if (Object.keys(client.distube.filters).includes(choice)) client.distube.setFilter(message, choice)
    message.channel.send(`${client.emotes.success} | Set the filter as: \`${queue.filter || "Off"}\``)
    cooldown.set(`cooldown_${user.id}`, Date.now())
  }
  }
  }
  
  exports.help = {
    name: "filter",
    description: "Sets the filter for the current playing song!",
    usage: "filter [filter]",
    category: "Music"
  }
  
  exports.aliases = []