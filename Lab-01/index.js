const express = require('express');

let app = express();

// add routes here
app.get('/', function(req,res){
    res.send("<h1>Hello from Express</h1>");
})

app.listen(3003, ()=>{
    console.log("Server started")
})

