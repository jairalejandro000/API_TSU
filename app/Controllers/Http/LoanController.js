'use strict'
const { validate } = use('Validator')
const Loan = use('App/Models/Loan')
const randomstring = use("randomstring")
const GolfCar = use('App/Models/GolfCar')
const Member = use('App/Models/Member')
const Database = use('Database')

class LoanController {
    async createLoan({ request, response}) {
        const validation = await validate(request.all(), {
            member_c: 'required',
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
            const {member_c, date, start_time, end_time, holes, golf_car_c, visit} = request.all()
            const codel = randomstring.generate({
                length: 10})
            const M = await Member.findBy('codem', member_c)
            if(M == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const GC = await GolfCar.findBy('codegc', golf_car_c)
                if(GC == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    const L = await Loan.create({date, start_time, end_time, holes, golf_car_c, visit, codel, member_c})
                    return response.ok({ message: 'Loan created succesful'})
                }
            }
        }
    }
    async updateLoan({ request, response, params }) {   
        const validation = await validate(request.all(), {
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
            const {date, start_time, end_time, holes, golf_car_c, visit} = request.all()
            const L = await Loan.findBy('codel', params.code)
            if (L == null){
                return response.status(400).json({message: 'Loan was not found'})
            }else{
                const GC = await GolfCar.findBy('codegc', golf_car_c)
                if(GC == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    L.date = date
                    L.start_time = start_time
                    L.end_time = end_time
                    L.holes = holes
                    L.golf_car_c = golf_car_c
                    L.visit = visit
                    await L.save()
                    return response.ok({message: 'Loan was update'})
                }
            }
        }
    }
    async reportLoan({ response }) {   
        const Loans = await Database.select('*').from('Loans_report')
        return response.ok({Loans})
    }
    async destroyLoan({ params, response }){
        const L = await Loan.findBy('codel', params.code)
        await L.delete()
        return response.ok({message: 'Loan was deleted'})
    }
    async showLoan({ params, response }) {
        const L = await Loan.findBy('codel', params.code)
        return response.ok({ message: 'Loan was found', L})
    }
    async showLoans({response}){
        const Loans = await Database.select('*').from('Loans_data')
        return response.ok({Loans})
    }
}

module.exports = LoanController
