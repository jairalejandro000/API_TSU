'use strict'
const { validate } = use('Validator')
const Employee = use('App/Models/Employee')
const randomstring = use("randomstring")
const Person = use('App/Models/Person')
const Area = use('App/Models/Area')
const Database = use('Database')

class EmployeeController {
    async createEmployee({ request, response }) {
        const validation = await validate(request.all(), {
            person_c: 'required|unique:employees,person_c',
            area_c: 'requiredunique:employees,area_c'
        })
        if(validation.fails()){
            return response.status(400).json({message: 'Validation error'})
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
                return response.ok({message: 'Employee created succesful'})
            }
        }
    }
    async updateEmployee({ params, request, response }) {   
        const validation = await validate(request.all(), {
            area_c: 'required|max:10',
            name: 'required|min:3|max:30',
            last_name: 'required|min:3|max:100',
            number: 'required|min:7|max:15'
        })
        if (validation.fails()){
            return response.status(400).json({message: 'Validation error'})
        }else {
            const {area_c, name, last_name, number} = request.all()
            const E = await Employee.findBy('codee', params.code)
            if (E == null){
                return response.status(400).json({message: 'Employee was not found'})
            }else{
                const P = await Person.findBy('codep', E.person_c)
                const A = await Area.findBy('codea', area_c)
                if(P == null || A == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    E.area_c = area_c
                    await E.save()
                    P.name = name
                    P.last_name = last_name
                    P.number = number
                    await P.save()
                    return response.ok({message: 'Employee was update'})
                }
            }
        }
    }
    async destroyEmployee({ params, response }){
        const E = await Employee.findBy('codee', params.code)
        const P = await Person.findBy('codep', E.person_c)
        await P.delete()
        await E.delete()
        return response.ok({message: 'Employee was deleted'})
    }
    async showEmployee({ params, response }) {
        const E = await Employee.findBy('codee', params.code)
        return response.ok({message: 'Employee was found', E})
    }
    async showEmployees({ response }){
        const Employees = await Database.select('*').from('Employees_data')
        return response.ok({Employees})
    }
}

module.exports = EmployeeController
