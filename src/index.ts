import http from 'http'

let server = http.createServer((req, res) => {
    // Routes
    if (req.url == '/') {
        res.writeHead(200)
        res.write('<html><body><p>Hello world</p></body></html>')
        res.end()
    }
    else {
        res.end('Invalid request')
    }
})

const PORT = 8080
server.listen(PORT)
console.log(`Server listening on ${PORT}`)
