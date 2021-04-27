require('dotenv').config()

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schemas/main')

const app = express()

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI ,  { useUnifiedTopology: true , useNewUrlParser: true})


var db = mongoose.connection; // ngebalikin method on dan once
db.on('error', console.error.bind(console, 'CONNECTION ERROR')) // kalo ada event emiter error dia masuk sini
db.once('open',function() { // kalo event listener buat tanda dia connect
  //we're connected!
  console.log('Connected')
})



app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000, () => console.log('Mantep Bor'))