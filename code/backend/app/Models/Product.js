'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  category () {
    return this.belongsTo('App/Models/Category')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }

  salesProduct () {
    return this.belongsTo('App/Models/SalesProduct')
  }
}

module.exports = Product