module.exports = {
  config: {
    name: 'report',
    description: 'Report a user in the discord server',
    usage: '!report',
    authorized: 'Members',
    category: 'misc',
    aliases: ['r'],
  },
  run: async (bot, message, args) => {

    message.delete()
    // Mentioned or id of user
    let rUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!rUser) return message.channel.send('Please provide a user to report.').then(m => m.delete(15000))

    // Reason for reporting user
    let reason = args.slice(1).join(' ')
    if (!reason) return message.channel.send(`Please provide a reason for reporting **${rUser.user.tag}**.`).then(m => m.delete(15000))

    // Find reports channel
    let sendChannel = message.guild.channels.find(s => s.name === 'reports')

    // Send confirmation message of report
    message.channel.send("Your report has been filed to the moderation team. Thank you")

    // Send report to channel and add checkmark and cross
    sendChannel.send(`@everyone | **${message.author.tag}** has reported **${rUser.user.tag}** for **${reason}**.`).then(async m => {
      await m.react('✅')
      await m.react('❌')
    })
  },
}