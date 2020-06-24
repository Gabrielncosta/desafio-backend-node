'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  sale_product () {
    return this.hasMany('App/Models/SalesProduct')
  }
}

module.exports = Sale
