const Discord = require('discord.js')
const { footer } = require("../../config.json");


exports.run = (client, message, args) => {
  let supportEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Click Here To Join The Support Server")
    .setURL("https://discord.gg/ufehmQhcrT")
    .setDescription("Click on the link above to join the support server for Barbara Music!")
    .setFooter(footer, message.client.user.displayAvatarURL( {format: "png"} ))
    .setTimestamp()
    message.channel.send(supportEmbed)
}

exports.help = {
  name: "support",
  description: "Gives an invite to the my support server, also my home!",
  usage: "support",
  category: "Important"
}

exports.aliases = ["server"]