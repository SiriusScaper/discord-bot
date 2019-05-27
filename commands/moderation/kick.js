const { RichEmbed } = require('discord.js')
const { light_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'kick',
    description: 'kicks a user in the discord server',
    usage: '!kick <@user> <reason>',
    category: 'moderation',
    authorized: 'Moderators',
    aliases: ['k', 'boot'],
  },
  run: async (bot, message, args) => {

    // Check if the user has permission to call the command
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("KICK_MEMBERS", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for unmuting
    const kickUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!kickUser) return message.channel.send(`You need to tell me who to kick!`)

    let reason = args.slice(1).join(" ")
    if (!reason) return message.me.send('A reason must be given')

    // Kick specified user
    kickUser.user.send(`You have been kicked in ${message.guild.name} for ${reason}`).then(() => kickUser.kick()).catch(console.error)

    message.channel.send(`${kickUser.user.username} was kicked for ${reason}`).then(msg => msg.delete(10000))

    // Send a message to the modlogs channel  
    const sEmbed = new RichEmbed()
      .setColor(light_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'kick')
      .addField('Kicked User:', kickUser.user.username)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  },
}