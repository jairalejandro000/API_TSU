'use strict'
const { validate } = use('Validator')
const Area = use('App/Models/Area')
const randomstring = use("randomstring")

class AreaController {
    async createGolfCar({ request, response}) {
        const validation = await validate(request.all(), {
            name: 'required',
            description: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {name, description} = request.all()
            const A = await Area.create({ name, description, code})
            return response.status(201).json({ message: 'Area created succesful', code})
        }
    }
    async updateGolfCar({ request, response }) {   
        const validation = await validate(request.all(), {
            name: 'required',
            description: 'required',
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {name, description, code} = request.all()
            const A = await Area.findBy('code', code)
            if (A == null){
                return response.status(201).json({message: 'Area was not found'})
            }else{
                A.name = name
                A.description = description
                await A.save()
                return response.status(201).json({message: 'Area was update', A})
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
            const A = await Area.findBy('code', code)
            await A.delete()
            return response.status(201).json({message: 'Area was deleted', A})
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
            const A = await Area.findBy('code', code)
            return response.status(201).json({ message: 'Area was found', A})
        }
    }
    async showGolfCars({response}){
        const A = await Area.all()
        return response.status(201).json({A})
    }
}

module.exports = AreaController
