'use strict'

const Sale = use('App/Models/Sale')
const SalesProduct = use('App/Models/SalesProduct')
const Product = use('App/Models/Product')

class SaleController {
  async index ({ request, response, view }) {
    const sales = await SalesProduct.query().with('product').fetch()

    return sales
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(['product_id', 'total_price', 'quantity'])

      const sale = await Sale.create({ user_id: auth.user.id })

      const product = await Product.findByOrFail('id', data.product_id)

      product.stock_balance -= data.quantity

      const salesProduct = await SalesProduct.create(
        { ...data, sales_id: sale.id })

      await sale.save()
      await product.save()
      await salesProduct.save()

      return product
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'A compra falhou, verfique seu' } })
    }
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = SaleController