const express = require('express');


const app = express()
const port = 3000

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    res.render('index', {title: 'XD', message: 'This is a message'});
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});