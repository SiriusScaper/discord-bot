const { RichEmbed } = require('discord.js')
const { light_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'addrole',
    description: 'Add a role to a user in the discord server',
    usage: '!addrole <@user> <reason>',
    authorized: 'Moderators',
    category: 'moderation',
    aliases: ['ar', 'roleadd'],
  },
  run: async (bot, message, args) => {

    // Check if the user and bot have permission to call the command
    if (!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for adding the role
    const addroleUser = message.mentions.members.first() || message.guild.members.find(t => t.user.tage === (args[0])) || message.guild.members.get(args[0])
    if (!addroleUser) return message.channel.send(`You need to tell me which user to add a role to!`)

    let reason = args.slice(2).join(" ")
    if (!reason) return message.channel.send('Error! No reason given. Please provide one.')

    // Find mute role if it exists and return a message if it doesn't exist
    let newrole = message.guild.roles.find(f => f.name == args[1] || message.guild.roles.find(f => f.id == args[1]) || message.mentions.roles.first())
    if (!newrole) return message.channel.send('Please provide a role to add to specified user.')

    // Remove role from the user being unmuted and send a dm with the reaosn why they were unmuted
    if (addroleUser.roles.has(newrole.id)) {
      return message.channel.send(`${addroleUser.displayName}, already has that role.`)
    } else {
      await addroleUser.addRole(newrole.id).catch(e => console.log(e.message))
      message.channel.send(`The role, ${newrole.name}, has been added to ${addroleUser.displayName}.`)
    }

    // Send a message to the modlogs channel  
    const sEmbed = new RichEmbed()
      .setColor(light_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'Addrole')
      .addField('User & Role:', `${addroleUser.user.username}, ${newrole}`)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  },
}