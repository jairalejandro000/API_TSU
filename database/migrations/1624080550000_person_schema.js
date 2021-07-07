'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('people', (table) => {
      table.increments()
      table.string('codep', 10).notNullable().unique()
      table.string('name', 30).notNullable()
      table.string('last_name', 100).notNullable()
      table.boolean('gender').notNullable()
      table.string('address', 254).notNullable()
      table.string('number', 15).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('people')
  }
}

module.exports = PersonSchema
