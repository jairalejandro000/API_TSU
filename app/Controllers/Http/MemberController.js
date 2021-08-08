'use strict'
const { validate } = use('Validator')
const Member = use('App/Models/Member')
const randomstring = use("randomstring")
const Person = use('App/Models/Person')
const GolfCar = use('App/Models/Person')
const Database = use('Database')

class MemberController {
    async createMember({ request, response}) {
        const validation = await validate(request.all(), {
            person_c: 'required|unique:members,person_c',
            expiration: 'required',
            golf_car_c: 'required|max:10'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, expiration, golf_car_c} = request.all()
            const codem = randomstring.generate({
                length: 10})
            const P = await Person.findBy('codep', person_c) 
            const GC = await GolfCar.findBy('codegc', golf_car_c) 
            if(P == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                if(GC == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    const M = await Member.create({person_c, expiration, golf_car_c, codem})
                    return response.ok({message: 'Member created succesful'})
                }
            }
        }
    }
    async updateMember({ request, response, params }) {   
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:30',
            last_name: 'required|min:3|max:100',
            number: 'required|min:7|max:15',
            golf_car_c: 'required|max:10'
        })
        if (validation.fails()){
            return response.status(400).json({message: 'Validation error'})
        }else {
            const {golf_car_c, name, last_name, number} = request.all()
            const M = await Member.findBy('codem', params.code)
            if (M == null){
                return response.status(400).json({message: 'Member was not found'})
            }
            const P = await Person.findBy('codep', M.person_c)
            if(P == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                M.golf_car_c = golf_car_c
                await M.save()
                P.name = name
                P.last_name = last_name
                P.number = number
                await P.save()
                return response.ok({message: 'Employee was update'})
            }
        }
    }
    async destroyMember({ params, response }){
        const M = await Member.findBy('codem', params.code)
        const P = await Person.findBy('codep', M.person_c)
        await P.delete()
        await M.delete()
        return response.ok({message: 'Member was deleted'})
    }
    async showMember({ params, response }) {
        const M = await Member.findBy('codem', params.code)
        return response.ok({ message: 'Member was found', M})
    }
    async showMembers({response}){
        const Members = await Database.select('*').from('Members_data')
        return response.ok({Members})
    }
}

module.exports = MemberController
