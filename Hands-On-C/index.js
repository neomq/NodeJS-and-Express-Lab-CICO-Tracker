// SETUP
const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

// SETUP EXPRESS
const app = express();

// SETUP VIEW ENGINE
app.set('view engine', 'hbs');

// SETUP WAX-ON
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts'); 

// SETUP STATIC FOLDER
app.use(express.static('public'));

// ENABLE FORMS
app.use(express.urlencoded({extended:false}));

// ROUTES
// > display the form
app.get('/lostandfound', (req,res)=>{
    res.render('lostandfound')
})

// // > process the form
// app.post('/lostandfound', function(req,res){
//     let itemName = req.body.name;
//     let hasError = false;
//     if (!itemName) {
//         hasError = true;
//     }
//     if (itemName && itemName.length < 3) {
//         hasError = true;
//     }

//     let email = req.body.email;
//     if (email && !email.includes('@')) {
//         hasError = true;
//     }

// })

// LISTEN
app.listen(3000, function(){
    console.log("Server has started")
})