const { RichEmbed } = require('discord.js')
const { light_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'removerole',
    description: 'Add a role to a user in the discord server',
    usage: '!removerole',
    authorized: 'Moderators',
    category: 'moderation',
    aliases: ['rr', 'roleremove'],
  },
  run: async (bot, message, args) => {

    // Check if the user and bot have permission to call the command
    if (!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for adding the role
    const removeroleUser = message.mentions.members.first() || message.guild.members.find(t => t.user.tage === (args[0])) || message.guild.members.get(args[0])
    if (!removeroleUser) return message.channel.send(`You need to tell me who to remove a role from!`)

    let reason = args.slice(2).join(" ")
    if (!reason) return message.channel.send('Error! No reason given. Please provide one.')


    // Find mute role if it exists and return a message if it doesn't exist
    let removerole = message.guild.roles.find(f => f.name == args[1] || message.guild.roles.find(f => f.id == args[1]) || message.mentions.roles.first())
    if (!removerole) return message.channel.send('Please provide a role to remove to specified user.')

    // Remove role from the user being unmuted and send a dm with the reaosn why they were unmuted
    if (!removeroleUser.roles.has(removerole.id)) {
      return message.channel.send(`${removeroleUser.displayName}, does not have that role.`)
    } else {
      await removeroleUser.removeRole(removerole.id).catch(e => console.log(e.message))
      message.channel.send(`The role, ${removerole.name}, has been removed from ${removeroleUser.displayName}.`)
    }

    // Send a message to the modlogs channel  
    const sEmbed = new RichEmbed()
      .setColor(light_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'Removerole')
      .addField('User & Role:', `${removeroleUser.user.username}, ${removerole}`)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  },
}