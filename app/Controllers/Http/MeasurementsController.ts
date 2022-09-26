import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import MeasurementsService from 'App/Services/MeasurementsService'

export default class MeasurementsController {
    public async store({ request }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                id_dispositivo: schema.string(),
                activeEnergy: schema.string(),
                activePower: schema.string(),
            })
        })
        
        return MeasurementsService.store(payload)
    }

    public async createMany({ request }: HttpContextContract) {
        const payload = request.body()
        
        return MeasurementsService.createMany(payload)
    }

    public async update({ request, params }: HttpContextContract) {
        const idMeasurement = params.id

        const payload = await request.validate({
            schema: schema.create({
                id_dispositivo: schema.string.optional(),
                activeEnergy: schema.string(),
                activePower: schema.string(),
                timestamp: schema.date.optional()
            })
        })
        
        return MeasurementsService.update(idMeasurement, payload)
    }

    public async index() {
        return MeasurementsService.findAll()
    }

    public async findMensurements({ request, params }: HttpContextContract) {
        const { deviceId } = params

        const qs = await request.validate({
            schema: schema.create({
                resolution: schema.string.optional(),
                startDate: schema.string(),
                endDate: schema.string(),
            })
        })

        return MeasurementsService.findMensurements(deviceId, qs)
    }
}
