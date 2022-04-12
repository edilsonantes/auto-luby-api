import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/vehicle_status', 'VehicleStatusesController').apiOnly()
}).prefix('/api').middleware('auth')
