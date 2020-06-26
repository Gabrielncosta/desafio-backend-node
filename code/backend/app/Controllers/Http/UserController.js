'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const users = await User.all()

    return users
  }

  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }
}

module.exports = UserController
