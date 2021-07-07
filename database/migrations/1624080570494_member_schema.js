'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.string('codem', 10).notNullable().unique()
      table.string('person_c', 10).notNullable().unique()//.references('code').inTable('people')
      table.date('expiration').notNullable()
      table.string('golf_car_c', 10).notNullable()//.references('code').inTable('golf_cars')
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema
