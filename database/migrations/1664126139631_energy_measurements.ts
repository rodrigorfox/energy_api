import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'energy_measurements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_energy_measurements').primary()
      table.string('id_dispositivo').notNullable()
      table.string('activeenergy').notNullable()
      table.string('activepower').notNullable()
      table.timestamp('timestamp', { useTz: false })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
