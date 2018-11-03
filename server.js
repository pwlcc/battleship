const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000

app.use(express.static('public'));
app.set('view engine', 'pug');

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('click', (data) => {
        console.log(data)
    });

});

io.on('disconnect', (socket) => {
    console.log('user disconnected')
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'XD',
        message: 'This is a message'
    });
});

http.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});