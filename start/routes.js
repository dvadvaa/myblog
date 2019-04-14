'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.main')
// post
Route.get('/posts', 'PostController.index')
Route.group(() => {
Route.get('/posts/add', 'PostController.add')
Route.post('/logout', 'UserController.destroy')
}).middleware(['auth'])
Route.get('/posts/:id', 'PostController.details')

Route.post('/posts/:id', 'CommentController.add')

Route.post('/posts', 'PostController.store')


//user
Route.group(() => {
Route.on('/register').render('user/register')
Route.post('/register', 'UserController.store')

Route.on('/login').render('user/login')
Route.post('/login', 'UserController.login')
}).middleware(['guest'])
Route.post('/logout', 'UserController.destroy')