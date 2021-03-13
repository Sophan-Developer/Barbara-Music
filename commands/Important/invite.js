const Discord = require('discord.js')
const { Prefix, token, footer } = require("../../config.json");

exports.run = (client, message, args) => {
  let helpembed = new Discord.MessageEmbed()
    .setTitle("Click Me To Invite Me To Your Server!")
    .setURL(`https://discordapp.com/oauth2/authorize/?permissions=3525952&scope=bot&client_id=${client.user.id}`)
    .setDescription("Consider inviting our bot to a server, it helps us in ways you can't imagine!")
    .setTimestamp()
    .setFooter(footer, message.client.user.displayAvatarURL( { format: "png" } ));
    message.channel.send(helpembed)
}

exports.help = {
  name: "invite",
  description: "Gives a link to invite me to your server!",
  usage: "invite",
  category: "Important"
}

exports.aliases = []
