'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GolfCarSchema extends Schema {
  up () {
    this.create('golf_cars', (table) => {
      table.increments()
      table.string('code', 10).notNullable().unique()
      table.string('status', 30).notNullable()
      table.string('color', 20).notNullable()
      table.string('model', 100).notNullable()
      table.string('details', 100).notNullable()
      table.integer('year', 4).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('golf_cars')
  }
}

module.exports = GolfCarSchema
