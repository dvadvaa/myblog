'use strict'

//bring in model
const User = use('App/Models/User')

const { validate } = use('Validator')
class UserController {
    async store({ request, session, response }){
        const validation = await validate(request.all(), {
            email: 'required|email|unique:users',
            password: 'required|min:5|unique:users'
        })
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const user = await User.create({
            username: request.input('email'),
            email: request.input('email'),
            password: request.input('password')
        })

        session.flash({ notification: 'Account successfully created!' })
        return response.route('login')
    }

    async login({ request, auth, session, response}){
        await auth.attempt(request.input('email'), request.input('password'))

        session.flash({ notification: 'You have logged in succssfully!' })
        return response.redirect('/')
    }

    async destroy({ request, auth, session, response}){
        await auth.logout()
        return response.route('login')
    }
}

module.exports = UserController
