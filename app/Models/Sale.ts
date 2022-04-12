import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sold_at: DateTime

  @column()
  public value: number

  @column()
  public new_vehicle_status: number

  @column()
  public sales_person: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
