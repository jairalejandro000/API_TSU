'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('codeu', 10).notNullable().unique()
      table.string('username', 30).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('rol', 15).notNullable()
      table.string('employee_c').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
