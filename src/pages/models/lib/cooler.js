'use strict'

const ssbClient = require('ssb-client')
const debug = require('debug')('oasis')

const rawConnect = () => new Promise((resolve, reject) => {
  ssbClient({
    remote: "unix:/home/cryptix/.ssb-go/socket~noauth:test"
  }, (err, api) => {
    if (err) {
      console.error(err)
      reject(err)
    } else {
      console.log("new muxrpc api established")
      resolve(api)
    }
  })
})

const db = {
  connect () {
    return handle
  },
  /**
   * @param {function} method
   */
  get (method, ...opts) {
    return new Promise((resolve, reject) => {
      method(...opts, (err, val) => {
        if (err) {
          reject(err)
        } else {
          resolve(val)
        }
      })
    })
  },
  read (method, ...args) {
    return new Promise((resolve, reject) => {
      resolve(method(...args))
    })
  }
}

debug.enabled = true

const handle = new Promise((resolve, reject) => {
  rawConnect().then((ssb) => {
    debug('Using pre-existing Scuttlebutt server instead of starting one')
    resolve(ssb)
  }).catch(() => {
    debug('Initial connection attempt failed')
    debug('Starting Scuttlebutt server')

    
    const connectOrRetry = () => {
      setTimeout(() => {
        rawConnect().then((ssb) => {
          debug('Retrying connection to own server')
          resolve(ssb)
        }).catch((e) => {
          debug(e)
          connectOrRetry()
        })
      }, 1000)
    }

    connectOrRetry()
  })
})

module.exports = db
