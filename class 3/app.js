const express = require('express')
const movies = require('./movies.json')
const crypto = require('crypto')
const z = require('zod')


const app = express()

app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234;


app.use(express.json());


app.get('/movies', (req,res) =>{
    const query = req.query.genre.toLowerCase()
    const fMovies = movies.filter(movie => movie.Genre.toLowerCase().includes(query))
    
    if(fMovies) return res.json(fMovies)
    res.status(404).json({message:"No existe"})
    
})

app.get('/movies/:name', (req,res) =>{
    const { name } = req.params
    const movie = movies.find((movie) => movie.Title === name
       )
    if(movie) return res.json(movie)
    res.status(404).json({message:"No existe"})
    
})

app.post('/movies', (req, res) => {
    console.log(req.body)
    const movieSchema = z.object({
        Title: z.string({
            invalid_type_error: 'Movie title must be a string'
        }),
        Year: z.number().int().min(1900).max(2040),
        Rated: z.string()
    })
    const { 
        Title,
        Year,
        Rated
    } = req.body
    
    console.log(req.body)
    
    const newMovie = {
        id: crypto.randomUUID(),
        Title,
        Year,
        Rated
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.listen(PORT, (() => {
    console.log(`server port: http://localhost:${PORT}` )
}))