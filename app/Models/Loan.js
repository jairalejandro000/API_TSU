'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Loan extends Model {
    static get hidden () {
        return ['id','created_at', 'updated_at']
    }
}

module.exports = Loan
