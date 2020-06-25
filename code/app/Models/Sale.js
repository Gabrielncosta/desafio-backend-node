'use strict'
const Model = use('Model')

class Sale extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeDelete', 'SaleHook.cancelPurchase')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  salesProduct () {
    return this.hasMany('App/Models/SalesProduct')
  }
}

module.exports = Sale
