'use strict'

const highlightJs = require('highlight.js')
const {
  h1,
  h2,
  h3,
  label,
  li,
  pre,
  progress,
  section,
  ul
} = require('hyperaxe')
const template = require('./components/template')

module.exports = ({ status }) => {


  const raw = JSON.stringify(status, null, 2)
  const rawHighlighted = highlightJs.highlight('json', raw).value

  return template(
    section({ class: 'message' },
      h1('Status'),
      pre({ innerHTML: rawHighlighted }))
  )
}
