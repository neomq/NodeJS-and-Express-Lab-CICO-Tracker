const express = require('express');

let app = express();

// routes
// app.get('/hello/:name', (req,res)=>{
//     let name = req.params.name;
//     res.send("Hi, " + name);
//   })
app.get('/',(req,res)=>{
    res.send("Hello")
})    

app.listen(3002, ()=>{
    console.log("Server started")
})

