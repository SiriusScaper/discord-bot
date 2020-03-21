/* eslint-disable no-console */
const isToday = require('date-fns/is_today')
const pubSubHubbub = require('pubsubhubbub')
const http = require('http')

const PORT = 3000

const server = http.createServer(handleRequest)

function handleRequest(req, res) {
}



const pubSubSubscriber = pubSubHubbub.createServer()
const topic = 'https://www.youtube.com/xml/feeds/videos.xml?channel_id=UC7W5LTUy7DJYpx0cpVKJe0g'
const hub = 'http://pubsubhubbub.appspot.com/'

pubSubSubscriber.on('subscribe', data => console.log(`${data.topic} subscribed`))

pubSubSubscriber.on('listen', () => {
  pubSubSubscriber.subscribe(topic, hub, err => {
    if (err) {
      console.log('Failed subscribing')
    }
  })
})


module.exports = bot => {

}