const Discord = require('discord.js')
const { Prefix, token, footer } = require('../../config.json')

exports.run = (client, message, args) => {
  let restartEmbed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription("I am now restarting...")
  .setTimestamp()
  .setFooter(footer, client.user.displayAvatarURL({format: "png"}))
  message.channel.send(restartEmbed)
  client.destroy()
}

exports.help = {
    name: "shutdown",
    description: "Shuts down the bot",
    usage: "shutdown",
    category: "Administrator"
}

exports.aliases = []