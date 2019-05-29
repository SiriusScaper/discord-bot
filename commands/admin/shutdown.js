
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
    // Check if the user seding the command is the admin of the bot
    if (message.author.id != '124762196017152000') return message.channel.send('You are not the admin')
    // Send a message indicating that the bot is shutting down and shut it down with process.exit
    try {
      await message.channel.send('Shutdown in 3...2...1')
      process.exit()
      // Send an error message if it does not work
    } catch {
      message.channel.send(`Error: ${e.message}`)
    }
  }
}