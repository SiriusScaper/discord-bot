const { RichEmbed } = require('discord.js')
const { Cyan } = require('../../colors.json')


module.exports = {
  config: {
    name: "userinfo",
    description: "Information about a user",
    usage: "!userinfo <@mention>",
    category: 'misc',
    authorized: "Members",
    aliases: ["ui", "user", "uinfo"]
  },
  run: async (bot, message, args) => {
    const embed = new RichEmbed()
    const { username, id, discriminator, displayAvatarURL, createdAt } = message.author
    if (!args[0]) {
      embed
        .setColor(Cyan)
        .setTitle("User Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${username} Information`, displayAvatarURL)
        .addField("**Username:**", `${username}`, true)
        .addField("**Discriminator:**", `${discriminator}`, true)
        .addField("**ID:**", `${id}`, true)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**Created At:**", `${createdAt}`)
        .setFooter('FtL Bot | Footer', bot.user.displayAvatarURL)
      message.channel.send(embed)
    } else {
      let rUser = message.mentions.members.first() || message.guild.members.get(args[1])
      embed
        .setColor(Cyan)
        .setTitle("User Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${rUser.user.username} Information`, rUser.user.displayAvatarURL)
        .addField("**Username:**", `${rUser.user.username}`, true)
        .addField("**Discriminator:**", `${rUser.user.discriminator}`, true)
        .addField("**ID:**", `${rUser.user.id}`, true)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**Created At:**", `${rUser.user.createdAt}`)
        .setFooter('FtL Bot | Footer', bot.user.displayAvatarURL)
      message.channel.send(embed)
    }

  }
}