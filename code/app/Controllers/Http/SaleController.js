'use strict'

const Sale = use('App/Models/Sale')
const SalesProduct = use('App/Models/SalesProduct')

class SaleController {
  async index () {
    const sales = await Sale.query().orderBy('created_at').with('salesProduct').with('product').fetch()

    return sales
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
      return response.status(400).send({ error: { message: 'A compra falhou, verfique seus dados.' + err } })
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
