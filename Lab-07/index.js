const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');
const axios = require('axios');

// SETUP EXPRESS
const app = express();

// SETUP VIEW ENGINE
app.set('view engine', 'hbs');

// SETUP WAX-ON
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts'); // template inheritance

// SETUP STATIC FOLDER
app.use(express.static('public'));

// ENABLE FORMS
app.use(express.urlencoded({extended:false}));

// ROUTES

// READ
const BASE_API_URL = "https://ckx-restful-api.herokuapp.com";

// simple form:
// req is requesting from user
// res is response to user / sending to user
// app.get('/', function(req, res){

// })
// render hbs files to index --> res.render()

app.get("/", async (req, res) => {
    let response = await axios.get(BASE_API_URL + "/sightings");
    let sightings = response.data;
    // console.log(sightings)
    // --> to check if data is loaded
    res.render('index', {
      'sightings': sightings
    }) // --> res.render(target, value)
});

// CREATE 
// display form to add food sightings
app.get('/create', async (req, res) => {
    res.render('create_sightings.hbs');
})

// process the form
app.post('/create', async(req,res) => {
    let sighting = {
      'description': req.body.description,
      'food': req.body.food.split(','),
      'datetime': req.body.datetime
    }

    await axios.post(BASE_API_URL + '/sighting', sighting);
    res.redirect('/')
})

// UPDATE
// specify food sighting
app.get('/:sighting_id/update', async(req,res)=>{
    let response = await axios.get(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    let sighting = response.data;
    sighting.datetime = sighting.datetime.slice(0, -1);
    res.render("update_sightings",{
      'sighting': sighting
    })
})

// edit food sighting
app.post('/:sighting_id/update', async(req,res)=>{
    let sighting = {
      'description': req.body.description,
      'food': req.body.food.split(','),
      'datetime': req.body.datetime
    }
  
    await axios.put(BASE_API_URL + '/sighting/' + req.params.sighting_id, sighting);
    res.redirect('/')
})

// process the changes
app.post('/:sighting_id/update', async(req,res)=>{
    let sighting = {
      'description': req.body.description,
      'food': req.body.food.split(','),
      'datetime': req.body.datetime
    }
  
    await axios.put(BASE_API_URL + '/sighting/' + req.params.sighting_id, sighting);
    res.redirect('/')
})

// DELETE
// remove a sighting from the server.
app.get('/:sighting_id/delete', async(req,res)=>{
    let response = await axios.get(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    let sighting = response.data;
   
    res.render("delete_sightings",{
      'sighting': sighting
    })
  })

// process deletion
app.post('/:sighting_id/delete', async(req,res)=>{
    let response = await axios.delete(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    res.redirect('/');
})


// LISTEN
app.listen(3000, function(){
    console.log("Server has started")
})
