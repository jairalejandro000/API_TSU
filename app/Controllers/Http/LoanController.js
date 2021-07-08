'use strict'
const { validate } = use('Validator')
const Loan = use('App/Models/Loan')
const randomstring = use("randomstring")
const PersonRol = use('App/Models/PersonRol')
const GolfCar = use('App/Models/GolfCar')

class LoanController {
    async createLoan({ request, response}) {
        const validation = await validate(request.all(), {
            persona_rol_c: 'required|unique:loans,person_rol_c',
            date: 'required',
            start_time: 'required',
            end_time: 'required',
            holes: 'required|min:1|max:2',
            golf_car_c: 'required|max:10',
            visit: 'required|max:1'

        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {persona_rol_c, date, start_time, end_time, holes, golf_car_c, visit} = request.all()
            const codel = randomstring.generate({
                length: 10})
            const PR = await PersonRol.findBy('codepr', persona_rol_c)
            const GC = await GolfCar.findBy('codegc', golf_car_c)
            if(PR == null || GC == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const L = await Loan.create({persona_rol_c, date, start_time, end_time, holes, golf_car_c, visit, codel})
                return response.ok({ message: 'Loan created succesful', codel})
            }
        }
    }
    async updateLoan({ request, response, params }) {   
        const validation = await validate(request.all(), {
            persona_rol_c: 'required|unique:loans,person_rol_c',
            date: 'required',
            start_time: 'required',
            end_time: 'required',
            holes: 'required|min:1|max:2',
            golf_car_c: 'required|max:10',
            visit: 'required|max:1'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {persona_rol_c, date, start_time, end_time, holes, golf_car_c, visit} = request.all()
            const L = await Loan.findBy('codel', params.code)
            if (L == null){
                return response.status(400).json({message: 'Loan was not found'})
            }else{
                const PR = await PersonRol.findBy('codepr', persona_rol_c)
                const GC = await GolfCar.findBy('codegc', golf_car_c)
                if(PR == null || GC == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    L.persona_rol_c = persona_rol_c
                    L.date = date
                    L.start_time = start_time
                    L.end_time = end_time
                    L.holes = holes
                    L.golf_car_c = golf_car_c
                    L.visit = visit
                    await L.save()
                    return response.ok({message: 'Employee was update', L})
                }
            }
        }
    }
    async destroyLoan({ params, response }){
        const L = await Loan.findBy('codel', params.code)
        await L.delete()
        return response.ok({message: 'Loan was deleted', L})
    }
    async showLoan({ params, response }) {
        const L = await Loan.findBy('codel', params.code)
        return response.ok({ message: 'Loan was found', L})
    }
    async showLoans({response}){
        const L = await Loan.all()
        return response.ok({L})
    }
}

module.exports = LoanController
