import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  
  Route.post('/bookings', 'BookingsController.store')
  Route.get('/bookings', 'BookingsController.index')

}).prefix('/api').middleware('auth')