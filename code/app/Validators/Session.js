'use strict'

class Session {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:4|max:45'
    }
  }
}

module.exports = Session
