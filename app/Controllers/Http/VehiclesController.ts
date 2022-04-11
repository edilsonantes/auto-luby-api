import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'



export default class VehiclesController {
    public async store({request, response}: HttpContextContract){
        var body = request.body()

        const aux_id = await Database
                                .from('vehicle_statuses')
                                .select('id')
                                .where('id', `${request.headers().status_id}`)
                                .first()
    
        body.status_id = aux_id.id

        const vehicle = await Database
                                .table('vehicles')
                                .insert(body)

        response.status(201)
        
        return {
            message: "Veículo adicionado com sucesso",
            data: vehicle,
        }
    }

    public async index({request}: HttpContextContract){
        const page = request.input('page', 1)
        const limit = 25
        
        const vehicles = await Database
                                .from('vehicles')
                                .paginate(page,limit)

        return vehicles.toJSON()
    }

    public async show({params}: HttpContextContract){
        const vehicle = await Database
                                .from('vehicles')
                                .where('id', params.id)

        return vehicle
    }

    public async destroy({params}: HttpContextContract){
        const vehicle = await Database
                                .from('vehicles')
                                .where('id', params.id)
                                .delete()
        
        return{
            message: "Veículo deletado com sucesso!",
            data: vehicle,
        }
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body()

        if (request.headers().status_id){
            const aux_id = await Database
                                    .from('vehicle_statuses')
                                    .select('id')
                                    .where('id', `${request.headers().status_id}`)
                                    .first()
        
            body.status_id = aux_id.id
        }

        const vehicle = await Database
                                .from('vehicles')
                                .where('id', params.id)
                                .update(body)

       

        return {
            message: "Veículo atualizado com sucesso!",
            data: vehicle
        }
    }

    public async filter({params, request}: HttpContextContract){
        const page = request.input('page', 1)
        const limit = 25
        
        const vehicles = await Database
                                .from('vehicles')
                                .where('status_id', params.status_id)
                                .paginate(page, limit)

        
        return vehicles.toJSON()
    }
}
