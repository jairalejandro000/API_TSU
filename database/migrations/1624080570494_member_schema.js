'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.string('codem', 10).notNullable().unique()
      table.string('person_c', 10).notNullable().unique()
      table.string('golf_car_c', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema
