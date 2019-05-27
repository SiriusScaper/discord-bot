const { readdirSync } = require('fs');

module.exports = (bot) => {
  const read = dirs => {
    const events = readdirSync(`./events/${dirs}`).filter(f => f.endsWith('.js'))
    for (let file of events) {
      const evt = require(`../events/${dirs}/${file}`)
      let evtName = file.split('.')[0]
      bot.on(evtName, evt.bind(null, bot))
    }
  }
  ["client", "guild"].forEach(d => read(d))
}