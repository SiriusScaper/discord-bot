const { RichEmbed } = require('discord.js')
const { prefix } = require('../../bot.json')
const { cyan } = require('../../colors.json')

module.exports = {
  config: {
    name: 'help',
    description: '',
    usage: '!usage',
    category: 'misc',
    authorized: "Members",
    aliases: ['h', 'commands'],
  },
  run: async (bot, message, args) => {
    let arr = []
    let cmdtypes = ["moderation", "misc"]
    let embed = new RichEmbed()

    if (!args[0]) {
      for (let i = 0; i < cmdtypes.length; i++) {
        arr.push(bot.commands.filter(c => c.config.category == cmdtypes[i].toLowerCase()).map(c => `\`${c.config.name}\``).join(" "))
        try {
          embed.addField(cmdtypes[i], arr[i])
        } catch (e) {
          embed.addBlankField()
        }
      }
      // Send an embed
      embed.setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Command usage
        The bot prefix is: ${prefix}`)
        .setFooter(`FtL Bot`, `${bot.user.displayAvatarURL}`)

      message.channel.send(embed)

    } else {
      let command = bot.commands.get(args[0].toLowerCase()) ? bot.commands.get(args[0].toLowerCase()).config : bot.commands.get(bot.aliases.get(args[0].toLowerCase())).config

      embed
        .setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`The bot prefix is: ${prefix} \n\n**Command:** ${command.name}
        **Description:** ${command.description || "No Description"}
        **Usage:** ${command.usage || "No uasage"}
        **Authorized:** ${command.authorized || "Members"}
        **Aliases:** ${command.aliases ? command.aliases.join(', ') : "None"}`)
        .setFooter(`FtL Bot`, `${bot.user.displayAvatarURL}`)

      message.channel.send(embed)
    }
  }
}