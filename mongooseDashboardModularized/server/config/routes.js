var animal = require("../controllers/animals.js")

module.exports = function(app){
    app.get('/', function(req, res) {
      animal.index(req, res)
    }),
    app.get("/new", function(req, res){
      animal.new(req, res)
    }),
    app.get("/show/:id", function (req,res){
      animal.show(req, res)
    }),
    app.get("/edit/:id", function (req,res){
      animal.edit(req, res)
    }),
    app.get("/delete/:id", function (req,res){
      animal.delete(req, res)
    }),
    app.post('/createAnimal', function(req, res) {
      console.log("POST DATA", req.body);
      animal.createAnimal(req, res)
    }),
    app.post('/update/:id', function (req, res) {
      animal.update(req, res)
    })
}


