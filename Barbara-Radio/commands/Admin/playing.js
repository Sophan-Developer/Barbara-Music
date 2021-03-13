exports.run = async (client, message, args) => {
  if(message.author.id !== "667354950321569792") return
  message.channel.send(`I'm currently playing in **${client.voice.connections.size}** servers!`)
}

exports.help = {
    name: "playing",
    description: "Gets how many servers the bot is playing music in",
    usage: "playing",
    category: "Administrator"
}

exports.aliases = []