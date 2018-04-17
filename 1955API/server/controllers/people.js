var mongoose = require("mongoose");
var Person = mongoose.model("Person");

module.exports = {
    showAll : function(req, res){
        Person.find({}, function(err, people){
            if(err){
                console.log(err)
            }
            res.json(people)
        })
    },
    create : function(req, res){
        var person = new Person({name : req.params.name});
        person.save(function(err){
            if(err){
                console.log("error saving person ", err)
            }
            res.redirect("/")
        })
    },
    showOne : function(req, res){
        Person.findOne({name : req.params.name}, function(err, person){
            if(err){
                console.log("Error finding person ", err)
                res.redirect("/")
            } else {
                res.json(person)
            }
        })
    },
    delete : function(req, res){
        Person.remove({name : req.params.name}, function(err){
            if(err){
                console.log("Error deleting person ", err)
            }
            res.redirect("/")
        })
    }
}