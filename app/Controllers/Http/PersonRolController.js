'use strict'
const { validate } = use('Validator')
const PersonRol = use('App/Models/PersonRol')
const randomstring = use("randomstring")

class PersonRolController {
    async createPersonRol({ request, response}) {
        const validation = await validate(request.all(), {
            person_c: 'required',
            member_c: 'required',
            employee_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {person_c, member_c, employee_C} = request.all()
            const PR = await PersonRol.create({ person_c, member_c, employee_C, code})
            return response.status(201).json({ message: 'PersonRol created succesful', code})
        }
    }
    async updatePersonRol({ request, response }) {   
        const validation = await validate(request.all(), {
            person_c: 'required',
            member_c: 'required',
            employee_c: 'required',
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, member_c, employee_c, code} = request.all()
            const PR = await PersonRol.findBy('code', code)
            if (PR == null){
                return response.status(201).json({message: 'PersonRol was not found'})
            }else{
                PR.person_c = person_c
                PR.member_c = member_c
                PR.employee_c = employee_c
                await PR.save()
                return response.status(201).json({message: 'PersonRol was update', PR})
            }
        }
    }
    async destroyPersonRol({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const PR = await PersonRol.findBy('code', code)
            await PR.delete()
            return response.status(201).json({message: 'PersonRol was deleted', PR})
        }
    }
    async showPersonRol({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const PR = await PersonRol.findBy('code', code)
            return response.status(201).json({ message: 'PersonRol was found', PR})
        }
    }
    async showPersonRols({response}){
        const PR = await PersonRol.all()
        return response.status(201).json({PR})
    }
}

module.exports = PersonRolController
