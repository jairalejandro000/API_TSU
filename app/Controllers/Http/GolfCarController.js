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
            return response.status(201).json({ message: 'Golf_Car created succesful', code})
        }
    }
    async updateGolfCar({ request, response }) {   
        const validation = await validate(request.all(), {
            status: 'required',
            color: 'required',
            model: 'required',
            details: 'required',
            year: 'required',
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {status, color, model, details, year, code} = request.all()
            const GC = await GolfCar.findBy('code', code)
            if (L == null){
                return response.status(201).json({message: 'Golf_Car was not found'})
            }else{
                GC.status = status
                GC.color = color
                GC.model = model
                GC.details = details
                GC.year = year
                await GC.save()
                return response.status(201).json({message: 'Golf_Car was update', GC})
            }
        }
    }
    async destroyGolfCar({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const GC = await GolfCar.findBy('code', code)
            await GC.delete()
            return response.status(201).json({message: 'Golf_Car was deleted', GC})
        }
    }
    async showGolfCar({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const GC = await GolfCar.findBy('code', code)
            return response.status(201).json({ message: 'Golf_Car was found', GC})
        }
    }
    async showGolfCars({response}){
        const GC = await GolfCar.all()
        return response.status(201).json({GC})
    }
}

module.exports = GolfCarController
