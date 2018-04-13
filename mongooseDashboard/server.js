var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zoo');
mongoose.Promise = global.Promise;

var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    type: {type: String, required: true, minlength: 2},
    diet: {type: String, required: true, minlength: 2}
   }, {timestamps : true})
   mongoose.model('Animal', AnimalSchema); // We are setting this Schema in our Models as 'User'
   var Animal = mongoose.model('Animal') // We are retrieving this Schema from our Models, named 'User'

var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
// post route for adding a user

app.get("/new", function(req, res){
  res.render("new")
})

app.get("/show/:id", function (req,res){
  var animal = Animal.findOne({_id:req.params.id}, function (err, animal){
    res.render("show", {animal: animal});
  })
})
app.get("/edit/:id", function (req,res){
  var animal = Animal.findOne({_id:req.params.id}, function (err, animal){
    res.render("edit", {animal: animal});
  })
})
app.get("/delete/:id", function (req,res){
  Animal.remove({_id:req.params.id}, function (err){
    res.redirect('/');
  })
})

app.post('/createAnimal', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var animal = new Animal({name: req.body.name, type: req.body.type, diet: req.body.diet});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    animal.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
        res.render("new", {errors: animal.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added an animal!');
        res.redirect('/');
      }
    })
  })

app.post('/update/:id', function (req, res) {
  Animal.update({_id: req.params.id },
    {
      name: req.body.name,
      type: req.body.type,
      diet: req.body.diet
    },
    function(err) {
      if(err) 
        {
          console.log("something went wrong");
          console.log(animal.errors);
          res.render('/edit/${req.params.id}', {errors: animal.errors})
        }
      else
        {
          res.redirect('/')
        }
  });
})

app.get('/', function(req, res) {
	
  Animal.find({}, function(err, animals){

      if(err){
          console.log('Failed to load users from database');
      } else {
          console.log('success');
      }
      console.log(animals);
      res.render('index', {animals: animals});
	})
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
