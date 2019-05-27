const { RichEmbed } = require('discord.js')
const { light_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'unban',
    description: 'Unbans a user from the discord server',
    usage: '!unban <@user> <reason>',
    category: 'moderation',
    authorized: 'Administrators',
    aliases: ['ub', 'unbanish', 'unremove'],
  },
  run: async (bot, message, args) => {

    // Check if the user has permission to call the command
    if (!message.member.hasPermission("BAN_MEMBERS") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("BAN_MEMBERS", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for banning
    if (isNaN(args[0])) return message.channel.send('You must provide a user ID')
    const unbanUser = await bot.fetchUser(args[0])
    if (!unbanUser) return message.channel.send(`You need to tell me who to unban!`)

    let reason = args.slice(1).join(" ")
    if (!reason) return message.me.send('A reason must be given')

    // Ban specified user
    message.delete()
    try {
      message.guild.unban(unbanUser, reason)
      unbanUser.user.send(`You have been unbanned in ${message.guild.name} for ${reason}`)
    } catch (err) {
      (console.error(err.message))
    }

    message.channel.send(`${unbanUser.tag} was unbanned for ${reason}`).then(msg => msg.delete(10000))
    // Send a message to the modlogs channel  
    const sEmbed = new RichEmbed()
      .setColor(light_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'unban')
      .addField('Unbanned User:', `${unbanUser.username} (${unbanUser.id})`)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  },
}