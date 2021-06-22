'use strict'
const { validate } = use('Validator')
const Member = use('App/Models/Member')
const randomstring = use("randomstring")

class MemberController {
    async createMember({ request, response}) {
        const validation = await validate(request.all(), {
            person_c: 'required',
            expiration: 'required',
            golf_car_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {person_c, expiration, golf_car_c} = request.all()
            const M = await Member.create({person_c, expiration, golf_car_c, code})
            return response.status(201).json({ message: 'Member created succesful', code})
        }
    }
    async updateMember({ request, response }) {   
        const validation = await validate(request.all(), {
            person_c: 'required',
            expiration: 'required',
            golf_car_c: 'unique'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, expiration, golf_car_c} = request.all()
            const M = await Member.findBy('code', code)
            if (M == null){
                return response.json({message: 'Member was not found'})
            }else{
                M.person_c = person_c
                M.expiration = expiration
                M.golf_car_c = golf_car_c
                await M.save()
                return response.json({message: 'Member was update', M})
            }
        }
    }
    async destroyMember({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const M = await Member.findBy('code', code)
            await M.delete()
            return response.json({message: 'Member was deleted', M})
        }
    }
    async showMember({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const M = await Member.findBy('code', code)
            return response.status(201).json({ message: 'Member was found', M})
        }
    }
    async showMembers({response}){
        const M = await Member.all()
        return response.status(201).json({M})
    }
}

module.exports = MemberController
