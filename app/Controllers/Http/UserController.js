'use strict'

const PersonController = require("./PersonController")

const { validate } = use('Validator')
const Person = use('App/Models/Person')
const randomstring = use("randomstring");
const User = use('App/Models/User')

class UserController extends PersonController{
    async createUser({ request, response}) {
        const validation = await validate(request.all(), {
            username: 'required',
            email: 'required',
            password: 'required',
            rol: 'required',
            employee_c: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const code = randomstring.generate({
                length: 10})
            const {username, email, password, rol, employee_c} = request.all()
            const U = await User.create({username, email, password, rol, employee_c, code})
            return response.status(201).json({ message: 'User created succesful', code})
        }
    }
    async updateUser({ request, response }) {   
        const validation = await validate(request.all(), {
            username: 'required',
            email: 'required|email',
            password: 'required',
            rol: 'required', 
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {username, email, password, rol, code} = request.all()
            const U = await User.findBy('code', code)
            if (U == null){
                return response.json({message: 'User was not found'})
            }else{
                U.username = username
                U.email = email
                U.password = password
                U.rol = rol
                await U.save()
                return response.json({message: 'User was update', U})
            }
        }
    }
    async destroyUser({ request, response }){
        const validation = await validate(request.all(), {
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const U = await User.findBy('code', code)
            await U.delete()
            return response.json({message: 'User was deleted', U})
        }
    }
    async showUser({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const U = await User.findBy('code', code)
            return response.status(201).json({ message: 'User was found', U })
        }
    }
    async showUsers({response}){
        const U = await User.all()
        return response.status(201).json({U})
    }
}

module.exports = UserController
