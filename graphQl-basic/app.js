const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

var app = express()

let forumData = [
    {id: "1", title: "abrakadbra", desc: "buku bagus", userId: "1"},
    {id: "2", title: "belajar menghitung", desc: "rahasia", userId: "2"},
    {id: "3", title: "belajar graph", desc: "mantul", userId: "2"}
]

let userData = [
    {id: "1", name: "adrian"},
    {id: "2", name: "bowo"},
    {id: "3", name: "lauren"}
]

let schema = buildSchema(`

        type Forum {
            id: ID,
            title: String,
            desc: String,
            user: User
        }

        type User {
            id: ID,
            name: String,
            forums:[Forum]
        }

        type Query {
            forum(id: ID!): Forum,
            forums: [Forum],
            user(id: ID!): User,
            users: [User]
        }

        type Mutation {
            addUser(id: ID, name: String) : User,
            addForum(id: ID, title: String, desc: String, userId: String) : Forum
        }
`)

//yang nantinya ngeresolve / mengembalikan data 
let resolver = {
    forum: (args) => {
        let _forum = forumData.find(el => el.id == args.id)
        _forum['user'] = userData.find(el => el.id == _forum.userId)
        return _forum
    },
    forums: () => {
        let _user = ''
        forumData.map(
            eachForum => {
                _user = userData.find(el => el.id == eachForum.userId)
                eachForum['user'] =_user
            }
        )
        return forumData
    },
    user: (args) => {
        let _user = userData.find(el => el.id == args.id)
        _user['forums'] = forumData.filter(el => el.userId == _user.id)
        return _user
    },
    users: () => {
        let _forums = ''

        userData.map(
            
            eachUser => {
                console.table(_forums)
                _forums = forumData.filter(el => el.userId == eachUser.id )
                eachUser['forums'] = _forums
            }
        )
        return userData
    },
    addUser : ({id, name}) => {
        let _newUser = {id: id, name: name}
        userData.push(_newUser)
        console.table(userData[0])
        return _newUser
    },
    addForum : ({id, title, desc, userId}) => {
        let _newForum = {id: id, title: title, desc: desc, userId: userId}
        forumData.push(_newForum)
        console.table(forumData)
        return _newForum
    }
    
}


//route awal
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true //GUI untuk ngetes API defaultnya false
}))

app.listen(4000, () => console.log('Mantep Cuk'))