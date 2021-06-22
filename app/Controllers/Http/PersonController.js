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
            return response.status(201).json({ message: 'Person created succesful', code })
        }
    }
    async updatePerson({ request, response }) {   
        const validation = await validate(request.all(), {
            name: 'required',
            last_name: 'required',
            gender: 'required',
            address: 'required',
            number: 'required',
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {name, last_name, gender, address, number, code} = request.all()
            const P = await Person.findBy('code', code)
            if (P == null){
                return response.json({message: 'Person was not found'})
            }else{
                P.name = name
                P.last_name = last_name
                P.gender = gender
                P.address = address
                P.number = number
                await P.save()
                return response.json({message: 'Person was update', P})
            }
        }
    }
    async destroyPerson({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const P = await Person.findBy('code', code)
            await P.delete()
            return response.json({message: 'Person was deleted', P})
        }
    }
    async showPerson({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const P = await Person.findBy('code', code)
            return response.status(201).json({ message: 'Person was found', P })
        }
    }
    async showPeople({response}){
        const P = await Person.all()
        return response.status(201).json({P})
    }
}

module.exports = PersonController
