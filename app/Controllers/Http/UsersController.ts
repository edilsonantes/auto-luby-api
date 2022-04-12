import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'



export default class UsersController {
    private validationOptions = {
        types: ['image'],
        size: '5mb'
    }
    private newUserSchema = schema.create({
        email: schema.string({trim: true}, [rules.unique({table: 'users', column: 'email', caseInsensitive: false}), rules.email()]),
        name: schema.string(),
        password: schema.string({}, [rules.minLength(8)]),
        cpf: schema.number([rules.unique({table: 'users', column:'cpf'})]),
        admin: schema.boolean(),
        bio: schema.string({}, [rules.maxLength(150)])
    })
    
    public async store({request, response}: HttpContextContract){
        
        
        const body = await request.validate({schema: this.newUserSchema})

        const avatar = request.file('avatar', this.validationOptions)
        if(avatar){
            const avatarName = `${uuidv4()}.${avatar.extname}`

            await avatar.move(Application.tmpPath('uploads'),{
                name: avatarName
            })
        }
        console.log(avatar?.fileName)
        console.log(body)

        const user = await User.create({
            ...body,
            avatar: avatar?.fileName
        })
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
        const user = await User.findOrFail(params.id)

        return user
    }

    public async destroy({params}: HttpContextContract){
        const user = await User.findOrFail(params.id)

        await user.delete();
        
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
        }

        const aux_user = {
            ...body,
            avatar: avatar?.fileName
        }

        const user = await Database
                            .from('users')
                            .where('id', params.id)
                            .update(aux_user)

        console.log(aux_user)
        return {
            message: "Usuário atualizado com sucesso!",
            data: user
        }
    }
}
