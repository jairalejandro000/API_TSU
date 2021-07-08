'use strict'
const { validate } = use('Validator')
const Area = use('App/Models/Area')
const randomstring = use("randomstring")

class AreaController {
    async createArea({ request, response}) {
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:20',
            description: 'required|max:100|min:10'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const codea = randomstring.generate({
                length: 10})
            const {name, description} = request.all()
            const A = await Area.create({ name, description, codea})
            return response.ok({ message: 'Area created succesful', codea})
        }
    }
    async updateArea({ request, response, params }) {   
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:20',
            description: 'required|max:100|min:10'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {name, description} = request.all()
            const A = await Area.findBy('codea', params.code)
            if (A == null){
                return response.status(400).json({message: 'Area was not found'})
            }else{
                A.name = name
                A.description = description
                await A.save()
                return response.ok({message: 'Area was update', A})
            }
        }
    }
    async destroyArea({ params, response }){
        const A = await Area.findBy('codea', params.code)
        await A.delete()
        return response.ok({message: 'Area was deleted', A})
    }
    async showArea({ params, response }) {
        const A = await Area.findBy('codea', params.code)
        return response.ok({ message: 'Area was found', A})
    }
    async showAreas({response}){
        const A = await Area.all()
        return response.ok({A})
    }
}

module.exports = AreaController
