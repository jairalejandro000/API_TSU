'use strict'
const { validate } = use('Validator')
const GolfCar = use('App/Models/GolfCar')
const randomstring = use("randomstring")

class GolfCarController {
    async createGolfCar({ request, response}) {
        const validation = await validate(request.all(), {
            status: 'required',
            color: 'required',
            model: 'required',
            details: 'required',
            year: 'required'

        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {status, color, model, details, year} = request.all()
            const GC = await GolfCar.create({status, color, model, details, year, code})
            return response.ok({ message: 'Golf_Car created succesful', code})
        }
    }
    async updateGolfCar({ request, response, params }) {   
        const validation = await validate(request.all(), {
            status: 'required',
            color: 'required',
            model: 'required',
            details: 'required',
            year: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {status, color, model, details, year} = request.all()
            const GC = await GolfCar.findBy('code', params.code)
            if (L == null){
                return response.status(400).json({message: 'Golf_Car was not found'})
            }else{
                GC.status = status
                GC.color = color
                GC.model = model
                GC.details = details
                GC.year = year
                await GC.save()
                return response.ok({message: 'Golf_Car was update', GC})
            }
        }
    }
    async destroyGolfCar({ params, response }){
        const GC = await GolfCar.findBy('code', params.code)
        await GC.delete()
        return response.ok({message: 'Golf_Car was deleted', GC})
    }
    async showGolfCar({ params, response }) {
        const GC = await GolfCar.findBy('code', params.code)
        return response.ok({ message: 'Golf_Car was found', GC})
    }
    async showGolfCars({response}){
        const GC = await GolfCar.all()
        return response.ok({GC})
    }
}

module.exports = GolfCarController
