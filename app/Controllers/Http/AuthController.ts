/*import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login({request,response, auth}: HttpContextContract){
        const {uid, password} = request.only(['uid', 'password'])

        try{
            await auth.attempt(uid, password)
        }catch(error){
            //session.flash('teste')
        }
    }

}*/
