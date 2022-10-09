import Database from '@ioc:Adonis/Lucid/Database'
import EnergyMeasurement from 'App/Models/EnergyMeasurement'

class MeasurementsService {
    async store(payload) {
        return EnergyMeasurement.create(payload)
    }

    async createMany(payload) {
        const body = payload.map((measurement) => {
            if (measurement['id-dispositivo']) {
                measurement.id_dispositivo = measurement['id-dispositivo']
                delete measurement['id-dispositivo']
            }
            if (measurement['uid']) {
                measurement.id_dispositivo = measurement['uid']
                delete measurement['uid']
            }
            return measurement
        })
        
        return EnergyMeasurement.createMany(body)
    }

    async update(idMeasurement, payload) {
        const measurement = await EnergyMeasurement.findOrFail(idMeasurement)
        measurement.merge(payload)
        
        return measurement.save()
    }

    async findAll() {
        return EnergyMeasurement.all()
    }

    async findAvailableDevices() {
        const devices = await Database.from('energy_measurements')
        .select('id_dispositivo')
        .groupBy('id_dispositivo')

        return devices
    }

    async findMensurements(deviceId, qs) {
        const deviceList = deviceId.split('&')

        const queryBuilder = Database.from('energy_measurements')
            queryBuilder.whereIn('id_dispositivo', deviceList)
            queryBuilder.andWhereBetween('timestamp', [ qs.startDate, qs.endDate])
            if (qs.resolution && qs.resolution === 'raw')
                return await queryBuilder.select('*')
            
            queryBuilder.select(Database.raw(`date_trunc('${qs.resolution || "day"}', timestamp) as data`))
            queryBuilder.select(Database.raw(`sum(activeEnergy::int) as accumulatedEnergy`))

        return queryBuilder.groupBy('data')
    }
}

export default new MeasurementsService()