'use strict'

const Sale = use('App/Models/Sale')
const SalesProduct = use('App/Models/SalesProduct')

class SaleController {
  async index () {
    const products = await SalesProduct.query().with('product').fetch()

    return products
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(['product_id', 'total_price', 'quantity'])
      const sale = await Sale.create({ user_id: auth.user.id })

      const salesProduct = await SalesProduct.create(
        { ...data, sale_id: sale.id })

      await salesProduct.save()
      await sale.save()

      return [sale, salesProduct]
    } catch (err) {
      return response.send({ error: { message: 'A compra falhou, verfique seus dados.' } })
    }
  }

  async show ({ auth }) {
    const salesData = await Sale.query().fetch()
    return salesData
  }

  async destroy ({ params }) {
    const sale = await Sale.findOrFail(params.id)

    await sale.delete()
  }
}

module.exports = SaleController
