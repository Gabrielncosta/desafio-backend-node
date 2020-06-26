'use strict'

const SalesProductHook = exports = module.exports = {}

SalesProductHook.createPurchase = async (saleInstance) => {
  const product = await saleInstance.product().fetch()

  if (product.stock_balance < 1) {
    return status(400)
  }

  product.stock_balance -= saleInstance.quantity
  product.save()
}
