'use strict'

const cooler = require('./lib/cooler')
const markdown = require('./lib/markdown')

const nullImage = `&${'0'.repeat(43)}=.sha256`

module.exports = {
  name: async (feedId) => {
    const ssb = await cooler.connect()
    return cooler.get(
      ssb.names.getSignifier, {
        id: feedId
      }
    )
  },
  image: async (feedId) => {
    const ssb = await cooler.connect()
    const raw = await cooler.get(
      ssb.names.getImageFor, {
        id: feedId
      }
    )

    if (raw == null || raw.link == null) {
      return nullImage
    } if (typeof raw.link === 'string') {
      return raw.link
    }
    return raw
  },
  description: async (feedId) => {
    return "TODO"
  }
}
