const express = require('express')
const logger = require("morgan")
const socket = require("socket.io")


const app = express()

const server = app.listen(3000, function(){
  console.log("Listening on port 3000")
})

const io = socket(server)

app.use(express.static('views'))
app.set('views', __dirname + '/views');

app.use(logger('dev'))

app.get('/', (req,res) => {
  res.render('index.html')
})

app.get('/hi', (req,res) => {
  res.send("<h1>Hello</h1>")
})

io.on('connection', (socket) => {
  console.log("A User Connected")

  socket.on('disconnect', () => {
    console.log("A User disconnected")
  })

  socket.on('message', (data) =>{
    console.log(data)
    io.sockets.emit('serverMessage', data)
  })

})
