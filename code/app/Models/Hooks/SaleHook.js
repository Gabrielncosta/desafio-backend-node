'use strict'

const SalesProduct = use('App/Models/SalesProduct')

const SaleHook = exports = module.exports = {}

SaleHook.cancelPurchase = async (saleInstance) => {
  const { id } = saleInstance
  const salesProduct = await SalesProduct.findOrFail(id)
  const product = await salesProduct.product().fetch()

  product.stock_balance += salesProduct.quantity

  product.save()
}
