'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('author_id')
      table.integer('post_id')
      table.string('body')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
