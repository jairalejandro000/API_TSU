'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanSchema extends Schema {
  /*up () {
    this.create('loans', (table) => {
      table.increments()
      table.string('code', 10).notNullable().unique()
      table.string('persona_rol_c', 10).notNullable().references('code').inTable('person_rols')
      table.date('date').notNullable()
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
      table.integer('holes', 2).notNullable()
      table.string('golf_car_c', 10).notNullable().references('code').inTable('golf_cars')
      table.boolean('visit')
      table.timestamps()
    })
  }*/

  down () {
    this.drop('loans')
  }
}

module.exports = LoanSchema
