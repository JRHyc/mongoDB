var mongoose = require("mongoose");

var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    type: {type: String, required: true, minlength: 2},
    diet: {type: String, required: true, minlength: 2}
   }, {timestamps : true})
   mongoose.model('Animal', AnimalSchema); // We are setting this Schema in our Models as 'User'
   var Animal = mongoose.model('Animal') // We are retrieving this Schema from our Models, named 'User'