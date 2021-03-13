const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const config = require("./config.json")
var userban = require('./userbans.json')
var serverban = require("./serverbans.json")
const Discord = require("discord.js");
const DisTube = require("distube")
const ffmpeg = require('ffmpeg-static')
const client = new Discord.Client();
const filters = require("./filters.json");

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnEmpty: true,  leaveOnFinish: true, leaveOnStop: true, youtubeCookie: config.youtubecookie, customFilters: filters, youtubeDL: true, updateYouTubeDL: true })
client.emotes = config.emoji;
client.footer = config.footer
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

require("fs").readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  console.log(`Loading ${files.length} Events!`);
  files.forEach((f, i) => {
    if (!f.endsWith(".js")) return;

    const event = require(`./events/${f}`);

    console.log(`${i + 1}: ${f} loaded!`);

    let eventName = f.split(".")[0];

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

const recursive = require("recursive-readdir");

recursive("./commands/", function (err, files) {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    process.stdout.write("Do you mind making the commands first?\n".red);
    return;
  }

  console.log(`\nLoading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./${f}`)];
    let props = require(`./${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
});
});


client.on('message', message =>{

  if (message.channel.type === "dm") return;
  if(message.author.bot) return

  if (userban[message.author.id]) return  
  if (serverban[message.guild.id]) return
    
  let prefix = config.Prefix

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length).toLowerCase());
  let alias = client.aliases.get(command.slice(prefix.length).toLowerCase());
  if (cmd) {
    cmd.run(client, message, args)
    ranCommand(cmd)
  }
  if (alias) {
    client.commands.get(alias).run(client, message, args)
    ranCommand(client.commands.get(alias))
  }
  function ranCommand(c) {
    console.log(`${config.Prefix}${c.help.name} ran by: ${message.author.tag} (${message.author.id}) from: ${message.guild.name} (${message.guild.id})`)

    
  }
})

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
    .on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
})
    .on("playSong", (message, queue, song) => {
    let playSongEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("▶️ Now Playing ▶️")
    .setDescription(`${client.emotes.play} | Playing **[${song.name}](${song.url})** - \`${song.formattedDuration}\`\nRequested by: **${song.user}**\n${status(queue)}`)
    .setTimestamp()
    .setFooter(client.footer, client.user.displayAvatarURL({format: "png"}))
    message.channel.send(playSongEmbed)
    })

    .on("addSong", (message, queue, song) => {
      let addSongEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor("☑️ Added Song ☑️")
      .setDescription(`${client.emotes.success} | Added **[${song.name}](${song.url})** - \`${song.formattedDuration}\` to the queue by **${song.user}**`)
      .setTimestamp()
      .setFooter(client.footer, client.user.displayAvatarURL({format: "png"}))
    message.channel.send(addSongEmbed)
    })

    .on("playList", (message, queue, playlist, song) => {
    let playListEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("▶️ Loading Playlist ▶️")
    .setDescription(`${client.emotes.play} | Playing \`${playlist.name}\` Playlist (${playlist.songs.length} songs).\nRequested by: **${song.user}**\nNow playing [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n${status(queue)}`)
    .setTimestamp()
    .setFooter(client.footer, client.user.displayAvatarURL({format: "png"}))
    message.channel.send(playListEmbed)
    })

    .on("addList", (message, queue, playlist) => {
    let addListEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("☑️ Added Playlist ☑️")
    .setDescription(`${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
    .setTimestamp()
    .setFooter(client.footer, client.user.displayAvatarURL({format: "png"}))
    message.channel.send(addListEmbed)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        let searchResultEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("Search results from YouTube", client.user.displayAvatarURL({format: "png"}))
        .setDescription(`${result.map(song => `**${++i}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}`)
        .addField("Send the song number you want to play", "*Enter anything else or wait 60 seconds to cancel*")
        .setTimestamp()
        .setFooter(client.footer, client.user.displayAvatarURL({format: "png"}))
        message.channel.send(searchResultEmbed)
    })
    // DisTubeOptions.searchSongs = true
    .on("empty", (message) => {
      message.channel.send(`${client.emotes.error} | The Voice Channel is empty. I'm leaving the channel! Thank you for using **${client.user.username}**!`)
    })
    .on("finish", (message) => message.channel.send(`${client.emotes.error} | There isn't anything left in the queue! Thank you for using **${client.user.username}**!`))
    .on("searchCancel", (message) => message.channel.send(`${client.emotes.error} | Invalid option! Searching canceled`))
    .on("error", (message, err) => message.channel.send(`${client.emotes.error} | An error was encountered: ${err}`
    ));

client.login(config.token)