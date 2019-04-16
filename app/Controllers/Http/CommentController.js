'use strict'

const Comment = use('App/Models/Comments')

// Bring in validator
const { validate } = use('Validator')

class CommentController {
    async index(){
        const comments = await Comment.all();

        return view.render('posts.index', {
            title: 'Latest Posts',
            posts: posts.toJSON(),
        })
    }
    async add({ auth, request, response,params, session}){
          // Validate input
          const validation = await validate(request.all(), {
            body: 'required|min:10|max:255'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const comment = new Comment();

        comment.author_id = auth.user.id,
        comment.post_id = params.id,
        comment.body = request.input('body')
        
        session.flash({ notification: 'You have successfully added a comment.' })
        await comment.save()
        return response.redirect('back')
    }
}

module.exports = CommentController
