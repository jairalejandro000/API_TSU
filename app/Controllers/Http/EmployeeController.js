'use strict'
const { validate } = use('Validator')
const Employee = use('App/Models/Employee')
const randomstring = use("randomstring")

class EmployeeController {
    async createEmployee({ request, response}) {
        const validation = await validate(request.all(), {
            person_c: 'required',
            area_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {person_c, area_c} = request.all()
            const E = await Employee.create({person_c, area_c, code})
            return response.status(201).json({ message: 'Employee created succesful', code})
        }
    }
    async updateEmployee({ request, response }) {   
        const validation = await validate(request.all(), {
            person_c: 'required',
            area_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, area_c} = request.all()
            const E = await Employee.findBy('code', code)
            if (E == null){
                return response.json({message: 'Employee was not found'})
            }else{
                E.person_c = person_c
                E.area_c = area_c
                await E.save()
                return response.json({message: 'Employee was update', E})
            }
        }
    }
    async destroyEmployee({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const E = await Employee.findBy('code', code)
            await E.delete()
            return response.json({message: 'Employee was deleted', E})
        }
    }
    async showEmployee({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const E = await Employee.findBy('code', code)
            return response.status(201).json({ message: 'Employee was found', E})
        }
    }
    async showEmployees({response}){
        const E = await Employee.all()
        return response.status(201).json({E})
    }
}

module.exports = EmployeeController
