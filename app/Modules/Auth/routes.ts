import Route from '@ioc:Adonis/Core/Route'


Route.post('login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
}).prefix('/api')