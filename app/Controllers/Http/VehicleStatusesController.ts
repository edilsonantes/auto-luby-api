import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VehicleStatus from 'App/Models/VehicleStatus'

export default class VehicleStatusesController {
    public async store({request, response}: HttpContextContract){
        const body = request.body()

        const vehicleStatus = await VehicleStatus.create(body)

        response.status(201)
        
        return {
            message: "Status criado",
            data: vehicleStatus,
        }
    }

    public async index(){
        const statuses = await VehicleStatus.all()

        return {
            data: statuses,
        }
    }

    public async destroy({params}: HttpContextContract){
        const status = await VehicleStatus.findOrFail(params.id)

        await status.delete()
        
        return{
            message: "Status deletado com sucesso!",
            data: status,
        }
    }
}
