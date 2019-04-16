'use strict'

//bring in model
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comments')
const User = use('App/Models/User')


// Bring in validator
const { validate } = use('Validator')

class PostController {
    async index( { view, auth, params } ) {
        // const posts = [
        //     {title:'Post one', body:'This is post number one'},
        //     {title:'Post two', body:'This is post number two'},
        //     {title:'Post three', body:'This is post number three'},
        // ]

        const posts = await Post.all();

        return view.render('posts.index', {
            title: 'Latest Posts',
            posts: posts.toJSON(),
            id: params.id
        })
    }

    async details({ response, params, view }) {
        const post = await Post.find(params.id)
        const comments = await post.comments().with('author').fetch()
        
        if(!post){
        return response.redirect('/posts')
        }
        
        return view.render('posts.details', {
        post: post,
        id:params.id,
        comments:comments.toJSON(),
        })
        
        }

    async add({ view, auth }){
        if(auth.user.type === '1'){
        return view.render('posts.add')
        }else{
            return view.render('error', {
                error: '403#Access error!'
            })
        }
    }

    async store({ auth,request, response, session}){
        // Validate input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const post = new Post();

        post.user_id = auth.user.id
        post.title = request.input('title')
        post.body = request.input('body')
        

        await post.save()

        session.flash({ notification: 'You create new post!' })

        return response.redirect('/posts')
    }
    async destroy({ params, auth, request, response}){
        if(auth.user.type === "1"){
        const post = await Post.findOrFail(params.id)
        await post.delete()

        return response.redirect('/posts')
        }
    }
}
module.exports = PostController

