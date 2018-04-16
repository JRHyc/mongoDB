var mongoose = require("mongoose");

var Animal = mongoose.model("Animal");

module.exports = {
    index: function (req, res) {
        Animal.find({}, function (err, animals){
            if(err){
                console.log("Failed to load users from database")
            } else {
                console.log("Success");
            }
            console.log(animals);
            res.render("index", {animals: animals});
        })
    },
    new: function (req, res){
        res.render("new")
    },
    createAnimal: function (req, res) {
        var animal = new Animal({name: req.body.name, type: req.body.type, diet: req.body.diet});
        animal.save(function(err){
            if(err) {
                console.log("something went wrong");
                res.render("new", {errors: animal.errors})
            } else {
                console.log("successfully added an animal");
                res.redirect("/");
            }
        })
    },
    edit: function (req, res){
        Animal.findOne({_id: req.params.id}, function (err,animal){
            res.render("edit", {animal: animal});
        })
    },
    update : function(req, res){
        Animal.update({_id: req.params.id}, req.body, function(err){
            if(err){
                console.log(err)
            }
            res.redirect('/')
        })
    },
    delete : function(req, res){
        Animal.remove({_id : req.params.id}, function(err){
            if(err){
                console.log(err)
            }
            console.log('hi err, bye!')
            res.redirect('/')
        })
    },
    show: function (req, res) {
        Animal.findOne({ _id: req.params.id }, function (err, animal) {
            if (err) {
                console.log(err)
            }
            res.render('show', { animal: animal});
        })
    },
}