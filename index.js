const express = require('express');
const { route } = require('./routes/rota');
const app = express();
const port = 3050;
const routes = require('./routes/rota') 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/',routes)


app.listen(port,()=>{
    console.log(`Example app listening  ar http://localhost:${port}`)
})
