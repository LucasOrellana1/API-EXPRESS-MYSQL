const express = require('express');

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234;

app.get('/', (req, res) => {
    res.send('<h1>Mi pagina ALAHUIAKBAR</h1>')
    //console.log(req)
})

app.post('/pokemon', (req, res) => {
    let body = ''

    req.on('data', (stream) =>{
        body += stream.toString()
    })

    req.on('end', (stream) =>{
        const data = JSON.parse(body)
        res.status(201).json(data)
    })
})

app.use('/', (req,res) => {
    res.status(404).send("<h1>ERROR 404</h1>")
})

app.listen(PORT, (() => {
    console.log(`server port: http://localhost:${PORT}` )
}))