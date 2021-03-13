const { Prefix, token, footer } = require("../config.json");

module.exports = (client) => {
  console.log(`${client.user.tag} is online and ready to play music!`)

      setInterval(function() {
        let links = ["https://www.twitch.tv/Jeydin21", "https://www.twitch.tv/Jeydin21"];
        let statusLinks = links[Math.floor(Math.random()*links.length)];

        let statuses = [`${Prefix}help • ${client.guilds.cache.size} servers!`]
        let status = statuses[Math.floor(Math.random()*statuses.length)];
  
        client.user.setActivity(status, {
            type: "STREAMING",
            url: statusLinks
          });
    }, 10000)
}