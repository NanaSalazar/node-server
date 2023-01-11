const http = require('http')
const fs = require('fs')
const path = require('path')
const { get } = require('https')



const getStaticFile = (_path, type, res) => {
    if(!fs.existsSync(_path)) {
        res.writeHead(404)
        return res.end()
    } else {
        res.writeHead(200, {'Content-Type': type})
    }

    fs.createReadStream(_path).pipe(res)
}

const mimetype = {
    "html": "text/html",
    "css": "text/css",
    "png": "image/png",
    "jpg": "image/jpg",
    "js": "application/javascript"
}

const staticFile = (url, res) => {
    const _path = path.join(__dirname, url)
    const extname = path.extname(url).substring(1)

    getStaticFile(_path, mimetype[extname], res)
}

http.createServer( (req, res) => {

    let url = req.url

    if(url === '/') {
        url = '/index.html'
    }

    staticFile(url, res)

    //res.end('test')
}).listen(3001)

console.log('O servidor está rodando em \n http://localhost:3001')