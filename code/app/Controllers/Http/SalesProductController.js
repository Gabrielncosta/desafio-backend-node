'use strict'
const Product = use('App/Models/Product')
const SalesProduct = use('App/Models/SalesProduct')

class SalesProductController {
  async index ({ params, auth }) {
    const salesProduct = await SalesProduct.query()
      .with('product')
      .fetch()
    return salesProduct
  }

  async show ({ params, auth }) {
    const salesProduct = await SalesProduct.query()
      .where('sale_id', params.sales_id)
      .with('product')
      .fetch()

    return salesProduct
  }

  async update ({ params, request }) {
    const product = await Product.findOrFail(params.id)

    const data = request.only([
      'name',
      'stock_balance',
      'category_id',
      'price',
      'file_id'
    ])

    product.merge(data)

    await product.save()

    return product
  }

  async destroy ({ params, response }) {
    try {
      const salesProduct = SalesProduct.query().where('product_id', params.id)

      await salesProduct.delete()
    } catch (err) {
      return response.send({ error: { message: 'Um produto com vendas em andamento não pode ser excluido' } })
    }
  }
}

module.exports = SalesProductController
