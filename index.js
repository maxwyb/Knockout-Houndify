var path = require('path')
var express = require('express')
var app = express()
const PORT = process.env.PORT || 5000  // heroku deployment

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

// Houndify API server-side
var houndifyExpress = require('houndify').HoundifyExpress;
app.get('/textSearchProxy', houndifyExpress.createTextProxyHandler());

app.use(express.static('public'))
app.listen(PORT, () => console.log('Example app listening on port 3000!'))