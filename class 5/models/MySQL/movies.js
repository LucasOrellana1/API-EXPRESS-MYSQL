import mysql from 'mysql2/promise'
// NATIVO 

const config = {
    host: 'localhost',
    user : 'host',
    port: 3306,
    password: 'asdasd123123',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config);


export class MovieModel {
    static async getAll({genre}){

        if (genre){
            const lowerCaseGnere = genre.toLowerCase()
            console.log(lowerCaseGnere)
            const [genres] = await connection.query(
                `SELECT BIN_TO_UUID(m.id) id, m.title , m.year, m.director, m.duration, m.poster, m.rate 
                FROM movie m 
                JOIN movie_genres mg 
                    ON m.id = mg.movie_id 
                JOIN genre g 
                    ON mg.genre_id = g.id WHERE  g.name = ?;`, [lowerCaseGnere]                                                                                                                                                               
    
            )
            if (genre.length == 0) return 0    
            console.log(genres)
            return genres
        }
     
        
        // Query sin parametro
        const [movies, tableInfo] = await connection.query(
            "SELECT title, director, BIN_TO_UUID(id) id FROM movie;"                                                                                                                                                               
        )   
        //console.log(movies)
        console.log(tableInfo)
        return movies

    }

    static async getById ({id}){
        const [movies] = await connection.query(
            `SELECT title, BIN_TO_UUID(id) id FROM movie
            WHERE id = UUID_TO_BIN(?);`, [id]                                                                                                                                                               
        )   
        console.log(movies)
        if(movies.length == 0) return null
        return movies[0]
    }

    static async create (input){
        // Desestructuracion
        const {
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid')
        const [{uuid}] = uuidResult

        // Genre

        try{
            // Query movie creation
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES                                                                                                       
                (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`, 
                [title, year, director, duration, poster, rate]                                                                                                                                                            
            )   

            // Query relation cration
            input.genre.forEach(async gen => {
                console.log(gen)
                const newGenre = await connection.query(
                    `INSERT INTO movie_genres (movie_id, genre_id) VALUES                                                                                                       
                    (UUID_TO_BIN("${uuid}"), (SELECT id FROM genre WHERE LOWER(name) = "${gen}"));`, 
                    [title, year, director, duration, poster, rate]                                                                                                                                                            
                )   
                console.log(newGenre)
            });
        }
        catch (err){
            console.log(err)
            throw new Error('Error creating movie')
        }
        

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        console.log(movies[0])
        return movies[0]
    }

    static async delete({id}){
        await connection.query(
            `DELETE FROM movie
            WHERE id = UUID_TO_BIN(?);`, [id]                                                                                                                                                               
        )   
        if(movies.length == 0) return null
        return movies[0]
    }

    static async update({id, input}){
        const {
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        await connection.query(
            `UPDATE peliculas
            SET title = ?, year = ?, duration = ?, director = ?, rate = ?, poster = ?
            WHERE id = UUID_TO_BIN(?);`, [title, year, duration, director,rate, poster, id]
        )

    } 
}