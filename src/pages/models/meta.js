'use strict'

const cooler = require('./lib/cooler')
const pull = require('pull-stream')

module.exports = {
  myFeedId: async () => {
    const ssb = await cooler.connect()
    const whoami = await cooler.get(ssb.whoami)
    return whoami.id
  },
  get: async (msgId) => {
    const ssb = await cooler.connect()

    const message = await cooler.get(ssb.get, {
      id: msgId,
      meta: true,
      private: true
    })

    const publicWebHosting = await cooler.get(
      ssb.about.socialValue, {
        key: 'publicWebHosting',
        dest: message.value.author
      }
    )

    if (publicWebHosting !== true) {
      return { value: '[Public messages are redacted by default. Install SSB to see this message.]' }
    } else {
      return message
    }
  },
  status: async () => {
    const ssb = await cooler.connect()
    return cooler.get(ssb.status)
  },
  peers: async () => {
    const ssb = await cooler.connect()
    const peersSource = await cooler.read(ssb.conn.peers)

    return new Promise((resolve, reject) => {
      pull(
        peersSource,
        // https://github.com/staltz/ssb-conn/issues/9
        pull.take(1),
        pull.collect((err, val) => {
          if (err) return reject(err)
          resolve(val[0])
        })
      )
    })
  }
}
