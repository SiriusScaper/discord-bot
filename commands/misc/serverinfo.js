const { RichEmbed } = require('discord.js')
const { Cyan } = require('../../colors.json')


module.exports = {
  config: {
    name: "serverinfo",
    description: "Information about the server",
    usage: "!serverinfo",
    category: 'misc',
    authorized: "Members",
    aliases: ["si", "server", "sinfo"]
  },
  run: async (bot, message, args) => {

    // Send a rich embed with information regarding the discord such as the name, member count and owner
    const { iconURL, name, owner, memberCount, roles } = message.guild
    const sEmbed = new RichEmbed()
      .setColor(Cyan)
      .setTitle("Sever Info")
      .setThumbnail(iconURL)
      .setAuthor(`${name} Information`, iconURL)
      .addField("**Organization Name:**", `${name}`, true)
      .addField("**Discord Server Owner:**", `${owner}`, true)
      .addField("**Member Count:**", `${memberCount}`, true)
      .addField("**Role Count:**", `${roles.size}`, true)
      .setFooter('TestBot | Footer', bot.user.displayAvatarURL)
    message.channel.send({ embed: sEmbed })
  }
}