const { RichEmbed } = require('discord.js')
const { light_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'ban',
    description: 'Bans a user from the discord server',
    usage: '!ban <@user> <reason>',
    category: 'moderation',
    authorized: 'Administrators',
    aliases: ['b', 'banish', 'remove'],
  },
  run: async (bot, message, args) => {

    // Check if the user has permission to call the command
    if (!message.member.hasPermission("BAN_MEMBERS") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("BAN_MEMBERS", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for banning
    const banUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!banUser) return message.channel.send(`You need to tell me who to ban!`)

    let reason = args.slice(1).join(" ")
    if (!reason) return message.me.send('A reason must be given')

    // Ban specified user
    banUser.user.send(`You have been banned in ${message.guild.name} for ${reason}`).then(() => {
      message.guild.ban(banUser, { days: 1, reason: reason })
    }).catch(console.error)

    message.channel.send(`${banUser.user.username} was banned for ${reason}`).then(msg => msg.delete(10000))
    // Send a message to the modlogs channel  
    const sEmbed = new RichEmbed()
      .setColor(light_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'ban')
      .addField('Banned User:', banUser.user.username)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  },
}