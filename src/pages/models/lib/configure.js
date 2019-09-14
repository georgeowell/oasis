'use strict'

const defaultOptions = {
  // private: true,
  keys: true,
  // reverse: true,
  // meta: true
}

module.exports = (...customOptions) => Object.assign({}, defaultOptions, ...customOptions)
