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

// > process the form
app.post('/lostandfound', function(req,res){
    
    let hasError = false;

    // item name
    let itemName = req.body.name;

    if (!itemName) {
        hasError = true;
    }
    if (itemName && itemName.length < 3 && itemName.length < 200) {
        hasError = true;
    }

    // email
    let email = req.body.email;
    if (email && !email.includes('@') && !email.includes('.')) {
        hasError = true;
    }

    // location
    let location = req.body.location;
    if (!location) {
        hasError = true;
    }

    // properties
    let properties = req.body.properties;
    if (properties){
        if (Array.isArray(properties)){
            if(properties.length > 3){
                hasError = true;
            }
        } else {
            hasError;
        }
    } else {
        hasError = true;
    }

    
    if (hasError) {
        res.sendStatus(406)
    } else {
        res.send("Success")
    }
})

// LISTEN
app.listen(3000, function(){
    console.log("Server has started")
})