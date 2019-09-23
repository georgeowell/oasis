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

const toAttributes = (obj) => Object.entries(obj).map(([key, val]) => `${key}=${val}`).join(', ')
const sourceLink = 'https://github.com/fraction/oasis'
module.exports = (...elements) => {
  const nodes =
    html({ lang: 'en' },
      head(
        title('🏝️  Oasis'),
        link({ rel: 'stylesheet', href: '/assets/style.css' }),
        link({ rel: 'stylesheet', href: '/highlight/github.css' }),
        meta({ name: 'description', content: 'friendly neighborhood scuttlebutt interface' }),
        meta({ name: 'viewport', content: toAttributes({ width: 'device-width', 'initial-scale': 1 }) })
      ),
      body(
        p({ class: 'motd' },
          'This is a read-only version of Oasis. Trying to publish a like or message will create an internal server error. ',
          a({ href: sourceLink }, 'Download Oasis for full functionality.')
        ),
        nav(
          ul(
            li(a({ href: '/' }, 'home')),
            li(a({ href: '/mentions' }, 'mentions')),
            li(a({ href: '/compose' }, 'compose')),
            li(a({ href: '/profile' }, 'profile')),
            li(a({ href: '/status' }, 'status')),
            li(a({ href: 'https://github.com/fraction/oasis' }, 'source')),
            li(a({ href: 'https://github.com/fraction/oasis/issues/new/choose' }, 'help'))
          )
        ),
        main({ id: 'content' }, ...elements)
      ))

  const result = doctypeString + nodes.outerHTML

  return result
}
