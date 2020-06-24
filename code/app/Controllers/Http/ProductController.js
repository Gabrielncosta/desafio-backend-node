'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ params }) {
    const products = await Product.query()
      .where('category_id', params.category_id)
      .fetch()

    return products
  }

  async store ({ request, params }) {
    const data = request.only([
      'name',
      'stock_balance',
      'category_id',
      'price',
      'image_id'
    ])

    const product = await Product.create({ ...data, category_id: params.category_id })

    return product
  }

  async show ({ params }) {
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

  async destroy ({ params }) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
  }
}

module.exports = ProductController
