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
app.get('/bmi', (req,res)=>{
    res.render('bmi')
})

// > process the form
app.post('/bmi', function(req,res){
    let wt = number(req.body.weight);
    let ht = number(req.body.height);
    let bmi = wt / ht ** 2;

    res.render('bmi_results',{
        'bmi': bmi
    })
})

// LISTEN
app.listen(3000, function(){
    console.log("Server has started")
})