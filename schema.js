const {
    GraphQLID, GraphQLInt,
    GraphQLObjectType, GraphQLSchema,
    GraphQLList, GraphQLString
} = require('graphql')
const axios = require('axios')
const { API_KEY, API_ACCESS_TOKEN } = require('./config')


// Movie genre (Action, Drama ,...)
const GenreType = new GraphQLObjectType({
    name:'Genre',
    fields:()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        id: {type: GraphQLID},
        original_title: { type: GraphQLString },
        title: { type: GraphQLString },
        language: { type: GraphQLString },
        overview: {type: GraphQLString },
        release_date: {type: GraphQLString },
        popularity: { type: GraphQLInt },
        poster_path: { type: GraphQLString },
        genres: { type: new GraphQLList(GenreType) }

    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields:()=>({
        movie: {
            type: new GraphQLList(MovieType),
            args: {
                title: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${args.title}`)
                .then(res => res.data.results)
            }
        },
        movies:{
            type: new GraphQLList(MovieType),
            resolve(parentValue,args){
                
                return axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
                    ).then(res => res.data.results)
            }
        },
        genres: {
            type: new GraphQLList(GenreType),
            
            resolve(parentValue, args){
                return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
                .then(res => res.data.genres)
            }
        }
    })
})

module.exports = new GraphQLSchema({
 query: RootQuery
})