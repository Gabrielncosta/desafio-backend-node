'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('User')
Route.get('/users/:id', 'UserController.show')

Route.post('sessions', 'SessionController.store').validator('session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('/files/', 'FileController.index')
Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('/files', 'FileController.store')

  Route.resource('category', 'CategoryController').apiOnly()
  Route.resource('category.products', 'ProductController').apiOnly()
  Route.resource('sales', 'SaleController').apiOnly()
  Route.resource('sales.products', 'SalesProductController').apiOnly()
}).middleware(['auth'])

Route.resource('permissions', 'PermissionController').apiOnly().middleware('auth')
Route.resource('roles', 'RoleController').apiOnly().middleware('auth')
