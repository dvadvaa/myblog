'use strict'

class HomeController {
    async main({ auth,view }){
        return view.render('home',{
        })
    }
}

module.exports = HomeController
