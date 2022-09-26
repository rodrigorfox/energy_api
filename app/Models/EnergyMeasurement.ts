import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EnergyMeasurement extends BaseModel {
  @column({ isPrimary: true })
  public id_energy_measurements: number;

  @column({ columnName: 'id_dispositivo'})
  public id_dispositivo: string;
  @column({ columnName: 'activeenergy'})
  public activeEnergy: string;
  @column({ columnName: 'activepower'})
  public activePower: string;

  @column.dateTime({ autoCreate: true })
  public timestamp: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
