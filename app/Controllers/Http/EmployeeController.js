'use strict'
const { validate } = use('Validator')
const Employee = use('App/Models/Employee')
const randomstring = use("randomstring")
const Person = use('App/Models/Person')
const Area = use('App/Models/Area')

class EmployeeController {
    async createEmployee({ request, response}) {
        const validation = await validate(request.all(), {
            person_c: 'required|unique:employees,person_c',
            area_c: 'requiredunique:employees,area_c'
        })
        if(validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else{
            const {person_c, area_c} = request.all()
            const codee = randomstring.generate({
                length: 10})
            const P = await Person.findBy('codep', person_c)
            const A = await Area.findBy('codea', area_c)
            if(P == null || A == null){
                return response.status(400).json({ message: 'Wrong credentials'})
            }else{
                const E = await Employee.create({person_c, area_c, codee})
                return response.ok({ message: 'Employee created succesful', codee})
            }
        }
    }
    async updateEmployee({ request, response, params }) {   
        const validation = await validate(request.all(), {
            person_c: 'required|unique:employees,person_c',
            area_c: 'requiredunique:employees,area_c'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, area_c} = request.all()
            const E = await Employee.findBy('codee', params.code)
            if (E == null){
                return response.status(400).json({message: 'Employee was not found'})
            }else{
                const P = await Person.findBy('codep', person_c)
                const A = await Area.findBy('codea', area_c)
                if(P == null || A == null){
                    return response.status(400).json({ message: 'Wrong credentials'})
                }else{
                    E.person_c = person_c
                    E.area_c = area_c
                    await E.save()
                    return response.ok({message: 'Employee was update', E})
                }
            }
        }
    }
    async destroyEmployee({ params, response }){
        const E = await Employee.findBy('codee', params.code)
        await E.delete()
        return response.ok({message: 'Employee was deleted', E})
    }
    async showEmployee({ params, response }) {
        const E = await Employee.findBy('codee', params.code)
        return response.ok({ message: 'Employee was found', E})
    }
    async showEmployees({response}){
        const E = await Employee.all()
        return response.ok({E})
    }
}

module.exports = EmployeeController
