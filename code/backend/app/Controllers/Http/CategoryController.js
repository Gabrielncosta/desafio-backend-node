'use strict'

const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

class CategoryController {
  async index () {
    const categories = await Category.query().with('products').fetch()

    return categories
  }

  async store ({ request }) {
    const data = request.only(['name'])

    const category = await Category.create(data)

    return category
  }

  async show ({ params }) {
    const category = await Category.findOrFail(params.id)

    await category.load('products')

    return category
  }

  async update ({ params, request }) {
    const category = await Category.findOrFail(params.id)
    const data = request.only(['name'])

    category.merge(data)

    await category.save()

    return category
  }

  async destroy ({ params, response, auth }) {
    const category = await Category.findOrFail(params.id)

    const products = Product.query().where('category_id', params.id)
    const product = await products.pluck('category_id')

    if (!product.length) {
      await category.delete()
    } else {
      return response.status(400).send({ error: { message: 'Uma categoria com produtos não pode ser excluida' } })
    }
  }
}

module.exports = CategoryController
