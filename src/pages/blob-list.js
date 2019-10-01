'use strict'

const pull = require('pull-stream')
const blob = require('./models/blob')
const blobListView = require('./views/blob-list')

module.exports = async function blobListPage () {
  const source = await blob.list()

  return new Promise((resolve, reject) => {
    pull(
      source,
      pull.collect(async (err, blobList) => {
        if (err) {
          reject(err)
        } else {
          resolve(blobListView({ blobList }))
        }
      })
    )
  })
}
