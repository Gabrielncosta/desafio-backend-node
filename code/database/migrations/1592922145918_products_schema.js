'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('image_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('files')
        .onUpdate('')
        .onDelete('SET NULL')
      table.integer('stock_balance').notNullable()
      table.string('name', 45).notNullable()
      table.integer('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
