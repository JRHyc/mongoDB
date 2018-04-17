var mongoose = require("mongoose");
var Task = mongoose.model("Task");

module.exports = {
    findOne : function(req, res){
        Task.findOne({_id : req.params.id}, function(err, task){
            if(err){
                console.log(err)
            }
            res.json(task)
        })
    },
    findAll : function(req, res){
        Task.find({}, function(err, task){
            if(err){
                console.log(err)
            }
            res.json(task)
        })
    },
    create : function(req, res){
        var task = new Task(req.body)
        task.save(function(err){
            if(err){
                console.log(err)
            }
            else {
                res.json(task)
            }
        })
    },
    update : function(req, res){
        req.body.updated_at = new Date();
        Task.update({_id : req.params.id}, {$set : req.body}, function(err){
            if(err){
                console.log(err)
            }
            else{
                res.json(task)
            }
        })
    },
    delete : function(req, res){
        Task.remove({_id : req.params.id}, function(err, task){
            if(err){
                console.log(err)
            }
            Task.find({}, function(err, tasks){
                if(err){
                    console.log(err)
                }
                else {
                    res.json(tasks)
                }
            })
        })
    }
}