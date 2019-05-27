const { RichEmbed } = require('discord.js')
const { dark_red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'mute',
    description: 'Mutes a user in the discord server',
    usage: '!mute <@user> <reason>',
    category: 'moderation',
    authorized: 'Moderators',
    aliases: ['m', 'nospeak', 'shush', 'shhh'],
  },
  run: async (bot, message, args) => {
    // Check if the user has permission to call the command
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(`You don't have the necessary permissions to use this command.`)

    if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATION") || !message.guild.owner) return message.channel.send(`I don't have permission to use this command.`)

    // Check if a username was supplied and a reason for muting
    const mutedUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!mutedUser) return message.channel.send(`You need to tell me who to mute!`)

    let reason = args.slice(1).join(" ")
    if (!reason) return message.channel.send('You must give me a reason!')

    // Define and create mute role if it doesn't exist
    let muterole = message.guild.roles.find(f => f.name === "Muted")
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: 'Muted',
          color: '#514f48',
          permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
          })
        })
      } catch (err) {
        console.log(err.stack)
      }
    }

    // Add role to the user being muted and send a dm with the reaosn why they were muted
    mutedUser.addRole(muterole.id).then(() => {
      message.delete()
      message.channel.send(`${mutedUser.user.username} was muted successfully.`)
      mutedUser.user.send(`You have been muted in ${message.guild.name} for ${reason}`).catch(console.error)
    })

    // Send a message to the modlogs channel
    const sEmbed = new RichEmbed()
      .setColor(dark_red)
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField('Moderation:', 'mute')
      .addField('Muted User:', mutedUser.user.username)
      .addField('Moderator:', message.author.username)
      .addField('Reason:', reason)
      .addField('Date:', message.createdAt.toLocaleString())

    let sendChannel = message.guild.channels.find(s => s.name === 'modlogs')
    sendChannel.send(sEmbed)
  }
}