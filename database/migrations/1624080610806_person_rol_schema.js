'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonRolSchema extends Schema {
  up () {
    this.create('person_rols', (table) => {
      table.increments()
      table.string('code', 10).notNullable().unique()
      table.string('person_c', 10).notNullable().unique()//.references('code').inTable('people')
      table.string('member_c', 10).unique()//.references('code').inTable('members')
      table.string('employee_c', 10).unique()//.references('code').inTable('employees')
      table.timestamps()
    })
  }

  down () {
    this.drop('person_rols')
  }
}

module.exports = PersonRolSchema
