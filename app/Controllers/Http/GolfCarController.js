'use strict'
const { validate } = use('Validator')
const GolfCar = use('App/Models/GolfCar')
const randomstring = use("randomstring")

class GolfCarController {
    async createGolfCar({ request, response }) {
        const validation = await validate(request.all(), {
            status: 'required|max:30|min:5',
            color: 'required|max:20|min:3',
            model: 'required|max:100|min:5',
            details: 'required|max:100|min:5',
            year: 'required|max:4',
            number: 'required|max:3'

        })
        if (validation.fails()){
            return response.status(400).json({message: 'Validation error'})
        }else {
            const codegc = randomstring.generate({
                length: 10})
            const {status, color, model, details, year, number} = request.all()
            const GC = await GolfCar.create({status, color, model, details, year, number, codegc})
            return response.ok({message: 'Golf_Car created succesful'})
        }
    }
    async updateGolfCar({ request, response, params }) {   
        const validation = await validate(request.all(), {
            details: 'required|max:100|min:5',
            color: 'required|max:20|min:3',
            model: 'required|max:100|min:5',
            year: 'required|max:4'
        })
        if (validation.fails()){
            return response.status(400).json({message: 'Validation error'})
        }else {
            const {color, model, details, year} = request.all()
            const GC = await GolfCar.findBy('codegc', params.code)
            if (GC == null){
                return response.status(400).json({message: 'Golf_Car was not found'})
            }else{
                GC.color = color
                GC.model = model
                GC.details = details
                GC.year = year
                await GC.save()
                return response.ok({message: 'Golf Car was update'})
            }
        }
    }
    async destroyGolfCar({ params, response }){
        const GC = await GolfCar.findBy('codegc', params.code)
        await GC.delete()
        return response.ok({message: 'Golf_Car was deleted'})
    }
    async showGolfCar({ params, response }) {
        const GC = await GolfCar.findBy('codegc', params.code)
        return response.ok({message: 'Golf_Car was found', GC})
    }
    async showGolfCars({ response }){
        const GolfCars = await GolfCar.all()
        return response.ok({GolfCars})
    }
}

module.exports = GolfCarController
