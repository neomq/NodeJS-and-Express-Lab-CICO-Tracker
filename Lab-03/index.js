const express = require('express'); 
const hbs = require('hbs'); // <-- NOTE 1

/* 1. SETUP EXPRESS */
let app = express();

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs'); // <-- NOTE 2

// 2. ROUTES
app.get('/', function(req, res){
    res.render('index.hbs');
})

// 3. RUN SERVER
app.listen(3000, ()=>console.log("Server started"))
