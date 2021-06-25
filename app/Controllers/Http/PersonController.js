'use strict'
const { validate } = use('Validator')
const Person = use('App/Models/Person')
const randomstring = use("randomstring");

class PersonController {
    async createPerson({ request, response }) {
        const validation = await validate(request.all(), {
            name: 'required',
            last_name: 'required',
            gender: 'required',
            address: 'required',
            number: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = await randomstring.generate({
                length: 10})
            const {name, last_name, gender, address, number} = request.all()
            const P = await Person.create({name, last_name, gender, address, number, code})
            return response.ok({ message: 'Person created succesful', code })
        }
    }
    async updatePerson({ request, response, params }) {   
        const validation = await validate(request.all(), {
            name: 'required',
            last_name: 'required',
            gender: 'required',
            address: 'required',
            number: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {name, last_name, gender, address, number} = request.all()
            const P = await Person.findBy('code', params.code)
            if (P == null){
                return response.status(400).json({message: 'Person was not found'})
            }else{
                P.name = name
                P.last_name = last_name
                P.gender = gender
                P.address = address
                P.number = number
                await P.save()
                return response.ok({message: 'Person was update', P})
            }
        }
    }
    async destroyPerson({ params, response }){
        const P = await Person.findBy('code', params.code)
        await P.delete()
        return response.ok({message: 'Person was deleted', P})
    }
    async showPerson({ params, response }) {
        const P = await Person.findBy('code', params.code)
        return response.ok({ message: 'Person was found', P })
    }
    async showPeople({response}){
        const P = await Person.all()
        return response.ok({P})
    }
}

module.exports = PersonController
