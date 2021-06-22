'use strict'
const { validate } = use('Validator')
const Extension = use('App/Models/Extension')
const randomstring = use("randomstring")

class ExtensionController {
    async createExtension({ request, response}) {
        const validation = await validate(request.all(), {
            employee_c: 'required',
            extension: 'required'

        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {employee_c, extension} = request.all()
            const E = await Extension.create({employee_c, extension, code})
            return response.status(201).json({ message: 'Extension created succesful', code})
        }
    }
    async updateExtension({ request, response }) {   
        const validation = await validate(request.all(), {
            employee_c: 'required',
            extension: 'required',
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {employee_c, extension, code} = request.all()
            const E = await Extension.findBy('code', code)
            if (E == null){
                return response.status(201).json({message: 'Extension was not found'})
            }else{
                E.employee_c = employee_c
                E.extension = extension
                await E.save()
                return response.status(201).json({message: 'Extension was update', E})
            }
        }
    }
    async destroyExtension({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const E = await Extension.findBy('code', code)
            await E.delete()
            return response.status(201).json({message: 'Extension was deleted', E})
        }
    }
    async showExtension({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const E = await Extension.findBy('code', code)
            return response.status(201).json({ message: 'Extension was found', E})
        }
    }
    async showExtensions({response}){
        const E = await Extension.all()
        return response.status(201).json({E})
    }
}

module.exports = ExtensionController
