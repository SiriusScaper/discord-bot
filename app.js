// Dependencies & env var
const { Client, Collection } = require('discord.js')
require('dotenv').config()
const token = process.env.BOT_TOKEN
// Create a new client & collections & login
const bot = new Client();
["commands", "aliases"].forEach(c => bot[c] = new Collection());
["command", "console", "event"].forEach(h => require(`./handlers/${h}`)(bot));
// Bot login
bot.login(token);