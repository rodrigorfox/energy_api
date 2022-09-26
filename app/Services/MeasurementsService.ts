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

    async findMensurements(deviceId, qs) {
        const energyMeasurements = await Database
            .from('energy_measurements')
            .where('id_dispositivo', deviceId)
            .andWhereBetween('timestamp', [ qs.startDate, qs.endDate])
            .select(Database.raw(`date_trunc('${qs.resolution || "day"}', timestamp) as data`))
            .select(Database.raw(`sum(activeEnergy::int) as accumulatedEnergy`))
            .groupBy('data')

        return energyMeasurements
    }
}

export default new MeasurementsService()