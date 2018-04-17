var people = require("../controllers/people.js");

module.exports = function(app){
    app.get("/", function(req, res){
        people.showAll(req, res)
    }),
    app.get("/new/:name", function(req, res){
        people.create(req, res)
    }),
    app.get("/:name", function(req, res){
        people.showOne(req, res)
    }),
    app.get("/delete/:name", function(req, res){
        people.delete(req, res)
    })

}