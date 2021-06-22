'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  /*up () {
    this.create('employees', (table) => {
      table.increments()
      table.string('code', 10).notNullable().unique()
      table.string('person_c', 10).notNullable().unique().references('code').inTable('people')
      table.string('area_c', 10).notNullable().references('code').inTable('areas')
      table.timestamps()
    })
  }*/

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
