'use strict'

const listView = require('./views/public')
const post = require('./models/post')

module.exports = async function publicPage () {
  const messages = await post.latest({ private: false })

  return listView({ messages })
}
