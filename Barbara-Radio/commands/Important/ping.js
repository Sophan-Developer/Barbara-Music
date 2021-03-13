const Discord = require('discord.js')
const { Prefix, token, footer } = require("../../config.json");

exports.run = (client, message, args) => {
  message.channel.send("Getting the ping...").then(msg => {
    msg.delete()
      var ping = msg.createdTimestamp - message.createdTimestamp + "ms";
let pingEmbed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("Pong!")
     .addField("API Ping:", `:hourglass_flowing_sand: ${client.ws.ping}ms`)
     .addField("Message Ping:", `:hourglass_flowing_sand: ${ping}`)
     .setFooter(footer, message.client.user.displayAvatarURL( { format: "png" } ))
     .setTimestamp()
     message.channel.send(pingEmbed)
});
}

exports.help = {
  name: "ping",
  description: "Displays my ping!",
  usage: "ping",
  category: "Important"
}

exports.aliases = ["p"]