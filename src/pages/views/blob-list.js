'use strict'

const {
  a,
  code,
  h1,
  section,
  ul,
  li
} = require('hyperaxe')
const template = require('./components/template')

module.exports = ({ blobList }) => template(
  section({ class: 'message blob-list' },
    h1('Blobs'),
    ul(
      blobList.map((blob) => {
        const href = `/blob/${encodeURIComponent(blob)}`
        return li(a({ href }, code(blob)))
      })
    )
  )
)
