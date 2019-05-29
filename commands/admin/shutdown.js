
module.exports = {
  config: {
    name: 'shutdown',
    description: 'Shutdown the bot',
    usage: '!shutdown',
    authorized: 'Admin',
    category: 'admin',
    aliases: ['botstop'],
  },
  run: async (bot, message, args) => {

    if (message.author.id != '124762196017152000') return message.channel.send('You are not the admin')

    try {
      await message.channel.send('Shutdown in 3...2...1')
      process.exit()
    } catch {
      message.channel.send(`Error: ${e.message}`)
    }
  }
}