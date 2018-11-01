const express = require('express');

const app = express()

app.get('/', (req, res)=>{
    res.write('test');
    res.end();
});

app.listen(8000);