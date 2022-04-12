import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import VehicleStatus from './VehicleStatus'

export default class Vehicle extends BaseModel {
  @column()
  @hasOne(() => VehicleStatus)
  public status_id: HasOne<typeof VehicleStatus>
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public year: number

  @column()
  public quilometer: number

  @column()
  public color: string

  @column()
  public chassi: string

  @column()
  public value: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
