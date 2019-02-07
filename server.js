const express = require('express')
const graphQLHTTP = require('express-graphql')
const PORT = process.env.PORT || 5000
const schema = require('./schema')
const server = express()

server.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true
}))

server.listen(PORT,()=>{
    console.log(`things going smoothly on port: ${PORT}`)
})