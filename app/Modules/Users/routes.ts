import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  
  Route.group(() => {
    Route.post('/users', 'UsersController.store')
    Route.delete('/users/:id', 'UsersController.destroy')
    Route.patch('/users/:id', 'UsersController.update')
  }).middleware('auth').middleware('admin')

  Route.group(() => {
    Route.get('/users', 'UsersController.index')
    Route.get('/users/:id', 'UsersController.show')
  }).middleware('auth')

}).prefix('/api')