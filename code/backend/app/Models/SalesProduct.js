'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SalesProduct extends Model {
  static boot () {
    super.boot()

    this.addHook('afterSave', 'SalesProductHook.createPurchase')
  }

  sale () {
    return this.belongsTo('App/Models/Sale')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = SalesProduct
