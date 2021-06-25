'use strict'
const { validate } = use('Validator')
const Member = use('App/Models/Member')
const randomstring = use("randomstring")

class MemberController {
    async createMember({ request, response}) {
        const validation = await validate(request.all(), {
            person_c: 'required',
            expiration: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {person_c, expiration, golf_car_c} = request.all()
            const M = await Member.create({person_c, expiration, golf_car_c, code})
            return response.ok({ message: 'Member created succesful', code})
        }
    }
    async updateMember({ request, response, params }) {   
        const validation = await validate(request.all(), {
            person_c: 'required',
            expiration: 'required',
            golf_car_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {person_c, expiration, golf_car_c} = request.all()
            const M = await Member.findBy('code', params.code)
            if (M == null){
                return response.status(400).json({message: 'Member was not found'})
            }else{
                M.person_c = person_c
                M.expiration = expiration
                M.golf_car_c = golf_car_c
                await M.save()
                return response.ok({message: 'Member was update', M})
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
