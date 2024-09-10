const http = require('node:http')

const desiredPort = process.env.PORT ?? 1234

const proccessReq = (req, res) => { 
    res.setHeader('Content-Type', 'text/html; Charset=utf-8')

    if (req.url == '/'){ 
        res.statusCode = 200
        res.end('Bienvenido a mi pagina de inicio')
    }

}

const server = http.createServer(proccessReq)


server.listen(desiredPort, () => {
    console.log(`server port: http://localhost:${desiredPort}` )
})