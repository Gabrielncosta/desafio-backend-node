'use strict'

const SalesProductHook = exports = module.exports = {}

SalesProductHook.createPurchase = async (saleInstance) => {
  const product = await saleInstance.product().fetch()

  product.stock_balance -= saleInstance.quantity
  product.save()
}
