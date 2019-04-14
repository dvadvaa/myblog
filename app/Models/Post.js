'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    comments() {
        return this.hasMany("App/Models/Comments", "id", "post_id");
        }
}

module.exports = Post
