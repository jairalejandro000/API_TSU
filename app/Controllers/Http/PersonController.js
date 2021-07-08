'use strict'
const { validate } = use('Validator')
const Person = use('App/Models/Person')
const randomstring = use("randomstring");

class PersonController {
    async createPerson({ request, response }) {
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:30',
            last_name: 'required|min:3|max:100',
            gender: 'required|max:1',
            address: 'required|min:10|max:254',
            number: 'required|min:7|max:15'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const codep = await randomstring.generate({
                length: 10})
            const {name, last_name, gender, address, number} = request.all()
            const P = await Person.create({name, last_name, gender, address, number, codep})
            return response.ok({ message: 'Person created succesful', codep })
        }
    }
    async updatePerson({ request, response, params }) {   
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:30',
            last_name: 'required|min:3|max:100',
            gender: 'required|max:1',
            address: 'required|min:10|max:254',
            number: 'required|min:7|max:15'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {name, last_name, gender, address, number} = request.all()
            const P = await Person.findBy('codep', params.code)
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
        const P = await Person.findBy('codep', params.code)
        await P.delete()
        return response.ok({message: 'Person was deleted', P})
    }
    async showPerson({ params, response }) {
        const P = await Person.findBy('codep', params.code)
        return response.ok({ message: 'Person was found', P })
    }
    async showPeople({response}){
        const P = await Person.all()
        return response.ok({P})
    }
}

module.exports = PersonController
