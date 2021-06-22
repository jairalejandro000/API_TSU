'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AreaSchema extends Schema {
  up () {
    this.create('areas', (table) => {
      table.increments()
      table.string('code', 10).notNullable().unique()
      table.string('name', 20).notNullable().unique()
      table.string('description', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('areas')
  }
}

module.exports = AreaSchema
