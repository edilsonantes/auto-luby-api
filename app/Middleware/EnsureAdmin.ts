import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class EnsureAdmin {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    const user_id  = auth.user?.id

    const {admin} = await User.findOrFail(user_id)

    if (admin){
        return next()
    }

    return response.status(401).json({
        error: "Usuário não é admin"
    })
  }
}
