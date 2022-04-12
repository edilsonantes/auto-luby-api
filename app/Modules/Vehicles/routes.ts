import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  
  Route.resource('/vehicles', 'VehiclesController').apiOnly()
  
  Route.get('/vehicles/filter/:status_id', 'VehiclesController.filter')

}).prefix('/api').middleware('auth')
