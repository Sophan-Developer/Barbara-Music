const fs = require("fs");
var serverban = require("../../serverbans.json")

exports.run = async (client, message, args) => {
  if(message.author.id !== "667354950321569792") return
	let server = args[0]
  let fish = client.guilds.cache.get(args[0])
        let reason = args.slice(1).join(" ")
        if(!server) return message.channel.send("You must put a server to add to the Server Bot Ban Database!")
        if(!reason) return message.channel.send("You must give a reason!")
				serverban[server] = {'servername': fish.name, 'reason': reason}
				fs.writeFile("./serverbans.json", JSON.stringify(serverban, null, 4), function(err){
	          	if (err) { console.log(log_time() + log_error + err) }
	            })
        message.channel.send(`Added **${fish.name}** (${fish.id}) to the Server Bot Ban Database! Reason: **${reason}**`)
};

exports.help = {
    name: "serverban",
    description: "Adds a server to the User Bot Ban Database!",
    usage: "serverban [ID]",
    category: "Administrator"
}

exports.aliases = []