'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store')
Route.get('/users/:id', 'UserController.show')

Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('/files', 'FileController.store')

  Route.resource('category', 'CategoryController').apiOnly()
  Route.resource('category.products', 'ProductController').apiOnly()
  Route.resource('sales', 'SaleController').apiOnly()
}).middleware(['auth'])
