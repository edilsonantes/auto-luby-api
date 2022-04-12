import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  
  Route.post('/sales/:id', 'SalesController.store')
  Route.get('/sales', 'SalesController.index')

}).prefix('/api').middleware('auth')