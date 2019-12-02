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
    return cooler.get(ssb.get, {
      id: msgId,
      meta: true,
      private: true
    })
  },
  status: async () => {
    const ssb = await cooler.connect()
    return cooler.get(ssb.status)
  },
  latency: async () => {
    const ssb = await cooler.connect()

    const hour = 1000 * 60 * 60
    const source = await cooler.read(ssb.createLogStream, {
      gte: Date.now() - hour * 24,
      meta: true
    })

    return new Promise((resolve, reject) => {
      pull(
        source,
        pull.map((message) => {
          const result = {
            key: message.timestamp / 1000,
            value: (message.timestamp - message.value.timestamp) / 1000
          }
          return result
        }),
        pull.collect((err, val) => {
          if (err) return reject(err)
          resolve(val)
        })
      )
    })
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
