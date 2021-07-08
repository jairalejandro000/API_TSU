'use strict'
const { validate } = use('Validator')
const Extension = use('App/Models/Extension')
const randomstring = use("randomstring")
const Employee = use('App/Models/Employee')

class ExtensionController {
    async createExtension({ request, response}) {
        const validation = await validate(request.all(), {
            employee_c: 'required|unique:extensions,employee_c',
            extension: 'required|min:3|max:6'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {employee_c, extension} = request.all()
            const codex = randomstring.generate({
                length: 10})
            const E = await Employee.findBy('codee', employee_c)
            if(E == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const E = await Extension.create({employee_c, extension, codex})
                return response.ok({ message: 'Extension created succesful', codex})
            }
        }
    }
    async updateExtension({ request, response, params }) {   
        const validation = await validate(request.all(), {
            employee_c: 'required|unique:extensions,employee_c',
            extension: 'required|min:3|max:6'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {employee_c, extension} = request.all()
            const E = await Extension.findBy('codex', params.code)
            if (E == null){
                return response.status(400).json({message: 'Extension was not found'})
            }else{
                const EM = await Employee.findBy('codee', employee_c)
                if(EM == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    E.employee_c = employee_c
                    E.extension = extension
                    await E.save()
                    return response.ok({message: 'Extension was update', E})
                }
            }
        }
    }
    async destroyExtension({ params, response }){
        const E = await Extension.findBy('codex', params.code)
        await E.delete()
        return response.ok({message: 'Extension was deleted', E})
    }
    async showExtension({ params, response }) {
        const E = await Extension.findBy('codex', params.code)
        return response.ok({ message: 'Extension was found', E})
    }
    async showExtensions({response}){
        const E = await Extension.all()
        return response.ok({E})
    }
}

module.exports = ExtensionController
