const { RichEmbed } = require('discord.js')
const { dark_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'unmute',
    description: 'Unmutes a user in the discord server',
    usage: '!unmute <@user> <reason>',
    authorized: 'Moderators',
    category: 'moderation',
    aliases: ['um', 'speak'],
  },
  run: async (bot, message, args) => {

    // Check if the user has permission to call the command
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for unmuting
    const mutedUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!mutedUser) return message.channel.send(`You need to tell me who to unmute!`)

    let reason = args.slice(1).join(" ")
    if (!reason) reason = ('No reason given.')

    // Find mute role if it exists and return a message if it doesn't exist
    let muterole = message.guild.roles.find(f => f.name === "Muted")
    if (!muterole) return message.channel.send('Cannot find a mute role to remove.')

    // Remove role from the user being unmuted and send a dm with the reaosn why they were unmuted
    mutedUser.removeRole(muterole.id).then(() => {
      message.delete()
      message.channel.send(`${mutedUser.user.username} was unmuted successfully.`)
      mutedUser.user.send(`You have been unmuted in ${message.guild.name} for ${reason}`).catch(console.error)
    })

    // Send a message to the modlogs channel  
    const sEmbed = new RichEmbed()
      .setColor(dark_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'unmute')
      .addField('Unmuted User:', mutedUser.user.username)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  },
}