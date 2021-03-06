'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesProductsSchema extends Schema {
  up () {
    this.create('sales_products', (table) => {
      table.increments()
      table
        .integer('sale_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sales')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('quantity').notNullable()
      table.integer('total_price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sales_products')
  }
}

module.exports = SalesProductsSchema
