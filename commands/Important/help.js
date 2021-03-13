const Discord = require('discord.js');
const recursive = require("recursive-readdir");
const { Prefix, token, footer } = require("../../config.json");

exports.run = (client, message, args) => {
 args = args.join(" ")
   let important = [], music = [], playlists = []
  if (!args) {
   
recursive("./commands/", function (err, files) {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  jsfile.forEach((f, i) => {
    if (f === "commands/Moderator/msgLog.js") return;
    let props = require(`../../${f}`);
    if (f.startsWith("commands/Important")) important.push(`\`${props.help.name}\``)
    if (f.startsWith("commands/Music")) music.push(`\`${props.help.name}\``)
    if (f.startsWith("commands/Playlists")) playlists.push(`\`${props.help.name}\``)
})

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor("Barbara Music Command List", message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`Hello! This is my commands list of all the commands that I have to offer you!\n\nDo \`${Prefix}help [command name]\` to see more information on a command!\n`)
  .setThumbnail(client.user.displayAvatarURL())
  .addField(":pushpin:  Important Commands", important.join(", "))
  .addField(":musical_note:  Music Commands", music.join(", "))
  .addField(":notes:  Genshin Impact Playlists", playlists.join(", "))
  .setTimestamp()
  .setFooter(footer, message.client.user.displayAvatarURL({dynamic: true}))
  message.channel.send(embed)

  });
  } else {
    let cmd = client.commands.get(args.toLowerCase())
    if (!cmd) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("That is not a valid command!"))
    if (cmd.help.category === "Administrator") return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("That is not a valid command!"))



    let aliases;
    if (cmd.aliases.length > 0) aliases = cmd.aliases.join(", ")
    else aliases = "None"
    console.log(aliases)
    const embed2 = new Discord.MessageEmbed()
    .setDescription(`Command Info on **${cmd.help.name}**\n\n**[Required Arguments]**\n**<Optional Arguments>**`)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .addField("Category", `**${cmd.help.category}**`, true)
    .addField("\u200b", "\u200b", true)
    .addField("Description", `**${cmd.help.description}**`, true)
    .addField("Usage", `**m!${cmd.help.usage}**`, true)
    .addField("\u200b", "\u200b", true)
    .addField("Aliases", `**${aliases}**`, true)
    message.channel.send(embed2)
  }
}

exports.help = {
  name: "help",
  description: "Shows all of my beautiful commands!",
  usage: "help <command name>",
  category: "Important"
}



exports.aliases = ["cmds", "commands"]
