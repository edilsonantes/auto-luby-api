import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
    private validationOptions = {
        types: ['image'],
        size: '5mb'
    }
    
    public async store({request, response}: HttpContextContract){
        const body = request.body()
        body.admin = false
        
        const avatar = request.file('avatar', this.validationOptions)

        if(avatar){
            const avatarName = `${uuidv4()}.${avatar.extname}`

            await avatar.move(Application.tmpPath('uploads'),{
                name: avatarName
            })

            body.avatar = avatarName
        }

        const user = await Database
                            .table('users')
                            .insert(body)
        response.status(201)

        return {
            message: "Usuario cadastrado com sucesso!",
            data: user
        }
    }

    public async index({request}: HttpContextContract){
        const page = request.input('page', 1)
        const limit = 25
        
        const users = await Database
                                .from('users')
                                .paginate(page,limit)

        return users.toJSON()
    }

    public async show({params}: HttpContextContract){
        const user = await Database
                            .from('users')
                            .where('id', params.id)

        return user
    }

    public async destroy({params}: HttpContextContract){
        const user = await Database
                                .from('users')
                                .where('id', params.id)
                                .delete()
        
        return{
            message: "Usuário deletado com sucesso!",
            data: user,
        }
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body()
        
        const avatar = request.file('avatar', this.validationOptions)

        if(avatar){
            const avatarName = `${uuidv4()}.${avatar.extname}`

            await avatar.move(Application.tmpPath('uploads'),{
                name: avatarName
            })

            body.avatar = avatarName
        }

        const user = await Database
                            .from('users')
                            .where('id', params.id)
                            .update(body)

        return {
            message: "Usuário atualizado com sucesso!",
            data: user
        }
    }
}
