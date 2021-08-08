'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExtensionSchema extends Schema {
  up () {
    this.create('extensions', (table) => {
      table.increments()
      table.string('codex', 10).notNullable().unique()
      table.string('employee_c', 10).notNullable().unique()
      table.integer('extension', 10).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('extensions')
  }
}

module.exports = ExtensionSchema
