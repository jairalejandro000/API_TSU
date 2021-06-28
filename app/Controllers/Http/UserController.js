'use strict'
const { validate } = use('Validator')
const randomstring = use("randomstring");
const User = use('App/Models/User')
const Employee = use('App/Models/Employee')

class UserController {
    async createUser({ request, response}) {
        const validation = await validate(request.all(), {
            username: 'required|max:30|min:5',
            email: 'required|email|unique:users,email|max:100',
            password: 'required|max:100|min:8',
            rol: 'required|max:15|min:3',
            employee_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {username, email, password, rol, employee_c} = request.all()
            const E = await Employee.findBy('code', employee_c)
            if(E == null){
                return response.status(400).json({ message: 'Wrong credentials'})
            }else{
                const code = randomstring.generate({
                    length: 10})
                const U = await User.create({username, email, password, rol, employee_c, code})
                return response.ok({ message: 'User created succesful', code})
            }
        }
    }
    async updateUser({ request, response, params }) {   
        const validation = await validate(request.all(), {
            username: 'required|max:30|min:5',
            email: 'required|email|unique:users,email',
            password: 'required|max:100|min:8',
            rol: 'required|max:15'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {username, email, password, rol} = request.all()
            const U = await User.findBy('code', params.code)
            if (U == null){
                return response.status(400).json({message: 'User was not found'})
            }else{
                U.username = username
                U.email = email
                U.password = password
                U.rol = rol
                await U.save()
                return response.ok({message: 'User was update', U})
            }
        }
    }
    async destroyUser({ response, params }){
        const U = await User.findBy('code', params.code)
        await U.delete()
        return response.ok({message: 'User was deleted', U})
    }
    async showUser({ response, params }) {
        const U = await User.findBy('code', params.code)
        return response.ok({ message: 'User was found', U })
    }
    async showUsers({response}){
        const U = await User.all()
        return response.ok({U})
    }
}

module.exports = UserController
