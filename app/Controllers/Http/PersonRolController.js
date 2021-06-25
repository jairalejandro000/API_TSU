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
            return response.ok({ message: 'PersonRol created succesful', code})
        }
    }
    async updatePersonRol({ request, response, params }) {   
        const validation = await validate(request.all(), {
            person_c: 'required',
            member_c: 'required',
            employee_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, member_c, employee_c} = request.all()
            const PR = await PersonRol.findBy('code', params.code)
            if (PR == null){
                return response.status(400).json({message: 'PersonRol was not found'})
            }else{
                PR.person_c = person_c
                PR.member_c = member_c
                PR.employee_c = employee_c
                await PR.save()
                return response.ok({message: 'PersonRol was update', PR})
            }
        }
    }
    async destroyPersonRol({ params, response }){
        const PR = await PersonRol.findBy('code', params.code)
        await PR.delete()
        return response.ok({message: 'PersonRol was deleted', PR})
    }
    async showPersonRol({ params, response }) {
        const PR = await PersonRol.findBy('code', params.code)
        return response.ok({ message: 'PersonRol was found', PR})
    }
    async showPersonRols({response}){
        const PR = await PersonRol.all()
        return response.ok({PR})
    }
}

module.exports = PersonRolController
