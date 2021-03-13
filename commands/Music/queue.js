const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["ADD_REACTIONS", "MANAGE_MESSAGES"]))
      return message.channel.send(`${client.emotes.error} | I am missing the Add Reactions or the Manage Messages permission!`);

    let queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue!`);

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 30000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  }

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `**${++j -1}.** [${track.name}](${track.url}) - \`${track.formattedDuration}\``).slice(1).join("\n");

    const embed = new MessageEmbed()
      .setAuthor("Server Queue", message.author.displayAvatarURL({dynamic: true}))
      .setColor("#F8AA2A")
      .setDescription(`**Current Song - [${queue[0].name}](${queue[0].url})**\n\n${info}`)
      .setTimestamp()
    embeds.push(embed);
  }

  return embeds;
}

  exports.help = {
  name: "queue",
  description: "Shows the queue for the server!",
  usage: "queue",
  category: "Music"
}

exports.aliases = ["q"]