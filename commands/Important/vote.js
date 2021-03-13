const Discord = require('discord.js')
const { footer } = require("../../config.json");


exports.run = (client, message, args) => {
  let supportEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Click Here To Vote For The Bot!")
  .setURL(`https://www.youtube.com/watch?v=xvFZjo5PgG0`)
  .setDescription("Voting isn't open right now!")
  .setFooter(footer, message.client.user.displayAvatarURL( { format: "png" } ))
  .setTimestamp()
  message.channel.send(supportEmbed)
}

exports.help = {
  name: "vote",
  description: "Gives a link to vote for me on Discord Bot List! Please do, it helps us very much, in ways you can't imagine!",
  usage: "vote",
  category: "Important"
}

exports.aliases = ["rep", "dbl"]