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
app.get('/fruits', (req,res)=>{
    res.render('fruits')
})

// > process the form
app.post('/fruits', function(req,res){
    let fruits = [];
    if (req.body.items) {
        if (Array.isArray(req.body.items)){
            fruits = req.body.items;
        } else {
            fruits = [req.body.items];
        }
    }
    let cost = 0;
    if (fruits.includes("apple")) {
        cost += 3;
    }
    if (fruits.includes("durian")) {
        cost += 15;
    }
    if (fruits.includes("orange")) {
        cost += 6;
    }
    if (fruits.includes("banana")) {
        cost += 4;
    }

    res.send("Total Cost: " + cost);
})

// LISTEN
app.listen(3000, function(){
    console.log("Server has started")
})