'use strict'
const Product = use('App/Models/Product')
const SalesProduct = use('App/Models/SalesProduct')

class SalesProductController {
  async index ({ params, auth }) {
    console.log(params)
    const salesProduct = await SalesProduct.query()
      .where('sales_id', params.sales_id)
      .fetch()

    return salesProduct
  }

  async show ({ params, auth }) {
    console.log(params)
    const product = await Product.findOrFail(params.id)

    return product
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
      const product = await Product.findOrFail(params.id)

      const salesProduct = SalesProduct.query().where('product_id', params.id)

      await product.delete()
    } catch (err) {
      return response.send({ error: { message: 'Um produto com vendas em andamento não pode ser excluido' } })
    }
  }
}

module.exports = SalesProductController
