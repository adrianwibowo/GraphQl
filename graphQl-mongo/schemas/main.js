const graphql = require('graphql')
const { GraphQLObjectType,GraphQLString, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLNonNull
} = graphql
const User = require('../models/user')
const Forum = require('../models/forum')

// const forumData = [
//     {id: "1", title: "abrakadbra", desc: "buku bagus", userId: "1"},
//     {id: "2", title: "belajar menghitung", desc: "rahasia", userId: "2"},
//     {id: "3", title: "belajar graph", desc: "mantul", userId: "2"}
// ]

// let userData = [
//     {id: "1", name: "adrian"},
//     {id: "2", name: "bowo"},
//     {id: "3", name: "lauren"}
// ]

const ForumType = new GraphQLObjectType({
    name: 'Forum',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent , args)  {
                return User.findById(parent.userId)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        nama: { type: GraphQLString },
        alamat: { type: GraphQLString },
        forums: {
            type: new GraphQLList(ForumType),
            resolve(parent, args) {
                return Forum.find({userId: parent.id})
            }
        }
    })
})

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        forums: {
            type: new GraphQLList(ForumType),
            resolve(parent, args) {
                return Forum.find({})
            }
        },
        forum: {
            type: ForumType,
            args: { id: {type: GraphQLString}},
            resolve(parent,args){
                // return forumData.find(el => el.id == args.id)
                return Forum.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        user: {
            type: UserType,
            args: { id: {type: GraphQLString}},
            resolve(parent,args){
                // return userData.find(el => el.id == args.id)
                return User.findById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                nama: {type: GraphQLString} ,
                alamat: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = new User({
                    nama: args.nama,
                    alamat: args.alamat
                })
                console.log(user)
                return user.save()
            }
        },
        addForum: {
            type: ForumType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)} ,
                desc: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let forum = new Forum({
                    title: args.title,
                    desc: args.desc,
                    userId: args.userId
                })
                return forum.save()
            }
        },
     
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})