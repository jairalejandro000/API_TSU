'use strict'
const { validate } = use('Validator')
const Member = use('App/Models/Member')
const randomstring = use("randomstring")
const Person = use('App/Models/Person')
const GolfCar = use('App/Models/Person')

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
            const code = randomstring.generate({
                length: 10})
            const P = await Person.findBy('code', person_c) 
            if(P == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const M = await Member.create({person_c, expiration, golf_car_c, code})
                return response.ok({ message: 'Member created succesful', code})
            }
        }
    }
    async updateMember({ request, response, params }) {   
        const validation = await validate(request.all(), {
            person_c: 'required|unique:members,person_c',
            expiration: 'required',
            golf_car_c: 'required|max:10'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, expiration, golf_car_c} = request.all()
            const M = await Member.findBy('code', params.code)
            if (M == null){
                return response.status(400).json({message: 'Member was not found'})
            }else{
                const P = await person.findBy('code', person_c)
                const GC = await GolfCar.findBy('code', golc_car_c)
                if(P == null || GC == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    M.person_c = person_c
                    M.expiration = expiration
                    M.golf_car_c = golf_car_c
                    await M.save()
                    return response.ok({message: 'Member was update', M})
                }
            }
        }
    }
    async destroyMember({ params, response }){
        const M = await Member.findBy('code', params.code)
        await M.delete()
        return response.ok({message: 'Member was deleted', M})
    }
    async showMember({ params, response }) {
        const M = await Member.findBy('code', params.code)
        return response.ok({ message: 'Member was found', M})
    }
    async showMembers({response}){
        const M = await Member.all()
        return response.ok({M})
    }
}

module.exports = MemberController
