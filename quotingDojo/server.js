// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingDojo');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true}
   }, {timestamps : true})
   mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/addQuote', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name: req.body.name, quote: req.body.quote});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
        res.redirect('/');
      }
    })
  })

app.get('/quotes', function(req, res) {
	
    User.find({}, function(err, users){

        if(err){
            console.log('Failed to load users from database');
        } else {
            console.log('success');
        }
        console.log(users);
        res.render('quotes', {users: users});
	})
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
