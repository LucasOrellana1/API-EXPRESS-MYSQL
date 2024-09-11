import { readJSON } from "../util.js"

const movies = readJSON('./movies.json')

export class MovieModel {
    static async getAll({genre}){
        if(genre){
            return movies.filter(
                movie => movie.genre.some(g => g.toLowercase() == genre.toLowercase())
            )
        }
    }

    static async getById ({id}){
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create (input){
        const newMovie = {
            id,
            ...input
        }
        movies.push(newMovie)
    }

    static async delete({id}){
        const movieIndex = movies.findIndex(movie => movie.id === id)
  
        if (movieIndex === -1) {
          return res.status(404).json({ message: 'Movie not found' })
        }
      
        movies.splice(movieIndex, 1)       
        return true

    }

    static async update({id, input}){
        const movieIndex = movies.findIndex(movie => movie.id === id)
  
        if (movieIndex === -1) {
          return res.status(404).json({ message: 'Movie not found' })
        }
      
        const updateMovie = {
          ...movies[movieIndex],
          ...result.data
        }
      
        movies[movieIndex] = updateMovie
    } 
}