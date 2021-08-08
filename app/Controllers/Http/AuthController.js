'use strict'
const Hash = use('Hash')
const { validate } = use('Validator')
const Employee = use('App/Models/Employee')
const Member = use('App/Models/Member')
const Person = use('App/Models/Person')
const Area = use('App/Models/Area')
const GolfCar = use('App/Models/GolfCar')
const User = use('App/Models/User')
const randomstring = use("randomstring")
const jwt_decode = use('jwt-decode')

class AuthController {

    async authToken({ response }){
        return response.ok({message: 'Validation succesful'})
    }
    async isAdmin({ response, request }){
        const auth = request.headers()
        const token = auth.authorization
        if(token){
            const decode = jwt_decode(token);
            const user = await decode.uid
            const U = await User.findBy('id', user)
            if(U == null){
                return response.status(400).json({message: 'Validation error'})
            }else{
                const rol = await U.rol
                if(rol == 'admin'){
                return response.ok({message: 'Validation succesful'})
                }else{
                    return response.status(400).json({message: 'Validation error'})
                }
            }
        }
    }
    async isUser({ response, request }){
        const auth = request.headers()
        const token = auth.authorization
        if(token){
            const decode = jwt_decode(token);
            const user = await decode.uid
            const U = await User.findBy('id', user)
            if(U == null){
                return response.status(400).json({message: 'Validation error'})
            }else{
                const rol = await U.rol
                if(rol == 'user'){
                return response.ok({message: 'Validation succesful'})
                }else{
                    return response.status(400).json({message: 'Validation error'})
                }
            }
        }
    }
    async createEmployee({ request, response }) {
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:100',
            last_name: 'required|min:3|max:100',
            gender: 'required|max:1',
            address: 'required|min:10|max:254',
            number: 'required|min:7|max:15',
            area_c: 'required|max:10'
        })
        if(validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else{
            const codep = await randomstring.generate({
                length: 10})
            const person_c = codep
            const {name, last_name, gender, address, number, area_c} = request.all()
            const P = await Person.create({name, last_name, gender, address, number, codep})
            const Pe = await Person.findBy('codep', codep)
            if(Pe == null){
                return response.status(400).json({message: 'Was not possible to create the person'})
            }else{
                const codee = randomstring.generate({
                    length: 10})
                const A = await Area.findBy('codea', area_c)
                if(A == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    const E = await Employee.create({codee, area_c, person_c})
                    return response.ok({message: 'Employee created succesful'})
                }
            }
        }
    }
    async createMember({ request, response }) {
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:100',
            last_name: 'required|min:3|max:100',
            gender: 'required|max:1',
            address: 'required|min:10|max:254',
            number: 'required|min:7|max:15',
            golf_car_c: 'required|max:10'
        })
        if(validation.fails()){
            return response.status(400).json({message: 'Validation error'})
        }else{
            const codep = await randomstring.generate({
                length: 10})
            const person_c = codep
            const {name, last_name, gender, address, number, golf_car_c} = request.all()
            const P = await Person.create({name, last_name, gender, address, number, codep})
            const Pe = await Person.findBy('codep', codep)
            if(Pe == null){
                return response.status(400).json({message: 'Was not possible to create the person'})
            }else{
                const codem = randomstring.generate({
                    length: 10})
                const GC = await GolfCar.findBy('codegc', golf_car_c)
                if(GC == null){
                    return response.status(400).json({message: 'Wrong credentials'})
                }else{
                    const M = await Member.create({person_c, golf_car_c, codem})
                    return response.ok({message: 'Member created succesful'})
                }
            }
        }
    }
    async logIn({ request, response, auth }) {
        const validation = await validate(request.all(), {
            email: 'required|max:100',
            password: 'required|max:100|min:8'
        })
        if(validation.fails()){
            return response.status(400).json({message: 'Validation error'})
        }else{
            const {email, password} = request.all()
            const U = await User.findBy('email', email)
            if(U == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const isSame = await Hash.verify(password, U.password)
                if (isSame) {
                    const token = await auth.attempt(email, password)
                    return response.ok({message: 'Successful login', token})

                }else{
                    return response.status(400).json({message: 'Wrong credentials'})
                }
            }
        }
    }
}

module.exports = AuthController
