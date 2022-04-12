import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sale from 'App/Models/Sale'
import {schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SalesController {
    private saleSchema = schema.create({
        sold_at: schema.date({format: 'dd/MM/yyyy'}),
        value: schema.number(),
        new_vehicle_status: schema.number(),
        sales_person: schema.number()
    })

    public async store({params,request}: HttpContextContract){
        const body = request.validate({schema: this.saleSchema})
        
        const sale = await Sale.create(request.body())
        const vehicle = await Database
                                .from('vehicles')
                                .where('id', params.id)
                                .update('status_id', sale.new_vehicle_status)
        
        return body
    }

    public async index({request}: HttpContextContract){
        const page = request.input('page', 1)
        const limit = 25
        
        const sales = await Database
                                .from('sales')
                                .paginate(page,limit)

        return sales.toJSON()
    }

}