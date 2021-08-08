'use strict'
const { validate } = use('Validator')
const randomstring = use("randomstring");
const User = use('App/Models/User')
const Employee = use('App/Models/Employee')
const Database = use('Database')

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
            const E = await Employee.findBy('codee', employee_c)
            if(E == null){
                return response.status(400).json({ message: 'Wrong credentials'})
            }else{
                const codeu = randomstring.generate({
                    length: 10})
                const U = await User.create({username, email, password, rol, employee_c, codeu})
                return response.ok({ message: 'User created succesful'})
            }
        }
    }
    async showEmployees({ response}){
        const Employees = await Database.select('*').from('Employees_wou')
        return response.ok({Employees})
    }
    async updateUser({ request, response, params }) {   
        const validation = await validate(request.all(), {
            password: 'required|max:100|min:8',
            rol: 'required|max:15'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const { password, rol} = request.all()
            const U = await User.findBy('codeu', params.code)
            if (U == null){
                return response.status(400).json({message: 'User was not found'})
            }else{
                U.password = password
                U.rol = rol
                await U.save()
                return response.ok({message: 'User was update'})
            }
        }
    }
    async destroyUser({ response, params }){
        const U = await User.findBy('codeu', params.code)
        await U.delete()
        return response.ok({message: 'User was deleted'})
    }
    async showUser({ response, params }) {
        const U = await User.findBy('codeu', params.code)
        return response.ok({ message: 'User was found'})
    }
    async showUsers({ response }){
        const Users = await Database.select('*').from('Users_data')
        return response.ok({Users})
    }
}

module.exports = UserController
