import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Vehicle from 'App/Models/Vehicle'
import VehicleStatus from 'App/Models/VehicleStatus'
import {schema} from '@ioc:Adonis/Core/Validator'



export default class VehiclesController {
    
    private vehicleSchema = schema.create({
        brand: schema.string({trim: true}),
        model: schema.string({trim: true}),
        year: schema.number(),
        quilometer: schema.number(),
        color: schema.string({trim: true}),
        chassi: schema.string({trim: true}),
        value: schema.number(),
        status_id: schema.number.nullableAndOptional()
    })

    public async store({request, response}: HttpContextContract){
        

       
        const body = await request.validate({schema: this.vehicleSchema})
        body.status_id = await (await VehicleStatus.findOrFail(request.headers().status_id)).id

        const vehicle = await Vehicle.create(body)

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
        const vehicle = await Vehicle.findOrFail(params.id)
        return vehicle
    }

    public async destroy({params}: HttpContextContract){
        const vehicle = await Vehicle.findOrFail(params.id)
        
        return{
            message: "Veículo deletado com sucesso!",
            data: vehicle,
        }
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body()

        if (request.headers().status_id){
            body.status_id = (await Database
                                    .from('vehicle_statuses')
                                    .select('id')
                                    .where('id', `${request.headers().status_id}`)
                                    .first()).id
        
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
