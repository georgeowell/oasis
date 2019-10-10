'use strict'

const {
  a,
  body,
  head,
  html,
  li,
  link,
  main,
  meta,
  nav,
  p,
  title,
  ul
} = require('hyperaxe')

const doctypeString = '<!DOCTYPE html>'

const sourceLink = 'https://github.com/fraction/oasis'
const toAttributes = (obj) =>
  Object.entries(obj).map(([key, val]) => `${key}=${val}`).join(', ')

module.exports = (...elements) => {
  const nodes =
    html({ lang: 'en' },
      head(
        title('🏝️  Oasis'),
        link({ rel: 'stylesheet', href: '/theme.css' }),
        link({ rel: 'stylesheet', href: '/assets/style.css' }),
        link({ rel: 'stylesheet', href: '/assets/highlight.css' }),
        meta({
          name: 'description',
          content: 'friendly neighborhood scuttlebutt interface'
        }),
        meta({
          name: 'viewport',
          content: toAttributes({ width: 'device-width', 'initial-scale': 1 })
        })
      ),
      body(
        p({ class: 'motd' },
          'This is a read-only version of Oasis. Trying to publish a like or message will create an internal server error. ',
          a({ href: sourceLink }, 'Download Oasis for full functionality.')
        ),
        nav(
          ul(
            li(a({ href: '/' }, 'public')),
            li(a({ href: '/inbox' }, 'inbox')),
            li(a({ href: '/mentions' }, 'mentions')),
            li(a({ href: '/profile' }, 'profile')),
            li(a({ href: '/likes' }, 'likes')),
            li(a({ href: '/status' }, 'status')),
            li(a({ href: '/readme' }, 'readme'))
          )
        ),
        main({ id: 'content' }, ...elements)
      ))

  const result = doctypeString + nodes.outerHTML

  return result
}
